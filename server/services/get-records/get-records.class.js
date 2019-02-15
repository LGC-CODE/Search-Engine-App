

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
    this.app = this.options.app;
    this.sequelClient = this.app.get('sequelizeClient');
  }

  async find (params) {
    return this.sequelClient.query('SELECT * FROM mdm_portal_exchange.zmdmp_profs limit 5', {
      raw: true
    }).then( resp => {
        return resp;
    });
    // return [params.query];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
      console.log(data);

    return this.sequelClient.query(`
        INSERT INTO mdm_portal_exchange.zmdmp_profs(first_name, last_name, prof_id)
        VALUES('${params.query.firstname}', '${params.query.lastname}', ${params.query.profId});
    `, {
      raw: true
    }).then(resp => {
      return resp;
    });
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
