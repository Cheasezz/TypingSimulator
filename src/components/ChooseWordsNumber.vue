<script>
import { mapStores } from 'pinia'
import { useTextStore } from '../stores/TextStore';

export default {

  data() {
    return {
    };
  },
	computed:{
		...mapStores(useTextStore)
	},
  methods: {
    selectWordsNumber(number) {
      this.textStore.selectedWordsNumber=number;
    },
  },
};
</script>
<template>
  <div class="flex flex-col items-center gap-6 text-2xl">
    <h1 class="text-lg">Choose words number</h1>
    <div class="flex gap-5">
      <button
        v-for="(number, index) of textStore.arrayWithWordsNumbers"
        :key="index"
        @click="selectWordsNumber(number)"
        :class="{
          'text-teal-400': number === textStore.selectedWordsNumber,
        }"
        type="button"
      >
        {{ number }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
