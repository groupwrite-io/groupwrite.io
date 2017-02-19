const mode = process.env.mode

switch (mode) {
  case 'prod':
    module.exports = require('./prod.secret.config')
    break;

  case 'dev':
  default:
    module.exports = require('./dev.secret.config')
    break;
}

console.log(`Secret config loaded for mode '${mode}'`)