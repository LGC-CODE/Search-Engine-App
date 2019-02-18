/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
    this.app = this.options.app;
    this.sequelClient = this.app.get('sequelizeClient');
  }

  async find(params) {
    // console.log(params);

    // console.log(params.query.query);
    const paramsArray = params.query.query.split(' ');
    let concatinatedSearchQuery = '';
    for (var i = 1; i < paramsArray.length; i++) {
      concatinatedSearchQuery += ` %${paramsArray[i]}%`
    }

    const geolocationFormula = params.query.lat ? `, 3956 * 2 * ASIN(SQRT(POWER(SIN((${params.query.lat} - abs(last_addr_latitude)) * pi() / 180 / 2), 2) + COS(${params.query.lat} * pi() / 180) * COS(abs(last_addr_latitude) * pi() / 180) * POWER(SIN((${params.query.lng} - last_addr_longitude) * pi() / 180 / 2), 2)))` : '';

    const selectQuery = `
       having distance < ${params.query.radius ? params.query.radius : ''} ORDER BY distance `

    const sortbyQuery = ` order by '${params.query.sortby ? params.query.sortby : ''}' desc`

    // console.log(concatinatedSearchQuery);

    const masterQuery =
      `select first_name, middle_name, last_name, best_loc, loc_id, address1, city, state, zip5` +

      (params.query.lat ? `${geolocationFormula} as distance` : '') + // geolocation query

      ` from zmdmp_profs inner join zmdmp_locs on zmdmp_profs.best_loc = zmdmp_locs.loc_id` +
      ` where concat(first_name, ' ', last_name, ' ', address1, ' ', city, ' ', state, ' ', zip5) 
       
      like '%${paramsArray[0]}%${concatinatedSearchQuery}'` + // search query

      (params.query.lat ? selectQuery : '') + // geolocation results query

      (params.query.sortby && !params.query.lat ? sortbyQuery : '') + // sort by query

      ` limit 10000;`

    console.log(masterQuery);
    return this.sequelClient.query(masterQuery, {
      raw: true
    }).then(resp => {
      // console.log(resp);
      return resp;
    });

    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
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
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
