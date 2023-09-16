import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useInputTextStore = defineStore('inputText', () => {
  const isTyping = ref(true)
  const typedChars = ref('')

  const idxOfLastTypedChar = computed(() => typedChars.value.length - 1)
  const lastTypedChar = computed(() => typedChars.value[idxOfLastTypedChar.value])

  return {
    isTyping,
    typedChars,
    idxOfLastTypedChar,
    lastTypedChar,
  }
})
