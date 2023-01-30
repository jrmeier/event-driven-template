import { createEvent } from '../js-utils/createEvent.js'

export const sendEmail = async (eventData) => await createEvent('SEND_EMAIL', eventData, ['emailAdress', 'subject', 'body'])

export const application = {
  sendEmail
}

export default application
