import emit from './emit.js'
import { createEventBridge } from 'utils/createEventBridge'

jest.mock('utils/createEventBridge')

describe('emit', () => {
  it('should emit an event', async () => {
    const mockEvent = { Detail: 'https://www.youtube.com/watch?v=S9bCLPwzSC0 - absolute banger' }
    createEventBridge.mockReturnValue({ putEvents: jest.fn().mockReturnValue({ promise: jest.fn().mockReturnValue(Promise.resolve([{}])) }) })
    const emitPromises = await emit(mockEvent)

    expect(emitPromises.length).toEqual(1)
  })

  it('should emit multiple events', async () => {
    const mockEvents = [
      { msg: 'https://www.youtube.com/watch?v=S9bCLPwzSC0 - absolute banger' },
      { msg: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ - turn it up' },
      { msg: 'three is plenty' }
    ]

    createEventBridge.mockReturnValue({ putEvents: jest.fn().mockReturnValue({ promise: jest.fn().mockReturnValue(Promise.resolve([...mockEvents])) }) })
    const emitPromises = await emit(mockEvents)
    console.log({ emitPromises })
    expect(emitPromises.length).toEqual(3)
  })
})
