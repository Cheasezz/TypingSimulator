<script>
import { mapStores } from 'pinia'
import useTextStore from '../stores/TextStore'
import useStatsStore from '../stores/StatsStore'
import TextForTyping from './TextForTyping.vue'
import RefreshButton from './RefreshButton.vue'
import ModalWindow from './ModalWindow.vue'
import IconSpinner from './icons/IconSpinner.vue'

export default {
  components: {
    RefreshButton,
    IconSpinner,
    ModalWindow,
    TextForTyping,
  },
  data() {
    return {
      focused: true,
    }
  },
  computed: {
    ...mapStores(useTextStore, useStatsStore),
  },
  async mounted() {
    // Вотчер для стора
    this.textStore.$subscribe((mutation) => {
      const changeWordNumber = mutation.payload
        ? Object.hasOwnProperty.call(mutation.payload, 'selectedWordsNumber')
        : false
      if (changeWordNumber) {
        this.refreshText()
      }
    })
    await this.textStore.getWords()
    document.addEventListener('keyup', this.inputFocus)
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.inputFocus)
  },
  methods: {
    inputFocus() {
      this.focused = true
      this.$refs.input.focus()
    },
    async refreshText() {
      this.textStore.customReset()
      this.statsStore.$reset()
      await this.textStore.getWords()
      this.inputFocus()
    },
  },
}
</script>
<template>
  <IconSpinner
    v-if="!textStore.isLoaded"
    class="absolute inset-x-1/2 inset-y-1/2 animate-spin"
  />
  <div
    v-if="textStore.isLoaded && !statsStore.typingIsOver"
    class="w-5/6 flex flex-wrap relative"
    @click="inputFocus"
  >
    <input
      ref="input"
      v-model="textStore.typedChars"
      autofocus
      type="text"
      class="absolute w-0 h-0"
      @blur="focused = false"
    />
    <ModalWindow v-if="!focused" />s
    <TextForTyping />
  </div>
  <RefreshButton
    :class="{
      'animate-spin': statsStore.typingIsOver,
    }"
    @click="refreshText"
  />
</template>

<style lang="scss" scoped></style>
