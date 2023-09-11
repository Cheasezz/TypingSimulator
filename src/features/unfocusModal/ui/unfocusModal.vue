<script setup>
import { useInputTextStore } from '@/entities/inputingText'
import { useVisualizationStore } from '@/features/typingTextVisualization/model/model'
// import { useTextStore } from '@/entities/text';
import { ModalWindow } from '@/shared/ui'
import { storeToRefs } from 'pinia'

const inputTextStore = useInputTextStore()
const visualStore = useVisualizationStore()
const { isTyping } = storeToRefs(inputTextStore)
const { typingIsOver } = storeToRefs(visualStore)
</script>

<template>
  <ModalWindow
    v-if="!isTyping && !typingIsOver"
    :text="'Click here or start typing'"
    @click="isTyping = true"
  />
</template>
