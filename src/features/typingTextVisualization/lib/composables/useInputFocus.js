import { useInputTextStore } from '@/entities/inputingText'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

export function useInputFocus() {
  const inputTextStore = useInputTextStore()
  const { typedChars, isTyping } = storeToRefs(inputTextStore)
  const input = ref(null)

  function inputFocus() {
    isTyping.value = true
  }
  watch(
    isTyping,
    () => {
      if (isTyping.value) {
        input.value?.$refs.input.focus()
      }
    },
    { flush: 'post' },
  )
  onMounted(() => {
    input.value.$refs.input.focus()
    inputFocus()
    document.addEventListener('keyup', inputFocus)
  })
  onBeforeUnmount(() => {
    typedChars.value = ''
    document.removeEventListener('keyup', inputFocus)
  })
  return { typedChars, isTyping, input }
}
