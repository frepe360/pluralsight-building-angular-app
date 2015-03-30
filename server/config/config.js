var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  development: {
    db: 'mongodb://mv_user:mv_password@localhost/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  },
  production: {
    db: 'mongodb://mv_user:mv_password@ds037087.mongolab.com:37087/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
}
