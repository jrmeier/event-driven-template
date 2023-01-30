import * as UserSchemaModule from './UserSchema'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { beforeAll, afterAll, afterEach } from '@jest/globals'
import { faker } from '@faker-js/faker'

describe('SocialNetworkSchema', () => {
  let conn
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    conn = await mongoose.connect(mongoServer.getUri(), {})
  })

  afterAll(async () => {
    await conn.disconnect()
    await mongoServer.stop()
  })

  afterEach(async () => {
    await conn.connection.dropDatabase()
  })

  const mockUserBasic = {
    name: faker.name.fullName(),
    email: faker.internet.email()
  }

  test('should succesfully create a SocialNetworkSchema', async () => {
    const UserModel = mongoose.model('User', UserSchemaModule.UserSchema)
    const newUser = await UserModel.create(mockUserBasic)
    expect(newUser.email).toEqual(mockUserBasic.email)
    expect(newUser.name).toBe(mockUserBasic.name)
    expect(newUser.updatedAt.getTime()).toBeCloseTo(new Date().getTime(), -10000)
    expect(newUser.createdAt.getTime()).toBeCloseTo(new Date().getTime(), -10000)
  })

  test('should fail to create a social network because of missing requriments', async () => {
    const mockSocialNetworkModel = mongoose.model('SocialNetwork', SocialNetworkDA.SocialNetworkSchema)
    try {
      await mockSocialNetworkModel.create({})
    } catch (error) {
      expect(error.message).toEqual('SocialNetwork validation failed: socialNetworkType: Path `socialNetworkType` is required., uid: Path `uid` is required.')
    }
  })
})
