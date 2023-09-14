<script setup>
import { HideInput } from '@/shared/ui/hideInput'
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

watch(typedChars, (newVal, oldVal) => {
  updateClassObj(newVal, oldVal)
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
