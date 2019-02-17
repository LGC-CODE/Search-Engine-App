const assert = require('assert');
const app = require('../.././/app');

describe('\'geolocation\' service', () => {
  it('registered the service', () => {
    const service = app.service('geolocation');

    assert.ok(service, 'Registered the service');
  });
});
