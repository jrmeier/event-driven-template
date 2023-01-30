const readYamlFile = require('utils/readYamlFile')
const injectEnvironmentParams = require('utils/injectEnvironmentParams')

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
