import { schemaComposer } from 'graphql-compose'

export const customizeTypes = (typeName, customizeFn) => {
  const type = schemaComposer.getOTC(typeName)
  if (type) {
    customizeFn(type)
  }
}
