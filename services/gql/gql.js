import { buildGraphSchema } from './buildGraphSchema'
import { createLambdaHandler } from 'create-lambda-handler'
import { graphql } from 'graphql'
import { version } from './package.json' // eslint-disable-line


export const graphqlHandler = async ({ _event, db, query, variables }) => {
  const graphSchema = buildGraphSchema(db)

  

  const gqlOptions = {
    schema: graphSchema,
    source: query,
    rootValue: {},
    contextValue: { db },
    variableValues: variables
  }
  const graphResults = await graphql(gqlOptions)
  return graphResults
}

export const handler = createLambdaHandler({
  handlerFunction: graphqlHandler,
  serviceVersion: version
})
