/* eslint-disable require-jsdoc */


module.exports = class BaseService {
  constructor(Model, options = {} ) {
    this.model = Model;
    // this.attributes = options.attributes || ['id'];
  }

  async create(params) {
    const output = await this.model.create( params );
    return output;
  }

  async get( id ) {
    const output = await this.model.findOne({
      where: {id: id},
    });
    return output;
  }

  async findAll( params= {} ) {
    const records = await this.model.findAll({
      where: params,
    });
    return records;
  }

  async findOne( params= {}) {
    const output = await this.model.findOne({
      where: params,
    });
    return output;
  }
};
