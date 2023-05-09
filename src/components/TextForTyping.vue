<script>
import RefreshButton from '../components/RefreshButton.vue';
import IconSpinner from './icons/IconSpinner.vue';
import { getWordsList } from '../components/api';
export default {
  components: {
    RefreshButton,
    IconSpinner,
  },
  props: {
    wordsNumber: {
      type: Number,
    },
  },
  emits: {
    'object-for-stats': (obj) => typeof obj === 'object',
  },
  data() {
    return {
      wordsList: null,
      typedChar: '',
      charIndex: 0,
      loader: true,
      charactersArr: null,
      objectForStats: {
        typingIsOver: false,
        charNumber: 0,
        startTime: 0,
        endTime: 0,
        mistaks: 0,
      },
    };
  },
  methods: {
    async definitionWordsList(wordsNumber) {
      // Загружаем список слов и присвиваем wordsList
      this.wordsList = await getWordsList(wordsNumber);
      // После загрузки списка слов, выключаем спиннер
      this.loader = false;
      this.inputFocus();
    },
    inputFocus() {
      this.objectForStats.typingIsOver ? this.$refs.input.blur() : this.$refs.input.focus();
    },
    refreshObjectForStats() {
			for(let key in this.objectForStats){
				key!=='typingIsOver'?this.objectForStats[key]=0:this.objectForStats[key]=false
			}
    },
    actionsAfterTypingIsCompleted() {
      this.objectForStats.typingIsOver = true;
      this.objectForStats.endTime = new Date();
      this.objectForStats.charNumber = this.charactersArr.length;
      this.$emit('object-for-stats', this.objectForStats);
      this.inputFocus();
    },
    async typingProcess(newValue, oldValue) {
      // const characters = this.$refs.kbd;
      // Этот if сработает после старта печати
      if (oldValue === '') {
        this.objectForStats.startTime = new Date();
        // референс на список дом элиментов kbd (каждый содержит букву/пробел)
        this.charactersArr = this.$refs.kbd;
      }
      // последний введенный символ
      let splitedTypedChar = [...newValue][this.charIndex];

      if (newValue < oldValue) {
        if (this.charIndex === 0) {
          // В эту ветку условий попадаем после refreshText
          await this.definitionWordsList(this.wordsNumber);
          // Убираем подсветку со всех символов
          this.charactersArr.forEach((kbd) =>
            kbd.classList.remove('text-teal-400', 'text-red-300')
          );
        } else {
          // Условие, которое выполняется при удалении символов (курсор перейдет на 1 символ назад и удалится подсветка)
          this.charIndex--;
          this.charactersArr[this.charIndex].classList.remove('text-teal-400', 'text-red-300');
        }
      } else {
        // else выполняется каждый раз когда увеличивается инпут (набирается текст)
        // Подсветка для правильно и неправильно введеных символов
        if (this.charactersArr[this.charIndex].textContent === splitedTypedChar) {
          this.charactersArr[this.charIndex].classList.add('text-teal-400');
        } else {
          // Увеличиваем количество ошибок на один
          this.objectForStats.mistaks++;
          this.charactersArr[this.charIndex].classList.add('text-red-300');
        }

        this.charIndex++;
      }
      // Выполнится при введении последнего символа
      if (this.charactersArr.length - 1 < this.charIndex) {
        this.actionsAfterTypingIsCompleted();
        return;
      }
      // После всех условий, в любом случае, убирается курсор у всех символо, и сразуе ставится только у нынешнего
      this.charactersArr.forEach((kbd) => kbd.classList.remove('classForCaret'));
      this.charactersArr[this.charIndex].classList.add('classForCaret');
    },
    // Параметры нужны для вотчера wordsNumber. Выглядит не очень, да и похоже на костыль,
    // но по другому я пока не могу решить задачу.
    // Стандартные значения нужны потому что без аргументов в функции, newValue и oldValue равны undefined
    refreshText(newValue = 1, oldValue = 0) {
      // Появляется спинер
      this.loader = true;
      // Чистим объект статистики.
      this.refreshObjectForStats();
      this.$emit('object-for-stats', this.objectForStats);
      // Если изменяется количество слов и инпут пустой.()
      if (newValue !== oldValue && this.typedChar === '') {
        this.definitionWordsList(this.wordsNumber);
        return;
      }
      // Изменения typeChar запустит вотчер (а в нем запускается typingProcess).
      // if выше, был написан, потому что, если typedChar изначально == '', то вотчер не запустится
      this.typedChar = '';
      // Изменение charIndex позволит пройтись по специально заготовленному для него условию в typingProcess
      this.charIndex = 0;
    },
  },
  // После создания и вставки дом узлов
  mounted() {
    // Получаем список слов
    this.definitionWordsList(this.wordsNumber);
    // Слушаем клавиши для фокусировки на инпут
    document.addEventListener('keyup', this.inputFocus);
    // Первичная фокусировка
    this.inputFocus();
  },
  // Отписываемся от событий перед удалением компонента
  beforeUnmount() {
    document.removeEventListener('keyup', this.inputFocus);
  },
  watch: {
    // Вотчер запускается при изменение количества слов
    wordsNumber(newValue, oldValue) {
      this.refreshText(newValue, oldValue);
    },
    // Запускается при изменении инпута
    typedChar(newValue, oldValue) {
      // nextTick отрисовывает изменения сразу, после изменеия.
      // Без него символы подсвечивались по два-три(копились изменения перед рендером)
      this.$nextTick().then(this.typingProcess(newValue, oldValue));
    },
  },
};
</script>
<template v-if="wordsList">
  <input v-model="typedChar" type="text" ref="input" class="absolute w-0 h-0" />
  <IconSpinner v-if="loader" class="absolute inset-x-1/2 inset-y-1/2 animate-spin" />
  <div
    v-if="!loader && !objectForStats.typingIsOver"
    @click="inputFocus"
    class="w-5/6 flex flex-wrap"
  >
    <div v-for="(word, wordIndex) of wordsList" :key="wordIndex" class="m-2 text-xl opacity-60">
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
    @click="refreshText()"
    :class="{
      'animate-spin': objectForStats.typingIsOver,
    }"
  />
</template>

<style lang="scss" scoped></style>
