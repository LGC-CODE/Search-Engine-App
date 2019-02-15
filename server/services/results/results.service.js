// Initializes the `results` service on path `/results`
const createService = require('feathers-sequelize');
const createModel = require('../../models/results.model');
const hooks = require('./results.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/results', createService(options));

//   createService.query('SELECT * FROM mdm_portal_exchange.zmdmp_cust_terr');

  // Get our initialized service so that we can register hooks
  const service = app.service('results');

  const client = app.get('sequelizeClient');
//   console.log(
//       client.query('SELECT * FROM mdm_portal_exchange.zmdmp_cust_terr LIMIT 5').then(
//           resp => {
//               console.log(resp);
//           }
//       ),
//     client.query);

  service.hooks(hooks);
};
