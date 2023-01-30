import  { Configuration, OpenAIApi } from 'openai'
import { camelCaseToSnakeCase } from './utils/camelCaseToSnakeCase'
import { FrameworkError } from 'packages/utils/errors';
import { OPENAI_API_KEY } from 'utils/environment'


export class OpenAIError extends FrameworkError {
    constructor(message = 'UnknownError', options = { code: 0, status: "Unknown", }) {
      super(message, options)
        this.name = 'OpenAIError'
        this.message = message
    }
  }

export const apiHandler = async ( apiFnName, params) => {
  console.log("apiHandler - apiFnName: ", apiFnName, params)
    try {
        const configuration = new Configuration({ apiKey: OPENAI_API_KEY || '' })
        const openai = new OpenAIApi(configuration)
        const response = await openai[apiFnName](camelCaseToSnakeCase(params))
        return response.data
    } catch (e) {
        // handle any special cases here
        // if(e?.response?.status === 401) {
        //     throw new OpenAIError('Unauthorized', { code: 401, status: "Unauthorized"})
        // }
        throw e
      }
    }



export const OpenAIClient = ({
    listModels: (params = {}) => apiHandler('listModels', params),
    createCompletion: (params = {}) => apiHandler('createCompletion', params),
})