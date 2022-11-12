const pkg = require('../../package.json');

module.exports = {
  applicationName: pkg.name,
  mongodb: {
    Url: `mongodb://localhost:37017/shopper`
  },
  redis: {
    port: 7379,
    client: null
  },
  mysql: {
    options: {
      port: 3406,
      host: "localhost",
      database: "shopper",
      dialect: "mysql",
      username: "root",
      password: "mypassword"
    },
    client: null
  },
};
