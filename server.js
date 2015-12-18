require('babel-core/register');
var env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  require('./server/production.js');
} else {
  require('./server/development.js');
}
