import { Logger } from './logger'
import { getConnection } from 'db'

import {
  DB_URI,
  DEPLOY_TIME,
  GIT_BRANCH,
  GIT_SHA,
  LOG_LEVEL,
  SERVICE,
  STAGE
} from 'utils/environment'
import { eventToPayload } from './eventToPayload'
import { makeReturnHandler } from './returnHandler'

export const createLambdaHandler = ({ handlerFunction, serviceVersion }) => {
  // Instantiate the logger
  const logger = new Logger({
    handlerName: handlerFunction.name,
    version: serviceVersion,
    gitBranch: GIT_BRANCH,
    gitSha: GIT_SHA,
    deployTime: DEPLOY_TIME,
    stage: STAGE,
    service: SERVICE,
    logLevel: LOG_LEVEL
  })

  // Instantiate the return handler for consistent responses
  const returnHandler = makeReturnHandler({
    logger,
    version: serviceVersion,
    gitBranch: GIT_BRANCH,
    gitSha: GIT_SHA,
    deployTime: DEPLOY_TIME
  })
  let payload = {}
  // Create the lambda handler that preforms consistent setup and teardown
  return async (event, context) => {
    try {
      // Don't limit node listeners, important for serverless architecture
      process.setMaxListeners(0)
      // Important for MongoDB responses and connection health
      context.callbackWaitsForEmptyEventLoop = false
      // Connect to the database
      const db = await getConnection({ dbUri: DB_URI, stage: STAGE })

      // create consistent event payload for the handler
      // Ensure to inject database and logger as well as original event and context
      payload = await eventToPayload({
        _event: event,
        _context: context,
        db,
        logger
      })

      // Run the handler
      const results = await handlerFunction(payload)

      // return the results
      return returnHandler(results)
    } catch (error) {
      // If there is an error, log it and return it.
      const { _event, _context, db, logger, ...rest } = payload || {}
      let newError = {
        payload: rest,
        error: {
          message: error?.message,
          stack: error?.stack,
          name: error?.name
          // ...error
        }
      }

      logger?.error(newError)
      return {
        statusCode: 400,
        body: JSON.stringify(newError)
      }
    }
  }
}
