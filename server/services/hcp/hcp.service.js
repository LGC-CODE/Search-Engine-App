// Initializes the `hcp` service on path `/hcp`
const createService = require('./hcp.class.js');
const hooks = require('./hcp.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    app,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/hcp', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('hcp');

  service.hooks(hooks);
};
