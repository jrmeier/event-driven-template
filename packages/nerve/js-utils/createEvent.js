import { emit } from './emit.js'
import { MissingRequirementError } from './errorTypes.js'

export const createEvent = (
  eventName,
  eventData,
  required = []
) => {
  let entries = []
  if (Array.isArray(eventData)) {
    entries = eventData.map((detail) => createEventEntry(eventName, detail, required))
  } else {
    // create a single entry
    entries = [createEventEntry(eventName, eventData, required)]
  }

  return emit(entries)
}

export const createEventEntry = (eventName, detail, required) => {
  const missingKey = required.find(key => !Object.keys(detail).includes(key) && detail?.key)
  if (missingKey) {
    throw new MissingRequirementError(missingKey)
  }
  return {
    DetailType: eventName,
    Detail: JSON.stringify(detail),
    EventBusName: process.env.EVENT_BUS_ARN,
    Time: new Date(),
    Source: 'Socialite-JS-SDK'
  }
}
