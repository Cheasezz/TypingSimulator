<script setup>
import { useInputTextStore } from '@/entities/inputingText'
import { useVisualizationStore } from '@/features/typingTextVisualization'
import { ModalWindow } from '@/shared/ui/modalWindow'

const inputTextStore = useInputTextStore()
const visualStore = useVisualizationStore()
</script>

<template>
  <ModalWindow
    v-if="!inputTextStore.isTyping && !visualStore.typingIsOver"
    @click="inputTextStore.isTyping = true"
  >
    Click here or start typing
  </ModalWindow>
</template>
