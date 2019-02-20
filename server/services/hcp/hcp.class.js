/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
    this.app = this.options.app;
    this.sequelClient = this.app.get('sequelizeClient');
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
      console.log(
          this.generateColsFromJson(data),
          this.generateValsFromJson(data)
      );
    return this.sequelClient.query(`
        INSERT INTO mdm_portal_exchange.zmdmp_requests (${this.generateColsFromJson(data)})
        VALUES (${this.generateValsFromJson(data)});
    `, {
        raw: true
      }).then( resp => {
          return resp;
      });
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return {
      id
    };
  }

  generateColsFromJson(json) {
    return Object.keys(json).join(', ');
  }
 
  generateValsFromJson(json) {
    return Object.values(json).map(el => {
        if(!el) {
            return "''";
        } else {
            return `'${el}'`;
        }
    }).join(', ');
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
