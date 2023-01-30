import { schemaComposer } from "graphql-compose"
import { OpenAIModel } from './GraphQLTypes'
import { OpenAIClient } from './index'
import { createFineTuningDataFromPosts } from "./utils/createFineTuningDataFromPosts"

export const openAIModelsResolver = schemaComposer.createResolver({
    name: 'getOpenAIModels',
    type: '[OpenAIModel]',
    description: 'Get all OpenAI models',
    args: {},
    resolve: async () => {
        const res = await OpenAIClient.listModels()
        return res
    }
})

export const openAICompletionResolver = schemaComposer.createResolver({
    name: 'getOpenAICompletion',
    type: 'OpenAICompletion',
    description: 'Get OpenAI completion',
    args: {
        prompt: 'String!',
        model: {
            type: 'OpenAIModelEnum',
            defaultValue: 'text-davinci-003'
        },
        maxTokens: {
            type: 'Int',
            defaultValue: 300
        },
        temperature: {
            type: 'Float',
            defaultValue: 1.0
        },
        topP: {
            type: 'Float',
            defaultValue: 1.0
        },
        n: {
            type: 'Int',
            defaultValue: 1
        },
        logprobs: {
            type: 'Int',
            defaultValue: null
        }
    },
    resolve: async ({ args }) => {
        const res = await OpenAIClient.createCompletion(args)
        return res
    }
})

export const openAIGenerateFineTunedDataFromPostsResolver = schemaComposer.createResolver({
    name: 'generateFineTunedDataFromPosts',
    type: '[OpenAIFineTunedData]',
    description: 'Generate fine tuned data from posts',
    args: {
        rawData: '[String!]!',
        upload: {
            type: 'Boolean',
            defaultValue: false
        }
    },
    resolve: async ({ args }) => {
        // get the raw data
        const { rawData, upload } = args
        return createFineTuningDataFromPosts(rawData)
    }
})

// Keep at bottom of file

export const OpenAIQuery = {
    getOpenAIModels: openAIModelsResolver,
    getOpenAICompletion: openAICompletionResolver
}

export const OpenAIMutation = {
    generateOpenAIFineTunedDataFromPosts: openAIGenerateFineTunedDataFromPostsResolver
}