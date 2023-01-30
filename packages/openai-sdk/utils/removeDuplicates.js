export const removeDuplicates = (arr, field) => {
    let i = arr.length;
    const newArr = []
    // create a hash table of the unique values
    const hashTable = {}
    while (i--) {
        const item = arr[i]
        let hash = ""
        
        // if the field is set, use that to determine uniqueness
        if(field) {
            hash = JSON.stringify(item[field])
        } else {
            hash = JSON.stringify(item)
        }

        if (!hashTable[hash]) {
            hashTable[hash] = item
            newArr.push(item)
        }

    }
    return newArr
}
