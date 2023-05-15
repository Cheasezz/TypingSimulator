<script>
import RefreshButton from '../components/RefreshButton.vue';
import ModalWindow from '../components/ModalWindow.vue';
import IconSpinner from './icons/IconSpinner.vue';
import { useTextStore } from '../stores/TextStore';
import { useStatsStore } from '../stores/StatsStore';
import { mapStores } from 'pinia';
export default {
  components: {
    RefreshButton,
    IconSpinner,
    ModalWindow,
  },
  data() {
    return {
      typedChar: '',
      charIndex: 0,
      loader: true,
      charactersArr: null,
      focused: true,
    };
  },
  computed: {
    ...mapStores(useTextStore, useStatsStore),
  },
  methods: {
    inputFocus() {
      this.statsStore.typingIsOver ? this.$refs.input.blur() : this.$refs.input.focus();
    },
    toggleLoader() {
      this.loader = !this.loader;
    },
    actionsAfterStartTyping() {
      this.charactersArr = this.$refs.kbd;
      this.statsStore.startTime = new Date();
      this.statsStore.charNumber = this.charactersArr.length;
    },
    removeColorFromChar() {
      // Условие выполняется при refreshText
      if (this.charIndex === 0) return;
      this.charIndex--;
      this.charactersArr[this.charIndex]?.classList.remove('text-teal-400', 'text-red-300');
    },
    coloringChar() {
      // Подсветка для правильно и неправильно введеных символов
      if (this.charactersArr[this.charIndex]?.textContent === this.typedChar[this.charIndex]) {
        this.charactersArr[this.charIndex]?.classList.add('text-teal-400');
      } else {
        this.statsStore.mistaks++;
        this.charactersArr[this.charIndex]?.classList.add('text-red-300');
      }
      this.charIndex++;
    },
    setCaretAroundCurrentChar() {
      this.charactersArr.forEach((kbd) => kbd.classList.remove('classForCaret'));
      this.charactersArr[this.charIndex]?.classList.add('classForCaret');
    },
    typingProcess(newValue, oldValue) {
      oldValue === '' ? this.actionsAfterStartTyping() : null;

      newValue < oldValue ? this.removeColorFromChar() : this.coloringChar();

      // Выполнится при введении последнего символа
      if (this.charactersArr.length - 1 < this.charIndex) {
        this.statsStore.$patch({ typingIsOver: true, endTime: new Date() });
        return;
      }
      this.setCaretAroundCurrentChar();
    },

    refreshText() {
      this.$nextTick(() => this.statsStore.$reset()).then(async () => {
        this.toggleLoader();
        this.charIndex = 0;
        this.typedChar = '';
        await this.textStore.getWords();
        this.toggleLoader();
        this.inputFocus();
      });
    },
  },
  async mounted() {
    // Вотчер для стора
    this.textStore.$subscribe((mutation) => {
      if (mutation.events.key === 'selectedWordsNumber') {
        this.refreshText();
      }
    });
    await this.textStore.getWords();
    this.toggleLoader();
    document.addEventListener('keyup', this.inputFocus);
    this.inputFocus();
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.inputFocus);
  },
  watch: {
    typedChar(newValue, oldValue) {
      this.typingProcess(newValue, oldValue);
    },
  },
};
</script>
<template v-if="textStore.wordsList">
  <input
    v-model="typedChar"
    @focus="focused = true"
    @blur="focused = false"
    type="text"
    ref="input"
    class="absolute w-0 h-0"
  />
  <IconSpinner v-if="loader" class="absolute inset-x-1/2 inset-y-1/2 animate-spin" />
  <div
    v-if="!loader && !statsStore.typingIsOver"
    @click="inputFocus"
    class="w-5/6 flex flex-wrap relative"
  >
    <ModalWindow v-if="!focused" />

    <div
      v-for="(word, wordIndex) of textStore.wordsList"
      :key="wordIndex"
      class="m-2 text-xl opacity-60"
    >
      <kbd
        v-for="(character, characterIndex) of word"
        :key="characterIndex"
        ref="kbd"
        :class="{
          classForCaret: characterIndex == 0 && wordIndex == 0,
        }"
      >
        {{ character }}
      </kbd>
    </div>
  </div>
  <RefreshButton
    @click="refreshText"
    :class="{
      'animate-spin': statsStore.typingIsOver,
    }"
  />
</template>

<style lang="scss" scoped></style>
