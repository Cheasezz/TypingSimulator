import { useInputTextStore } from '@/entities/inputingText'
import { useTextStore } from '@/entities/text'
import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'
import { addCaret, removeCaret } from '../lib/helpers/caret'
import { addColor, removeColor } from '../lib/helpers/coloring'

export const useVisualizationStore = defineStore('vizual', () => {
  const inputTextStore = useInputTextStore()
  const textStore = useTextStore()
  const { flatedSepareteCharsArr, classObj, indexOfClassObj } = storeToRefs(textStore)
  const { idxOfLastTypedChar, lastTypedChar } = storeToRefs(inputTextStore)

  const correctChar = computed(
    () => lastTypedChar.value === flatedSepareteCharsArr.value[idxOfLastTypedChar.value],
  )
  const typingIsOver = computed(
    () => idxOfLastTypedChar.value > flatedSepareteCharsArr.value.length - 1,
  )

  function createVisualizationClassObj() {
    for (let key in classObj.value) {
      classObj.value[key] = {
        'text-teal-400': false,
        'text-red-300': false,
        classForCaret: key === '0-0' ? true : false,
      }
    }
  }

  function updateClassObj(newVal, oldVal) {
    const charIsDeleted = newVal < oldVal

    if (charIsDeleted) {
      removeColor(classObj, indexOfClassObj, idxOfLastTypedChar)
      removeCaret(classObj, indexOfClassObj, idxOfLastTypedChar)
    } else {
      addColor(correctChar, classObj, indexOfClassObj, idxOfLastTypedChar)
      addCaret(classObj, indexOfClassObj, idxOfLastTypedChar)
    }
  }

  return {
    typingIsOver,
    createVisualizationClassObj,
    updateClassObj,
  }
})
