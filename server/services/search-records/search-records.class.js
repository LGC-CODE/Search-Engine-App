/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
    this.app = this.options.app;
    this.sequelClient = this.app.get('sequelizeClient');
  }

  async find (params) {
    console.log(params.query.search);
    const paramsArray = params.query.search.split(' ');
    let concatinatedSearchQuery = '';
    for(var i = 1; i < paramsArray.length; i++) {
        concatinatedSearchQuery += ` %${paramsArray[i]}%`
    }

    console.log(concatinatedSearchQuery);

    return this.sequelClient.query(`
        select first_name, middle_name, last_name, best_loc, loc_id, address1, city, state, zip5
        from zmdmp_profs
        inner join zmdmp_locs
        on zmdmp_profs.best_loc = zmdmp_locs.loc_id`
        +` where ` + 
        `concat(first_name, ' ', last_name, ' ', address1, ' ', city, ' ', state, ' ', zip5) like '%${paramsArray[0]}%${concatinatedSearchQuery}' ` +
        `limit 20;`
    , {
      raw: true
    }).then(resp => {
        // console.log(resp);
      return resp;
    });
  }

  async get (id, params) {
    console.log(id);
    return this.sequelClient.query(`
        select first_name, middle_name, last_name, best_loc, loc_id, address1, city, state, zip5
        from zmdmp_profs
        inner join zmdmp_locs
        on zmdmp_profs.best_loc = zmdmp_locs.loc_id
        where first_name like '${id}'
        or middle_name like '${id}'
        or address1 like '${id}'
        or city like '${id}'
        limit 20;
    `, {
      raw: true
    }).then(resp => {
      return resp;
    });
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
