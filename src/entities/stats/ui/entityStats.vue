<script setup>
import { storeToRefs } from 'pinia'
import { useStatsStore } from '../model/store'
import { useVisualizationStore } from '@/features/typingTextVisualization'

const statsStore = useStatsStore()
const visualStore = useVisualizationStore()
const statsArr = Object.entries(storeToRefs(statsStore))
</script>

<template>
  <div
    v-if="visualStore.typingIsOver"
    class="flex flex-col items-center"
  >
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7">Stats After Typing</h3>
    </div>
    <div class="mt-2">
      <dl class="w-52">
        <div
          v-for="(stat, index) of statsArr"
          :key="index"
          class="px-4 py-4 flex justify-between items-center"
        >
          <dt class="text-sm font-medium">{{ stat[0] }}</dt>
          <dd
            class="text-sm"
            :class="stat[0] === 'mistaks' ? 'text-red-300' : 'text-teal-400'"
          >
            {{ stat[1] }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
