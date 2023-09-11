// На выходе classObj - {0-1:null,0-2:null,1-0:null}
// ключ - двумерный индекс, значение - null
export function createIndexMap(wordsList, forClass) {
  const indexMap = {}
  const arr = wordsList
  let currentIndex = 0

  for (let wordIxd = 0; wordIxd < arr.length; wordIxd++) {
    const subArr = arr[wordIxd]

    for (let charIxd = 0; charIxd < subArr.length; charIxd++) {
      if (forClass) {
        indexMap[`${wordIxd}-${charIxd}`] = null
      } else {
        indexMap[`${wordIxd}-${charIxd}`] = currentIndex
        currentIndex += 1
      }
    }
  }
  return indexMap
}
