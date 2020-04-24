require('dotenv').config();

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: MYSQL_HOST,
      port: parseInt(MYSQL_PORT, 10),
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    },
    migrations: {
      directory: './fixtures/mysql/migrations',
    },
    seeds: {
      directory: './fixtures/mysql/seeds',
    },
  },

  staging: {},

  production: {},

};
