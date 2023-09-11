import { defineStore } from 'pinia'
import useStatsStore from './StatsStore'

const endpointForGetText = 'https://baconipsum.com/api/?type=all-meat&sentences=30'

const useTextStore = defineStore('text', {
  state: () => ({
    wordsList: null,
    isLoaded: false,
    typedChars: '',
    idxOfTypedChar: 0,
    selectedWordsNumber: 25,
    arrayWithWordsNumbers: [10, 25, 50, 100],
    indexMap: {},
  }),
  getters: {
    charactersArr(state) {
      return state.wordsList.flat(1)
    },
    charsNumbers() {
      return this.charactersArr.length
    },
    charactersArrIsOver(state) {
      return this.charsNumbers - 1 < state.idxOfTypedChar
    },
    lastTypedChar(state) {
      return state.typedChars[state.typedChars.length - 1] || ''
    },
    isCorrect(state) {
      return this.lastTypedChar === this.charactersArr[state.idxOfTypedChar]
    },
  },
  actions: {
    customReset() {
      this.typedChars = ''
      this.idxOfTypedChar = 0
      this.indexMap = {}
    },
    async getWords() {
      this.isLoaded = false
      const res = await fetch(endpointForGetText)
      const data = await res.json()

      this.wordsList = data[0].split(' ', this.selectedWordsNumber).map((word, index) => {
        // убираем ненужные символы.
        let clearWord = word.replace(/[\s.,%]/gi, '')
        if (index !== this.selectedWordsNumber - 1) clearWord += ' '
        // На выходе получится двумерный массив [[s,k,y, ],[i,c,e]]
        return [...clearWord]
      })
      this.getCharsIndexes()

      this.isLoaded = true
    },
    getCharsIndexes() {
      const arr = this.wordsList
      let currentIndex = 0

      for (let wordIxd = 0; wordIxd < arr.length; wordIxd++) {
        const subArr = arr[wordIxd]

        for (let charIxd = 0; charIxd < subArr.length; charIxd++) {
          // На выходе indexMap - {0-1:1,0-2:2,1-0:3}
          // ключ - двумерный индекс, значение - этот же индекс в
          // одномерном представлении
          this.indexMap[`${wordIxd}-${charIxd}`] = currentIndex
          currentIndex += 1
        }
      }
    },
    checkTypedChars(newValue, oldValue, statsStore) {
      if (newValue < oldValue) {
        this.idxOfTypedChar -= 1
      } else {
        if (!this.isCorrect) statsStore.incrementMistakes()
        this.idxOfTypedChar += 1
      }
    },
    typingProcess(newValue, oldValue) {
      const statsStore = useStatsStore()
      if (oldValue === '') statsStore.afterStartTyping(Object.keys(this.indexMap).length)

      this.checkTypedChars(newValue, oldValue, statsStore)

      if (this.charactersArrIsOver) {
        statsStore.afterTypingIsOver()
      }
    },
  },
})

export default useTextStore
