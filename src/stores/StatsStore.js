import { defineStore } from 'pinia';

export const useStatsStore = defineStore('stats', {
  state: () => ({
    typingIsOver: false,
    charNumber: 0,
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
      return (state.charNumber / this.deltaTimeInMin).toFixed();
    },
		mistaksInProcent(state) {
      return (state.mistaks / state.charNumber) * 100;
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
    AfterTypingIsCompleted() {},
  },
});
