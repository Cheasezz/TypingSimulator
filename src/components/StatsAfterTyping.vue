<script>
export default {
  props: {
    objectForStats: {
      type: Object,
    },
  },
  computed: {
    deltaTime() {
      return this.objectForStats.endTime.getTime() - this.objectForStats.startTime.getTime();
    },
    deltaTimeInSec() {
      return this.deltaTime / 1000;
    },
    deltaTimeInMin() {
      return this.deltaTimeInSec / 60;
    },
    calculateCPM() {
      return (this.objectForStats.charNumber / this.deltaTimeInMin).toFixed();
    },
    formatedSec() {
      return (this.deltaTimeInSec % 60).toFixed();
    },
    formatedMin() {
      return this.deltaTimeInMin.toFixed();
    },
    mistaksInProcent() {
      return (this.objectForStats.mistaks / this.objectForStats.charNumber) * 100;
    },
    calculateAccuracy() {
      return (100 - this.mistaksInProcent).toFixed(2);
    },
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
            {{ formatedMin }} min {{ formatedSec }} sec
          </dd>
        </div>
        <div class="px-4 py-4 flex justify-between items-center">
          <dt class="text-sm font-medium ">CPM</dt>
          <dd class="text-sm  text-teal-400">
            {{ calculateCPM }}
          </dd>
        </div>
        <div class="px-4 py-4 flex justify-between items-center">
          <dt class="text-sm font-medium ">Accuracy</dt>
          <dd class="text-sm text-teal-400">
            {{ calculateAccuracy }} %
          </dd>
        </div>
        <div class="px-4 py-4 flex justify-between items-center">
          <dt class="text-sm font-medium ">Mistaks</dt>
          <dd class="text-sm text-red-300 ">
            {{ objectForStats.mistaks }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
