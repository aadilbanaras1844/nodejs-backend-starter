const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const Validators = require('express-joi-validation').createValidator({});
const {logger, helper} = require('./../config');

const {userService} = require('./../services');
const VDS = require('./validators');

// Login User
router.post('/login', Validators.body(VDS.userLogin),
    async function(req, res, next) {
      const {username, password} = req.body;
      try {
        const user = await userService.login(username, password);
        logger.info('user logged in', username);
        return helper.apiResponse(res, 200, true, 'loggin success', user);
      } catch (error) {
        logger.error(error);
        return next(error);
      }
    });

// Login User
router.post('/logout', function(req, res, next) {
  // add code here
});


module.exports = router;
