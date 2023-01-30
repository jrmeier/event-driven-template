import * as dataAccess from './dataAccess'
import { afterEach } from '@jest/globals'
// import mongoose from 'mongoose'

jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  connect: jest.fn(() => 'mockConnection'),
  plugin: jest.fn(() => 'mockPlugins'),
  connection: {
    close: jest.fn(() => 'mockClose')
  }
}))

describe('dataAccess', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  test('getConnection should be singleton and connect', async () => {
    const result = await dataAccess.getConnection()

    expect(result.connect._isMockFunction).toBe(true)
    expect(result.connect).toHaveBeenCalledTimes(1)
    await dataAccess.getConnection()
    expect(result.connect).toHaveBeenCalledTimes(1)
  })

  test('closeConnection should succesfully be called', async () => {
    jest.mock('mongoose', () => ({
      ...jest.requireActual('mongoose'),
      connect: jest.fn(() => 'mockConnection'),
      plugin: jest.fn(() => 'mockPlugins'),
      connection: {
        close: jest.fn(() => 'mockClose')
      }
    }))
    const result = await dataAccess.closeConnection()

    expect(result).toBe(undefined)
  })
})
