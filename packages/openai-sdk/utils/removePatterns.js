const urlRegex = /((?:(?:http|ftp|ws)s?|sftp):\/\/?)?([^:/\s.#?]+\.[^:/\s#?]+|localhost)(:\d+)?((?:\/\w+)*\/)?([\w\-.]+[^#?\s]+)?([^#]+)?(#[\w-]*)?$/g;
const emailRegex = /([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g;
const phoneRegex = /(\+?(\d{1,3})[\s.-]?)?(\(?\d{3}\)?[\s.-]?)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
const hashtagRegex = /\#[a-zA-Z]{1,}/ig;

const leftReplace = "["
const rightReplace = "]"

export const removeAllHashtags = (str ='', replace=`${leftReplace}HASHTAG${rightReplace}`) => str?.replace(hashtagRegex, replace)
export const removeAllLinks = (str='', replace =`${leftReplace}LINK${rightReplace}`) => str?.replace(urlRegex, replace)
export const removeAllEmails = (str='', replace =`${leftReplace}EMAIL${rightReplace}`) => str?.replace(emailRegex, replace)
export const removeAllPhoneNumbers = (str='', replace =`${leftReplace}PHONE${rightReplace}`) => str.replace(phoneRegex, replace)

