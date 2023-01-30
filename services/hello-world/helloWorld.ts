import { createLambdaHandler } from 'create-lambda-handler'

interface HelloWorldInterface {
  message: string
}

export const helloWorld = ({ _event, _context, ...HelloWorldInterface}) => {
  console.log('hello world: ',process.env.API_KEY)

  return {
    msg: 'hello world'
  }
}

export const handler = createLambdaHandler(helloWorld)
