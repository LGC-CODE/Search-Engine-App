const results = require('./results/results.service.js');
const getRecords = require('./get-records/get-records.service.js');
const searchRecords = require('./search-records/search-records.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(results);
  app.configure(getRecords);
  app.configure(searchRecords);
};
