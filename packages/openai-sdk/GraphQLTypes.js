import { schemaComposer } from "graphql-compose"

export const OpenAIModel = schemaComposer.createObjectTC({
    name: 'OpenAIModel',
    description: 'An OpenAI model that is avaliable with all its details.',
    fields: {
        id: 'String',
        object: "String",
        ownedBy: "String",
    }
})

export const OpenAICompletionInput = schemaComposer.createInputTC({
    name: 'OpenAICompletion',
    description: 'An OpenAI completion that is avaliable with all its details.',
    fields: {
        model: "OpenAIModelEnum",
        prompt: "String",
        suffix: "String",
        maxTokens: "Int",
        temperature: "Float",
        topP: "Float",
        n: "Int",
        stream: "Boolean",
        logProbs: "Int",
        echo: "Boolean",
        stop: "[String]",
        precensePenalty: "Float",
        frequencyPenalty: "Float",
        bestOf: "Int",
        logitBias: "String",
        user: "String",
    }
})



export const OpenAICompletionChoice = schemaComposer.createObjectTC({
    name: 'OpenAICompletionChoice',
    description: 'An OpenAI CompletionChoice.',
    fields: {
        text: 'String',
        index: "Int",
        logprobs: "String",
        finish_reason: "String",
    }
})

  
export const OpenAICompletetion = schemaComposer.createObjectTC({
    name: 'OpenAICompletion',
    description: 'An OpenAI completion that is avaliable with all its details.',
    fields: {
        id: 'String',
        object: "OpenAIObejctEnum",
        created: "Int",
        model: "OpenAIModelEnum",
        choices: [OpenAICompletionChoice]
    }
})

export const OpenAIObejctEnum = schemaComposer.createEnumTC({
    name: 'OpenAIObejctEnum',
    description: 'An OpenAI model that is avaliable with all its details.',
    values: {
        text_completion: {
            value: 'text_completion',
        }
    }
})
    

export const OpenAIModelEnum = schemaComposer.createEnumTC({
    name: 'OpenAIModelEnum',
    description: 'An OpenAI model that is avaliable with all its details.',
    values: {
        textDavinci003: {
            value: 'text-davinci-003',
            description: 'Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text. 4,000 tokens. Up to Jun 2021'
        },
        textCurie001: {
            value: 'text-curie-001',
            description: 'Very capable, but faster and lower cost than Davinci. 2,048 tokens. Up to Oct 2019'
        },
        textBabbage001: {
            value: 'text-babbage-001',
            description: 'Capable of straightforward tasks, very fast, and lower cost. 2,048 tokens. Up to Oct 2019'
        },
        textAda001: {
            value: 'text-ada-001',
            description: 'Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.'
        }
    }
})




export const OpenAIFineTunedData = schemaComposer.createObjectTC({
    name: 'OpenAIFineTunedData',
    description: 'Fine tuned data generatation from list of post texts to use as training data for OpenAI "fine-tuning" API.',
    fields: {
        prompt: 'String!',
        completion: 'String!'
    }
})