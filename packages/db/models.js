
import mongoose from 'mongoose'

import {
  UserSchema
} from './schemas'

mongoose.plugin((schema) => {
  schema.set('toObject', { virtuals: true })
  schema.set('toJSON', { virtuals: true })
  schema.set('timestamps', true)
})

const models = {
  User: UserSchema
}

Object.keys(models).forEach(modelName => {
  try {
    models[modelName] = mongoose.model(modelName)
  } catch {
    models[modelName] = mongoose.model(modelName, models[modelName])
  }
})

export default models
