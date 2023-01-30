import { createEventBridge } from 'utils/createEventBridge'

export const emit = (events) => {
  const eventBridge = createEventBridge()
  return Promise.all(createEventBridgeEntryGroups(events)
    .map(group => eventBridge.putEvents({ Entries: group }).promise()), { concurrency: 10 })
}

export const createEventBridgeEntryGroups = (events) =>
  // we can't add more than 10 entries at a time
  // https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEvents.html
  events.reduce((groups, curr, i) => {
    const endIndex = Math.floor(i / 10)

    groups[endIndex] = [].concat((groups[endIndex] || []), curr)

    return groups
  }, [])
