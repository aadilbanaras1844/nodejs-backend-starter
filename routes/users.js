const express = require('express');
const Validators = require('express-joi-validation').createValidator({});
const router = express.Router();

const { userService } = require('./../services');
const {logger, helper} = require('./../config');
const VDS = require('./validators');
const { mv_super_admin } = require('./middlewares');

// add staff
router.post('/staff', mv_super_admin, Validators.body(VDS.addStaff), async function(req, res, next) {
  try {
    const params = req.body;
    const staff = await userService.addStaff(params);
    logger.info('staff user created id =>'+ staff.id)
    return helper.ApiResponse(res,200,true,'staff user created',{id: staff.id})  
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

// get users
router.get('/', mv_super_admin, async function(req, res, next) {
  try {
    const users = await userService.getUsers();
    return helper.ApiResponse(res,200,true, 'User list',users)    
  } catch (error) {
    logger.error(error);
    return  next(error);
  }
});

// update user
router.put('/:id', mv_super_admin, Validators.body(VDS.updateUser), async function(req, res, next) {
  try {
    const id = req.params.id;
    const params = req.body;
    const user = await userService.updateUser(id, params)
    return helper.ApiResponse(res,200,true, 'User Update',user)    
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

// delete user
router.delete('/:id', mv_super_admin, async function(req, res, next) {
  try {
    const id = req.params.id;
    await userService.deleteUser(id);
    return helper.ApiResponse(res,200,true, 'User Delete',id)    
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

module.exports = router;
