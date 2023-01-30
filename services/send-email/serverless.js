const readYamlFile = require('utils/readYamlFile')
const loadEnv = require('utils/loadEnv')
const injectEnvironmentParams = require('utils/injectEnvironmentParams')
loadEnv('../../.env')

const serviceName = __dirname.split('/').pop()
const coreConfig = readYamlFile('../../serverless_core.yml')
const serviceConfig = readYamlFile('./serverless_config.yml')
const injectedServiceConfig = injectEnvironmentParams(coreConfig, serviceConfig)

const config = {
  service: serviceName,
  ...coreConfig,
  ...injectedServiceConfig
}

module.exports = config
