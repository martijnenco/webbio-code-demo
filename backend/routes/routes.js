// app/routes.js
const partnersController = require('../controllers/partnersController');

module.exports = {
  _io: null,

  setRoutes(app) {
    app.get('/api/partners', partnersController);
  },
};
