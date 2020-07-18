
const usersRouter = require('./users');
const authRouter = require('./auth');
const leadsRouter = require('./leads');

const addRoutes = (app) => {
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/leads', leadsRouter);
  app.use('/api/v1/', authRouter);
};

module.exports = addRoutes;
