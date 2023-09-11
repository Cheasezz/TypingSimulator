import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getText } from '../api/getText'
import { mapText } from '../lib/helpers/mapText'
import { createIndexMap } from '../lib/helpers/createIndexMap'

export const useTextStore = defineStore('text', () => {
  const isLoaded = ref(false)
  const indexMap = ref({})
  const selectedWordsNumber = ref(25)
  const classObj = ref(null)
  const wordsInSeparateChars = ref(null)

  const flatedSepareteCharsArr = computed(() => wordsInSeparateChars.value.flat(1))
  const indexOfClassObj = computed(() => Object.keys(classObj.value))

  async function getWords() {
    try {
      isLoaded.value = false
      const text = await getText()

      wordsInSeparateChars.value = mapText(text[0], selectedWordsNumber.value)
      indexMap.value = createIndexMap(wordsInSeparateChars.value)
      classObj.value = createIndexMap(wordsInSeparateChars.value, true)
    } finally {
      isLoaded.value = true
    }
  }

  return {
    isLoaded,
    indexMap,
    selectedWordsNumber,
    classObj,
    indexOfClassObj,
    wordsInSeparateChars,
    flatedSepareteCharsArr,
    getWords,
  }
})
