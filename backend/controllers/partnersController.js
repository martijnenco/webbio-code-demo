/** Module imports **/
const fs = require('fs');
const nodeGeocoder = require('node-geocoder');
const greatCircle = require('great-circle');

const office = {latitude: 51.839549, longitude: 5.87837};

const geocoder = nodeGeocoder({
  provider: 'openstreetmap',
  httpAdapter: 'https',
  formatter: null
});

module.exports = async (req, res) => {
  let partners = {};

  if (fs.existsSync('./_resources/partners.json')) {
    partners = JSON.parse(fs.readFileSync('./_resources/partners.json', {encoding: "utf8"}));

    try {
      /** Resolve to coordinates */
        // Get all the coordinates promises for al the partners
      let partnerPromise = [];
      for (let i = 0; i < partners.length; i++) {
        if (typeof partners[i].address === 'undefined') throw new Error();
        partnerPromise[i] = geocoder.geocode(`${partners[i].address.no} ${partners[i].address.street} ${partners[i].address.city} ${partners[i].address.country}`)
          .then(res => res)
      }

      // Resolve all the promises
      const newPartner = await Promise.all(partnerPromise);
      //Combine all the data
      for (let i = 0; i < partners.length; i++) {
        if (typeof newPartner[i][0] === 'undefined') throw new Error();
        partners[i].geocode = newPartner[i][0];
      }

      /** Resolve to distances and filtering it */
      // Do the Great-circle distance
      for (let i = 0; i < partners.length; i++) {
        partners[i].distance = greatCircle.distance(partners[i].geocode.latitude, partners[i].geocode.longitude, office.latitude, office.longitude, 'KM')
      }
      // filter it
      partners = partners.filter(item => (item.distance < 75));

      res.setHeader('Content-Type', 'application/json');
      res.json({rows: partners, error: false})
    } catch (e) {
      if (e.name === 'HttpError') {
        console.error("Internet is turned of, can't access the internet for coordinate resolving.");
        res.setHeader('Content-Type', 'application/json');
        res.json({rows: [], error: true, message: "Most likely the internet of the server is turned of."})
      } else if (e.name === 'Error') {
        console.error("Some coordinates can't be found.");
        res.setHeader('Content-Type', 'application/json');
        res.json({rows: [], error: true, message: "Some coordinates can't be found."})
      } else {
        console.error(e)
      }
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.json({rows: [], error: true, message: "Most likely the resource file wasn't present."})
  }

};
