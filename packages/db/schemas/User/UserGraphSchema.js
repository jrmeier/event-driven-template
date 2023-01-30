
export const buildUserTC = models => ({
  name: 'User',
  model: models.User,
  description: 'A user that can login and access the system.',
  canMutate: true,
  removeFields: ['password'],
})

// export const buildUserRelations = ({
//   UserTC
// }) => {
//   UserTC.addRelation('RelatedEntity', {
//     resolver: () => RelatedEntity.mongooseResolvers.findMany(),
//     prepareArgs: {
//       filter: source => ({ userId })
//     },
//     projection: {
//       uid: 1
//     }
//   })
// }
