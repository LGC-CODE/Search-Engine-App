// Initializes the `get-records` service on path `/get-records`
const createService = require('./get-records.class.js');
const hooks = require('./get-records.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    app,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/get-records', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('get-records');

  service.hooks(hooks);
};
