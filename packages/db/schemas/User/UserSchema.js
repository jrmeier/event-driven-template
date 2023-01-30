import mongoose, { Schema } from 'mongoose'
import { algo } from 'crypto-js'

export const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

UserSchema.methods.setPassword = function ({ newPassword }) {
  const salt = process.env.USER_PASSWORD_SALT
  // create the hash

}
