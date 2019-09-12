const partnersController = require('../controllers/partnersController');

module.exports = {
  setRoutes(app) {
    app.get('/api/partners', partnersController);
  },
};
