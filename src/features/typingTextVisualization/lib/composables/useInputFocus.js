import { useInputTextStore } from '@/entities/inputingText'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useInputFocus() {
  const inputTextStore = useInputTextStore()
  const { typedChars, isTyping } = storeToRefs(inputTextStore)
  const input = ref(null)

  function inputFocus() {
    isTyping.value = true
  }
  onMounted(() => {
    inputFocus()
    input.value.$refs.input.focus()
    document.addEventListener('keyup', inputFocus)
  })
  onBeforeUnmount(() => {
    typedChars.value = ''
    document.removeEventListener('keyup', inputFocus)
  })
  return { typedChars, isTyping, input }
}
