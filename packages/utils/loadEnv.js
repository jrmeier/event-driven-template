const dotenv = require('dotenv')

const loadEnv = (file = '../../.env') => {
  dotenv.config({ path: file })
}

module.exports = loadEnv