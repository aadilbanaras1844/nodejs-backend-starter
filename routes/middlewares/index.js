
const jwt = require('jsonwebtoken');
const {keys} = require('./../../config');

module.exports.mvSuperAdmin = function(req, res, next) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) {
    return next(new Error('Access denied, No token provided'));
  }
  try {
    const decoded = jwt.verify(token, keys.jwtKey);
    if (!decoded.is_super_admin) {
      return next(new Error('Access denied, Not a Super Admin'));
    }
    req.user = decoded;
    next();
  } catch (ex) {
    console.log(ex);
    return next('Access denied, Invalid token.');
  }
};

module.exports.mvStaff = function(req, res, next) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) {
    return next(new Error('Access denied, No token provided'));
  }
  try {
    const decoded = jwt.verify(token, keys.jwtKey);
    if (!decoded.is_staff) {
      return next(new Error('Access denied, Not a Staff'));
    }
    req.user = decoded;
    next();
  } catch (ex) {
    console.log(ex);
    return next('Access denied, Invalid token.');
  }
};
