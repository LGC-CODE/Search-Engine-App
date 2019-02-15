const assert = require('assert');
const app = require('../.././/app');

describe('\'search-records\' service', () => {
  it('registered the service', () => {
    const service = app.service('search-records');

    assert.ok(service, 'Registered the service');
  });
});
