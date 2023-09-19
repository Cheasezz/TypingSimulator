<script setup>
import { BaseButton } from '@/shared/ui/baseButton'
import { useSelectWordsNumber } from '../lib/composables/selectWordsNumber'
import { arrWithWordsNumbers } from '../model/constants'
import { flexCol } from '@/shared/ui/layouts'

const { selectedWordsNumber, selectWordsNumber } = useSelectWordsNumber()
</script>

<template>
  <flexCol>
    <h1 class="text-lg">Choose words number</h1>
    <div class="flex gap-5">
      <BaseButton
        v-for="(number, index) of arrWithWordsNumbers"
        :key="index"
        :class="{
          'text-teal-400': number === selectedWordsNumber,
        }"
        type="button"
        @click="selectWordsNumber(number)"
      >
        {{ number }}
      </BaseButton>
    </div>
  </flexCol>
</template>
