import {
  buildUserTC
} from 'db/graphSchemaBuilders'

import { schemaComposer } from 'graphql-compose'

import { buildComposer } from './buildComposer'
import { buildUnionTypes } from './buildUnionTypes'
import { customizeTypes } from './customizeTypes'
// eslint-disable-next-line
import { OpenAIQuery, OpenAIMutation } from 'openai-sdk/GraphQLResolvers'

export const buildGraphSchema = ({ models }) => {
  const typeComposers = { 
    UserTC: buildComposer(buildUserTC(models)),
  }
  schemaComposer.Query.addFields(OpenAIQuery)
  schemaComposer.Mutation.addFields(OpenAIMutation)
  
  try {
    return schemaComposer.buildSchema()
  } catch (e) {
    console.log(e)
    return schemaComposer
  }
}
