export class FrameworkError extends Error {
  constructor(message, ...rest) {
    super(message)
    this.name = this.constructor.name
    this.message = `${this.constructor.name}: ${this.parseValue(message)}`
    this.type = rest?.type
    rest?.map((x) => {
      const key = Object.keys(x).pop()
      const value = x[key]
      if (['name', 'message', 'type'].includes(key)) {
        return
      }
      this[key] = this.parseValue(this.name, value)
    })
  }

  parseValue(value) {
    try {
      if (Object.prototype.hasOwnProperty.call(value, 'toObject')) {
        return value.toObject()
      } else if (value === Object(value)) {
        return JSON.stringify(value, null, 3)
      } else {
        return value
      }
    } catch {
      //skip it
      return undefined
    }
  }

  toString() {
    return JSON.stringify(this || {}, null, 3)
  }
}
