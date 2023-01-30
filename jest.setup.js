// eslint-disable-next-line unused-imports/no-unused-imports
import environment from 'utils/environment'

jest.mock('utils/environment', () => ({
  DEPLOY_TIME: 'DEPLOY_TIME',
  GIT_BRANCH: 'GIT_BRANCH',
  GIT_SHA: 'GIT_SHA',
  LOG_LEVEL: 'LOG_LEVEL',
  SERVICE: 'SERVICE',
  STAGE: 'STAGE',
  AWS_REGION: 'AWS_REGION',
  AWS_ACCESS_KEY_ID: 'AWS_ACCESS_KEY_ID',
  AWS_SECRET_ACCESS_KEY: 'AWS_SECRET_ACCESS_KEY',
  AWS_SESSION_TOKEN: 'AWS_SESSION_TOKEN',
  DB_URI: 'DB_URI',
  EVENT_BUS_ARN: 'EVENT_BUS_ARN',
}))
