// Initializes the `geolocation` service on path `/geolocation`
const createService = require('./geolocation.class.js');
const hooks = require('./geolocation.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    app,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/geolocation', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('geolocation');

  service.hooks(hooks);
};
