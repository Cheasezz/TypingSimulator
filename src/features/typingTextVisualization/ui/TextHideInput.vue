<script setup>
import { HideInput } from '@/shared/ui'
import { useInputFocus } from '../lib/composables/useInputFocus'
import { onBeforeMount, watch } from 'vue'
import { useVisualizationStore } from '../model/model'
import { storeToRefs } from 'pinia'

const { isTyping, typedChars, input } = useInputFocus()
const visualStore = useVisualizationStore()
const { typingIsOver } = storeToRefs(visualStore)
const { createVisualizationClassObj, updateClassObj } = visualStore

onBeforeMount(() => {
  createVisualizationClassObj()
})

watch(
  typedChars,
  (newVal, oldVal) => {
    // if (oldVal === '') console.log(1111)

    if (typingIsOver.value) return
    updateClassObj(newVal, oldVal)
  },
  { flush: 'post' },
)
watch(isTyping, () => {
  if (isTyping.value) {
    input.value?.$refs.input.focus()
  }
})
</script>

<template>
  <HideInput
    v-if="!typingIsOver"
    ref="input"
    v-model="typedChars"
    @blur="isTyping = false"
  />
</template>
