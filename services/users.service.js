/* eslint-disable require-jsdoc */


const Cruds = require('./Cruds');
const {UsersModel} = require('./../models');

class UserService extends Cruds {}

const userService = new UserService(UsersModel, {});

module.exports = userService;


