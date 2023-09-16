import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStatsStore = defineStore('stats', () => {
  const charsCounter = ref(0)
  const startTime = ref(0)
  const endTime = ref(0)
  const mistaks = ref(0)

  const deltaTimeInSec = computed(() => (endTime.value - startTime.value) / 1000)
  const deltaTimeInMin = computed(() => deltaTimeInSec.value / 60)
  const mistaksInProcent = computed(() => (mistaks.value / charsCounter.value) * 100)
  const formatedSec = computed(() => (deltaTimeInSec.value % 60).toFixed())
  const formatedMin = computed(() => deltaTimeInMin.value.toFixed())
  const fromateAccuracy = computed(() => (100 - mistaksInProcent.value).toFixed(2))
  const cpm = computed(() => (charsCounter.value / deltaTimeInMin.value).toFixed())
  const accuracy = computed(() => `${fromateAccuracy.value} %`)
  const time = computed(() => `${formatedMin.value} min ${formatedSec.value} sec`)

  function incrementMistakes() {
    mistaks.value += 1
  }
  function statInitialValues(chNum) {
    mistaks.value = 0
    startTime.value = new Date()
    charsCounter.value = chNum
  }
  function statFinalValues() {
    endTime.value = new Date()
  }

  return {
    cpm,
    accuracy,
    time,
    mistaks,
    incrementMistakes,
    statInitialValues,
    statFinalValues,
  }
})
