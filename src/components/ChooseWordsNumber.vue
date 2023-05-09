<script>
export default {
  emits: {
    'selected-words-number': (number) => typeof number === 'number',
  },
  data() {
    return {
      selectedWordsNumber: 25,
      arrayWithWordsNumbers: [10, 25, 50, 100],
    };
  },
  methods: {
    selectWordsNumber(number) {
      this.selectedWordsNumber = number;
      this.$emit('selected-words-number', this.selectedWordsNumber);
    },
  },
};
</script>
<template>
  <div class="flex flex-col items-center gap-6 text-2xl">
    <h1 class="text-lg">Choose words number</h1>
    <div class="flex gap-5">
      <button
        v-for="(number, index) of arrayWithWordsNumbers"
        :key="index"
        @click="selectWordsNumber(number)"
        :class="{
          'text-teal-400': number === selectedWordsNumber,
        }"
        type="button"
      >
        {{ number }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
