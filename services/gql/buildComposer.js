import { FrameworkError } from 'utils/errors'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'

export const buildComposer = ({
  model,
  name,
  canMutate = false,
  customizationOptions = {},
  fields = {},
  sortOptions,
  description = '',
  removeFields = []
}) => {
  if (!model) throw new FrameworkError(`${name}, Model not defined!`)
  let TC = null

  try {
    TC = composeMongoose(model, {
      ...customizationOptions,
      removeFields,
      name: model.modelName
    })
  } catch (e) {
    TC = schemaComposer.getOTC(model.modelName)
  }

  if (canMutate) {
    schemaComposer.Mutation.addFields({
      ...{
        [`${model.modelName}CreateMany`]: TC.mongooseResolvers.createMany(),
        [`${model.modelName}CreateOne`]: TC.mongooseResolvers.createOne(),
        [`${model.modelName}UpdateById`]: TC.mongooseResolvers.updateById(),
        [`${model.modelName}UpdateOne`]: TC.mongooseResolvers.updateOne(),
        [`${model.modelName}UpdateMany`]: TC.mongooseResolvers.updateMany(),
        [`${model.modelName}RemoveById`]: TC.mongooseResolvers.removeById(),
        [`${model.modelName}RemoveOne`]: TC.mongooseResolvers.removeOne(),
        [`${model.modelName}RemoveMany`]: TC.mongooseResolvers.removeMany()
      }
    })
  }

  schemaComposer.Query.addFields({
    ...{
      [`${model.modelName}ById`]: TC.mongooseResolvers.findById(),
      [`${model.modelName}ByIds`]: TC.mongooseResolvers.findByIds(),
      [`${model.modelName}One`]: TC.mongooseResolvers.findOne(),
      [`${model.modelName}Many`]: TC.mongooseResolvers.findMany(),
      [`${model.modelName}Count`]: TC.mongooseResolvers.count(),
      [`${model.modelName}Connection`]: TC.mongooseResolvers.connection(),
      [`${model.modelName}Pagination`]: TC.mongooseResolvers.pagination()
    }
  })

  schemaComposer.createInputTC({
    name: 'DateRangeInput',
    fields: {
      start: 'Date!',
      stop: 'Date!'
    }
  })


  TC.setDescription(description)

  TC.addFields({
    ...fields
  })

  TC.mongooseResolvers
    .findMany()
    .addSortArg({
      name: 'UPDATED_ASC',
      value: { last_updated: -1 }
    })
    .addSortArg({
      name: 'UPDATED_DESC',
      value: { last_updated: 1 }
    })

  if (sortOptions) {
    sortOptions.forEach(({ resolverName, ...rest }) => {
      TC.mongooseResolvers[resolverName]().addSortArg(rest)
    })
  }
  // console.log({ schemaComposer: Object.keys(schemaComposer.types) })
  return TC
}
