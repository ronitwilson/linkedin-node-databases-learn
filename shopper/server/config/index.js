const pkg = require('../../package.json');

module.exports = {
  applicationName: pkg.name,
  mongodb: {
    Url: `mongodb://localhost:37017/shopper`
  },
  redis: {
    port: 7379,
    client: null
  }

};
