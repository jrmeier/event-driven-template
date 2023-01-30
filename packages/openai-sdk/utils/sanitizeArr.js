import { syncPipe } from "utils";
import { removeAllLinks, removeAllEmails, removeAllHashtags, removeAllPhoneNumbers } from './removePatterns'

export const santizeArray = (arr) => arr
    .map(syncPipe(
        x => x, // remove null
        removeAllEmails,
        removeAllLinks,
        removeAllHashtags,
        removeAllPhoneNumbers
    ))
    

