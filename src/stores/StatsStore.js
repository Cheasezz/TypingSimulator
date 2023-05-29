import { defineStore } from 'pinia';
import { useTextStore } from './TextStore';

export const useStatsStore = defineStore('stats', {
  state: () => ({
    typingIsOver: false,
    charsNumbers: 0,
    startTime: 0,
    endTime: 0,
    mistaks: 0,
  }),
  getters: {
    deltaTimeInSec(state) {
      return (state.endTime - state.startTime) / 1000;
    },
    deltaTimeInMin() {
      return this.deltaTimeInSec / 60;
    },
    calculateCPM(state) {
      return (state.charsNumbers / this.deltaTimeInMin).toFixed();
    },
    mistaksInProcent(state) {
      return (state.mistaks / state.charsNumbers) * 100;
    },
    calculateAccuracy() {
      return (100 - this.mistaksInProcent).toFixed(2);
    },
    formatedSec() {
      return (this.deltaTimeInSec % 60).toFixed();
    },
    formatedMin() {
      return this.deltaTimeInMin.toFixed();
    },
  },
  actions: {
    afterStartTyping() {
			const textStore = useTextStore()
      this.startTime = new Date();
      this.charsNumbers = textStore.charsNumbers
    },
    afterTypingIsOver() {
      this.typingIsOver = true;
      this.endTime = new Date();
    },
  },
});
