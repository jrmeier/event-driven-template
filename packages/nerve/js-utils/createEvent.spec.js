import { createEventBridge } from 'utils/createEventBridge'

const createEventMod = require('./createEvent')

jest.mock('aws-sdk', () => {
  return {
    EventBridge: () => ({
      putEvents: jest.fn().mockReturnValue({ promise: jest.fn().mockReturnValue(Promise.resolve([{}])) })
    })
  }
})

// jest.mock('utils/createEventBridge', () => {
//   return {
//     createEventBridge: jest.fn().mockReturnValue({ putEvents: jest.fn().mockReturnValue({ promise: jest.fn().mockReturnValue(Promise.resolve()) }) })
//   }
// })

describe('createEvent', () => {
  test('should successfully create an event', async () => {
    const eventName = 'ONBOARD_PAGE'
    const eventData = {
      accessToken: 'accessToken',
      uid: 'uid',
      socialNetworkType: 'FB_PAGE'
    }
    // createEventBridge.mockReturnValue({ putEvents: jest.fn().mockReturnValue({ promise: jest.fn().mockReturnValue(Promise.resolve([{}])) }) })
    jest.spyOn(createEventMod, 'createEventEntry')
    await createEventMod.createEvent(eventName, eventData)
    expect(createEventMod).toHaveBeenCalled()
  })

  // test('should fail to create an event because of requirements', async () => {
  //   const eventName = 'ONBOARD_PAGE'
  //   const eventData = {
  //     accessToken: 'accessToken'
  //   }
  //   const required = ['accessToken', 'uid', 'socialNetworkType']

  //   try {
  //     await createEvent(eventName, eventData, required)
  //   } catch (error) {
  //     expect(error.message).toBe('uid is required.')
  //   }
  // })

  // test('should fail to create an event because of requirements', async () => {
  //   const eventName = 'ONBOARD_PAGE'
  //   const eventData = {
  //     accessToken: 'accessToken',
  //     uid: null
  //   }
  //   const required = ['accessToken', 'uid', 'socialNetworkType']

  //   try {
  //     await createEvent(eventName, eventData, required)
  //   } catch (error) {
  //     expect(error.message).toBe('uid is required.')
  //   }
  // })

  // test('should fail to create an event because of requirements', async () => {
  //   const eventName = 'ONBOARD_PAGE'
  //   const eventData = {
  //     accessToken: 'accessToken',
  //     uid: 'uid',
  //     socialNetworkType: undefined
  //   }
  //   const required = ['accessToken', 'uid', 'socialNetworkType']

  //   try {
  //     await createEvent(eventName, eventData, required)
  //   } catch (error) {
  //     expect(error.message).toBe('socialNetworkType is required.')
  //   }
  // })
})
