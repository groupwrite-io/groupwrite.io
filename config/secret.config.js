// Read standard config
let config;
const mode = process.env.mode
console.log(`Loading secret config, mode='${mode}'`)
switch (mode) {
  case 'prod':
    config = require('./prod.secret.config')

  case 'dev':
  default:
    config = require('./dev.secret.config')
}

// Local file overrides if it exists 
const fs = require('fs')
const path = require('path')
const localConfigFile = path.join(__dirname, '/local.secret.config.js')
if (fs.existsSync(localConfigFile)) {
  console.log('Overriding with local config file')
  var localConfig = require(localConfigFile)
  Object.assign(config, localConfig)
} else {
  console.log('Not overriding')
}

module.exports = config
