import fs, { writeFileSync } from 'fs'
import path from 'path'
import { arrayFiller, generateRandomInt, generateRandomString, randomChoice } from 'utils'
import { removeAllLinks } from './removePatterns'
import { santizeArray } from './sanitizeArr'

export const writeToFile = (obj, filename=generateRandomString(10,false,false)) => {
    // write to file
    const filePath = path.join(__dirname, `./${filename}.json`)
    // fs.wrire(filePath, JSON.stringify(arr, null, 2))
    console.log('arr.length', obj.length)
    writeFileSync(filePath, JSON.stringify(obj, null, 2))

}
export const createFineTuningDataFromPosts = (posts) => {
    // create prompot completion pairs
    const sanitizedPosts = santizeArray(posts)
    const dedupedPosts = [...new Set(sanitizedPosts)]
    const pairs = []
    const verbs = ["create","write","compose"]
    const nouns = [ "a post", "a social media post", "twitter post", "a tweet", "a facebook post", "a linkedIn article", "a linkedIn post"]
    const similar = ["that sounds like", "that is similar to", "that is like", "in the style of", "that is in the style of","with this voice", "similar to this voice","that is similar to this style and voice","that sounds like a finacial person "]
    const using = ["using the following numbered examples", ". Use the next few numbered examples in the of the of posts to create"]

    let i = dedupedPosts.length

    while (i--) {
        // console.log(item)
        const item = dedupedPosts[i]
        if (item) {
            const soundsLike = arrayFiller(generateRandomInt(3,15), () => randomChoice(dedupedPosts)).filter(x=>x).reduce((prev, curr, i) => [...prev, `Example ${i + 1}: ${curr}`], []).join(" ")
            const prompt = `### START OF PROMPT ### ${randomChoice(verbs)} ${randomChoice(nouns)} ${randomChoice(similar)} ${randomChoice(using)} ${soundsLike} ### END OF PROMPT ###`
            pairs.push({
                prompt,
                completion: santizeArray([item]).join(' ')
            })
        }
    }


    return pairs.filter(x=>x.prompt && x.completion)
}


import rawData from '../../../ds_posts.json'
import { OpenAIObejctEnum } from '../GraphQLTypes'



const posts = rawData
    .map(x=>x?.message || x?.caption || x?.description || x?.text?.text || x?.text)
    .filter(x=> x && typeof x == 'string')

// writeToFile([...new Set(posts)], 'posts')
