const assert = require('assert');
const app = require('../.././/app');

describe('\'hcp\' service', () => {
  it('registered the service', () => {
    const service = app.service('hcp');

    assert.ok(service, 'Registered the service');
  });
});
