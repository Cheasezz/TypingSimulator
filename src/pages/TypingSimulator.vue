<script>
// import { mapState } from 'pinia'
// import ChooseWordsNumber from '@/components/ChooseWordsNumber.vue'
// import TypingWindow from '@/components/TypingWindow.vue'
// import StatsAfterTyping from '@/components/StatsAfterTyping.vue'
// import useStatsStore from '@/stores/StatsStore'
import { TextForTyping } from '@/widgets/textForTyping'

export default {
  components: {
    // ChooseWordsNumber,
    // TypingWindow,
    // StatsAfterTyping,
    TextForTyping,
  },
  data() {
    return {}
  },
  computed: {
    // ...mapState(useStatsStore, ['typingIsOver']),
  },
}
</script>
<template>
  <main class="h-screen bg-gray-500">
    <div class="container mx-auto h-full flex flex-col justify-evenly items-center">
      <!-- <ChooseWordsNumber /> -->
      <!-- <StatsAfterTyping v-if="typingIsOver" /> -->
      <!-- <TypingWindow /> -->
      <TextForTyping />
    </div>
  </main>
</template>

<style></style>
