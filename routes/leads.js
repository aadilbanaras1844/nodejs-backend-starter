const express = require('express');
const router = express.Router();
const Validators = require('express-joi-validation').createValidator({});

const {logger, helper} = require('./../config');
const { leadService } = require('./../services');
const VDS = require('./validators');
const { mv_staff } = require('./middlewares');

// get leads
router.get('/', mv_staff, async function(req, res, next) {
  try {
    const leads = await leadService.findAll();
    return helper.ApiResponse(res,200,true, 'Leads list', leads)    
  } catch (error) {
    logger.error(error);
    return  next(error);
  }
});

// add lead
router.post('/', mv_staff, Validators.body(VDS.addLead), async  function(req, res, next) {
  try {
    const params = req.body;
    const lead = await leadService.create(params);
    logger.info('lead created id =>'+ lead.id)
    return helper.ApiResponse(res,200,true, 'Leads Created', lead.id)    
  } catch (error) {
    logger.error(error);
    return  next(error);
  }
});

// update lead
router.put('/:id', mv_staff, Validators.body(VDS.updateLead), async  function(req, res, next) {
  try {
    const id = req.params.id;
    const params = req.body;
    const lead = await leadService.updateLead(id, params)
    return helper.ApiResponse(res,200,true, 'Lead Update',lead)    
  } catch (error) {
    logger.error(error);
    return  next(error);
  }
});

// delete lead
router.delete('/:id', mv_staff, async  function(req, res, next) {
  try {
    const id = req.params.id;
    await leadService.deleteLead(id);
    return helper.ApiResponse(res,200,true, 'Leads Delete', {})    
  } catch (error) {
    logger.error(error);
    return  next(error);
  }
});

module.exports = router;
