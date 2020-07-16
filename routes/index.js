
const usersRouter = require('./users');
const authRouter = require('./auth');
const leadsRouter = require('./leads');

const addRoutes = (app) => {
  app.use('/users', usersRouter);
  app.use('/leads', leadsRouter);
  app.use('/', authRouter);
};

module.exports = addRoutes;
