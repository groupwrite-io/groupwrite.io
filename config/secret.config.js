const mode = process.env.mode

switch (mode) {
  case 'dev':
    module.exports = require('./dev.secret.config')
    break;

  case 'prod':
    module.exports = require('./prod.secret.config')
    break;

  default:
    throw Error(`Unknown mode: ${mode}`)
}

console.log(`Secret config loaded for mode '${mode}'`)