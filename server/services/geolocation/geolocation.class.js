/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
    this.app = this.options.app;
    this.sequelClient = this.app.get('sequelizeClient');
    this.coords = {
        lat: 37.798283,
        long: -122.231671,
        radius: 40
    }
  }

  async find (params) {
    console.log(params.query.lat, params.query.lng, params.query.radius);
    this.coords.lat = params.query.lat;
    this.coords.long = params.query.lng;
    this.coords.radius = params.query.radius * 0.00051;

    return this.sequelClient.query(
        `SELECT first_name, last_name, address1, state, zip5, city, last_addr_latitude, last_addr_longitude, 3956 * 2 * ASIN(SQRT(POWER(SIN((${this.coords.lat} - abs(last_addr_latitude)) * pi() / 180 / 2), 2) + COS(${this.coords.lat} * pi() / 180) * COS(abs(last_addr_latitude) * pi() / 180) * POWER(SIN((${this.coords.long} - last_addr_longitude) * pi() / 180 / 2), 2))) as distance
        from zmdmp_profs
        inner join zmdmp_locs
        on zmdmp_profs.best_loc = zmdmp_locs.loc_id
        having distance < ${this.coords.radius}
        ORDER BY distance limit 10000;`, {
      raw: true
    }).then(resp => {
        // console.log(resp);
      return resp;
    });
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
