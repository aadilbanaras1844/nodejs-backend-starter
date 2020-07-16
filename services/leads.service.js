/* eslint-disable require-jsdoc */


const Cruds = require('./Cruds');
const {LeadsModel} = require('./../models');

class LeadService extends Cruds {}

const leadService = new LeadService(LeadsModel, {});

module.exports = leadService;


