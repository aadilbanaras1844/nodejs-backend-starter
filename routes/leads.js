const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Validators = require('express-joi-validation').createValidator({});

const {logger, helper} = require('./../config');
const {leadService} = require('./../services');
const VDS = require('./validators');
const {mvStaff} = require('./middlewares');

// get leads
router.get('/', mvStaff, async function(req, res, next) {
  try {
    const leads = await leadService.findAll();
    return helper.apiResponse(res, 200, true, 'Leads list', leads);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

// get speicifc lead
router.get('/:id', mvStaff, async function(req, res, next) {
  try {
    const lead = await leadService.findOne({id: req.params.id});
    return helper.apiResponse(res, 200, true, 'Lead Detail', lead);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

// add lead
// eslint-disable-next-line max-len
router.post('/', mvStaff, Validators.body(VDS.addLead), async function(req, res, next) {
  try {
    const params = req.body;
    const lead = await leadService.create(params);
    logger.info('lead created id =>'+ lead.id);
    return helper.apiResponse(res, 200, true, 'Leads Created', lead.id);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

// update lead
router.patch('/:id', mvStaff, Validators.body(VDS.updateLead),
    async function(req, res, next) {
      try {
        const id = req.params.id;
        const params = req.body;
        const lead = await leadService.updateLead(id, params);
        return helper.apiResponse(res, 200, true, 'Lead Update', lead);
      } catch (error) {
        logger.error(error);
        return next(error);
      }
    });

// delete lead
router.delete('/:id', mvStaff, async function(req, res, next) {
  try {
    const id = req.params.id;
    await leadService.deleteLead(id);
    return helper.apiResponse(res, 200, true, 'Leads Delete', {});
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

module.exports = router;
