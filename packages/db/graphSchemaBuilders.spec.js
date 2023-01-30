import {
  buildUserTC
} from './graphSchemaBuilders'

test('User', () => {
  expect((
    { User: { } }
  )).toEqual({
    name: 'User',
    model: {},
    description: 'A social network, that helps schedule a default pages and its related posts.',
    canMutate: true
  })
})
