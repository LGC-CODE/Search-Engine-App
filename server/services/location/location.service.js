// Initializes the `location` service on path `/location`
const createService = require('./location.class.js');
const hooks = require('./location.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    app,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/location', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('location');

  service.hooks(hooks);
};
