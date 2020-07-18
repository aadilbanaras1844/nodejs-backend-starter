
module.exports = {
  port: process.env.PORT || 3000,
  postgres: {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'password',
    DB: 'bbt',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  jwtKey: process.env.JWT_KEY || 'hahtesgsdfsdkljlhwjsdfsdf',

};
