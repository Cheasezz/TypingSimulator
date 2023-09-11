import { useTextStore } from '@/entities/text'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

export function useSelectWordsNumber() {
  const textStore = useTextStore()
  const { selectedWordsNumber } = storeToRefs(textStore)
  const { getWords } = textStore

  function selectWordsNumber(wordsNum) {
    selectedWordsNumber.value = wordsNum
  }
  watch(selectedWordsNumber, async () => {
    await getWords()
  })
  return { selectedWordsNumber, selectWordsNumber }
}
