const express = require('express');
const Validators = require('express-joi-validation').createValidator({});
const router = express.Router();

const { userService } = require('./../services');
const {logger, helper} = require('./../config');
const VDS = require('./validators');

// add staff
router.post('/staff', Validators.body(VDS.addStaff), async function(req, res, next) {
  try {
    const params = req.body;
    const staff = await userService.addStaff(params);
    logger.info('user created ', staff.id)
    return helper.ApiResponse(res,200,true,'staff user created',{id: staff.id})  
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

// get users
router.get('/', async function(req, res, next) {
  try {
    const users = await userService.getUsers();
    return helper.ApiResponse(res,200,true, 'User list',users)    
  } catch (error) {
    logger.error(error);
    return  next(error);
  }
});


// update user
router.put('/:id', function(req, res, next) {
  // add code here
});

// delete user
router.put('/:id', function(req, res, next) {
  // add code here
});

module.exports = router;
