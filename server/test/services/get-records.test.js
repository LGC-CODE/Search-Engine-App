const assert = require('assert');
const app = require('../.././/app');

describe('\'get-records\' service', () => {
  it('registered the service', () => {
    const service = app.service('get-records');

    assert.ok(service, 'Registered the service');
  });
});
