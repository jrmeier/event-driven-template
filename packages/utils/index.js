import { asyncPipe } from './asyncPipe'
import { newUTCDate } from './newUTCDate'
import { syncPipe } from './syncPipe'
import { camelCaseToSnakeCase } from './camelCaseToSnakeCase'

export const randomChoice = (array) =>
  array[Math.floor(Math.random() * array.length)]

  export const generateObjectId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16)
  const objectIdString =
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16)
      })
      .toLowerCase()

  return new mongoose.Types.ObjectId(objectIdString)
}

export const generateRandomInt = (min = 1, max = 99) =>
  Math.floor(Math.random() * (max - min)) + min

export const generateRandomString = (length = 10, symbols=true, numbers=true, upperCase=true) =>{
  const chars = 'abcdefghijklmnopqrstuvwxyz'
  const nums = '1234567890'
  const symbs = '!@#$%^&*()'
  let str = ''
  if (symbols) str += symbs
  if (numbers) str += nums
  if (upperCase) str += chars.toUpperCase()
  str += chars
  return Array(length)
    .fill(str)
    .map(function (x) {
      return x[Math.floor(Math.random() * x.length)]
    })
    .join('')
}

export const valueOrFunc = (value) =>
  typeof value === 'function' ? value() : value

  export const arrayFiller = (length, value) =>
  new Array(length).fill().map((_) => valueOrFunc(value))

export const objectFiller = (key, value, length = generateRandomInt(1, 5)) =>
  arrayFiller(length, () => ({
    [valueOrFunc(key)]: valueOrFunc(value)
  })).reduce((a, c) => ({ ...a, ...c }), {})


export {
  asyncPipe,
  camelCaseToSnakeCase,
  newUTCDate,
  syncPipe
}
