
export class MissingRequirementError extends Error {
  constructor (variableName) {
    super(variableName)
    this.name = 'MissingRequirementError'
    this.message = `${variableName} is required.`
  }
}
