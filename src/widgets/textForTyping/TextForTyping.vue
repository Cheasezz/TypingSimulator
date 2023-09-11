<script setup>
import { entityText } from '@/entities/text'
import { IconSpinner } from '@/shared/ui'
import { ButtonTextRefresh } from '@/features/textRefresh'
import { NumberOfWords } from '@/features/choiceNumberOfWords'
import { TextHideInput } from '@/features/typingTextVisualization'
import { unfocusModal } from '@/features/unfocusModal'
</script>

<template>
  <NumberOfWords />

  <entityText>
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

  <ButtonTextRefresh />
</template>
