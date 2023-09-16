<script setup>
import { entityText } from '@/entities/text'
import { entityStats } from '@/entities/stats'
import { IconSpinner } from '@/shared/ui/icons'
import { ButtonTextRefresh } from '@/features/textRefresh'
import { NumberOfWords } from '@/features/choiceNumberOfWords'
import { TextHideInput, useVisualizationStore } from '@/features/typingTextVisualization'
import { unfocusModal } from '@/features/unfocusModal'

const visualStore = useVisualizationStore()
</script>

<template>
  <NumberOfWords />

  <entityText v-show="!visualStore.typingIsOver">
    <template #loader>
      <IconSpinner class="absolute inset-x-1/2 inset-y-1/2 animate-spin" />
    </template>
    <template #modal>
      <unfocusModal />
    </template>
    <template #input>
      <TextHideInput />
    </template>
  </entityText>

  <entityStats />

  <ButtonTextRefresh />
</template>
