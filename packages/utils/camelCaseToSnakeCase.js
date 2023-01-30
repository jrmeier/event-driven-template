export const camelCaseToSnakeCase =  (inputObj = {}) => Object.keys(inputObj).reduce((prev, key) => ({
    ...prev,
    [key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)]: inputObj[key] 
  }), {})