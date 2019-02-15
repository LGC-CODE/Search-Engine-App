const assert = require('assert');
const app = require('../.././/app');

describe('\'results\' service', () => {
  it('registered the service', () => {
    const service = app.service('results');

    assert.ok(service, 'Registered the service');
  });
});
