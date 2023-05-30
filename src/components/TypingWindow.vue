<script>
import { useTextStore } from '../stores/TextStore';
import { useStatsStore } from '../stores/StatsStore';
import { mapStores } from 'pinia';
import TextForTyping from './TextForTyping.vue';
import RefreshButton from '../components/RefreshButton.vue';
import ModalWindow from '../components/ModalWindow.vue';
import IconSpinner from './icons/IconSpinner.vue';
export default {
  components: {
    RefreshButton,
    IconSpinner,
    ModalWindow,
    TextForTyping
},
  data() {
    return {
      focused: true,
    };
  },
  computed: {
    ...mapStores(useTextStore, useStatsStore),
  },
  methods: {
    inputFocus() {
      this.focused = true;
      this.$refs.input.focus();
    },
    async refreshText() {
      this.textStore.customReset();
      this.statsStore.$reset();
      await this.textStore.getWords();
      this.inputFocus();
    },
  },
  async mounted() {
    // Вотчер для стора
    this.textStore.$subscribe((mutation) => {
      if (mutation.payload?.hasOwnProperty('selectedWordsNumber')) {
        this.refreshText();
      }
    });
    await this.textStore.getWords();
    document.addEventListener('keyup', this.inputFocus);
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.inputFocus);
  },
};
</script>
<template>
  <IconSpinner v-if="!textStore.isLoaded" class="absolute inset-x-1/2 inset-y-1/2 animate-spin" />
  <div
    v-if="textStore.isLoaded && !statsStore.typingIsOver"
    @click="inputFocus"
    class="w-5/6 flex flex-wrap relative"
  >
    <input
      v-model="textStore.typedChars"
      @blur="focused = false"
      autofocus
      type="text"
      ref="input"
      class="absolute w-0 h-0"
    />
    <ModalWindow v-if="!focused" />
		<TextForTyping/>
  </div>
  <RefreshButton
    @click="refreshText"
    :class="{
      'animate-spin': statsStore.typingIsOver,
    }"
  />
</template>

<style lang="scss" scoped></style>
