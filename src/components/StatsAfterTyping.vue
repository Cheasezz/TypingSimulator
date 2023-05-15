<script>
import { useStatsStore } from '../stores/StatsStore';
import { mapStores } from 'pinia';
export default {
  computed: {
		...mapStores(useStatsStore),
  },

};
</script>
<template>
  <div class="flex flex-col items-center">
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7">Stats After Typing</h3>
    </div>
    <div class="mt-2">
      <dl class="w-52">
        <div class="px-4 py-4 flex justify-between items-center">
          <dt class="text-sm font-medium ">Time</dt>
          <dd class="text-sm text-teal-400">
            {{ statsStore.formatedMin }} min {{ statsStore.formatedSec }} sec
          </dd>
        </div>
        <div class="px-4 py-4 flex justify-between items-center">
          <dt class="text-sm font-medium ">CPM</dt>
          <dd class="text-sm  text-teal-400">
            {{ statsStore.calculateCPM }}
          </dd>
        </div>
        <div class="px-4 py-4 flex justify-between items-center">
          <dt class="text-sm font-medium ">Accuracy</dt>
          <dd class="text-sm text-teal-400">
            {{ statsStore.calculateAccuracy }} %
          </dd>
        </div>
        <div class="px-4 py-4 flex justify-between items-center">
          <dt class="text-sm font-medium ">Mistaks</dt>
          <dd class="text-sm text-red-300 ">
            {{ statsStore.mistaks }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
