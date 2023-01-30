import { createLambdaHandler } from 'create-lambda-handler'

export const sendEmail = ({ emailAddress }) => {
  console.log('hello world')

  return {
    msg: 'send email'
  }
}

export const handler = createLambdaHandler(sendEmail)
