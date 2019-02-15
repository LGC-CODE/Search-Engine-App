// Initializes the `search-records` service on path `/search-records`
const createService = require('./search-records.class.js');
const hooks = require('./search-records.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    app,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/search-records', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('search-records');

  service.hooks(hooks);
};
