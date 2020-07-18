/* eslint-disable require-jsdoc */


const Cruds = require('./Cruds');
const {LeadsModel} = require('./../models');

class LeadService extends Cruds {
  async updateLead(id, params={}) {
    const lead = await this.model.findOne({where: {id: id}});
    if (params.phone) {
      lead.phone = params.phone;
    }
    if (params.email) {
      lead.email = params.email;
    }
    if (params.name) {
      lead.name = params.name;
    }
    const updatedLead = await lead.save();
    return updatedLead.id;
  }

  async deleteLead(id) {
    const lead = await this.model.findOne({where: {id: id}});
    if (!lead) {
      throw new Error('Lead not found');
    }
    return lead.destroy();
  }
}

const leadService = new LeadService(LeadsModel, {});

module.exports = leadService;


