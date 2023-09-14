<script setup>
import { BaseButton } from '@/shared/ui/baseButton'
import { useSelectWordsNumber } from '../model/selectWordsNumber'

const arrWithWordsNumbers = [10, 25, 50, 100]
const { selectedWordsNumber, selectWordsNumber } = useSelectWordsNumber()
</script>

<template>
  <div class="flex flex-col items-center gap-6 text-2xl">
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
  </div>
</template>
