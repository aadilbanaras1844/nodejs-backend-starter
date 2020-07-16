
const usersRouter = require('./users');

const addRoutes = (app) => {
  app.use('/users', usersRouter);
};

module.exports = addRoutes;
