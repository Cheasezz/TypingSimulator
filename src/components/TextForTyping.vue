<script>
import { mapStores } from 'pinia'
import { watch } from 'vue'
import useTextStore from '../stores/TextStore'
import useStatsStore from '../stores/StatsStore'

export default {
  data() {
    return {
      colorObj: {},
    }
  },
  computed: {
    ...mapStores(useTextStore, useStatsStore),
    caretClass() {
      return (wordIndex, characterIndex) => {
        const idxOfChar = this.getCharacterIndex(wordIndex, characterIndex)
        return idxOfChar === this.textStore.idxOfTypedChar ? 'classForCaret' : ''
      }
    },
  },
  mounted() {
    watch(
      () => this.textStore.typedChars,
      (newVal, oldVal) => {
        this.updateColorObj(newVal, oldVal)
        this.textStore.typingProcess(newVal, oldVal)
      },
    )
    this.createColorObj()
  },
  methods: {
    getCharacterIndex(wordIndex, characterIndex) {
      const key = `${wordIndex}-${characterIndex}`
      return this.textStore.indexMap[key]
    },
    createColorObj() {
      let i = 0
      while (i < this.textStore.charsNumbers) {
        this.colorObj[i] = {
          'text-teal-400': false,
          'text-red-300': false,
        }
        i += 1
      }
    },
    updateColorObj(newVal, oldVal) {
      const charIsDeleted = newVal < oldVal
      const index = this.textStore.idxOfTypedChar
      const green = 'text-teal-400'
      const red = 'text-red-300'
      if (charIsDeleted) {
        this.removeColor(index, green, red)
      } else {
        this.addColor(index, green, red)
      }
    },
    removeColor(index, green, red) {
      this.colorObj[index - 1][green] = false
      this.colorObj[index - 1][red] = false
    },
    addColor(index, green, red) {
      const correctChar = this.textStore.isCorrect
      if (!correctChar) {
        this.colorObj[index][red] = true
      } else {
        this.colorObj[index][green] = true
      }
    },
  },
}
</script>

<template>
  <div
    v-for="(word, wordIndex) of textStore.wordsList"
    :key="wordIndex"
    class="m-2 text-xl opacity-60"
  >
    <kbd
      v-for="(character, characterIndex) of word"
      :key="characterIndex"
      ref="kbd"
      :class="[
        caretClass(wordIndex, characterIndex),
        colorObj[getCharacterIndex(wordIndex, characterIndex)],
      ]"
    >
      {{ character }}
    </kbd>
  </div>
</template>

<style lang="scss" scoped></style>
