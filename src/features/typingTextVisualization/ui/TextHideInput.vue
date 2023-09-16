<script setup>
import { HideInput } from '@/shared/ui/hideInput'
import { useInputFocus } from '../lib/composables/useInputFocus'
import { onBeforeMount, watch } from 'vue'
import { useVisualizationStore } from '../model/store'
import { storeToRefs } from 'pinia'
import { useStatsStore } from '@/entities/stats'
import { useTextStore } from '@/entities/text'

const { isTyping, typedChars, input } = useInputFocus()
const visualStore = useVisualizationStore()
const statsStore = useStatsStore()
const textStore = useTextStore()

const { typingIsOver, correctChar } = storeToRefs(visualStore)
const { createVisualizationClassObj, updateClassObj } = visualStore
const { statInitialValues, statFinalValues, incrementMistakes } = statsStore
const { flatedSepareteCharsArr } = storeToRefs(textStore)

onBeforeMount(() => {
  createVisualizationClassObj()
})

watch(typedChars, (newVal, oldVal) => {
  const charsCounter = flatedSepareteCharsArr.value.length - 1
  if (oldVal === '') statInitialValues(charsCounter)

  updateClassObj(newVal, oldVal)

  if (!correctChar.value) incrementMistakes()

  if (typingIsOver.value) statFinalValues()
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
