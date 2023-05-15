<script>
import ChooseWordsNumber from './components/ChooseWordsNumber.vue'
import TextForTyping from './components/TextForTyping.vue';
import StatsAfterTyping from './components/StatsAfterTyping.vue';
import { useStatsStore } from './stores/StatsStore';
import { mapState} from 'pinia';
export default {
	components:{
		ChooseWordsNumber,
		TextForTyping,
		StatsAfterTyping
	},
	data(){
		return{
		}
	},
	computed:{
		...mapState(useStatsStore,['typingIsOver'])
	},
};
</script>
<template>
  <main class="h-screen bg-gray-500">
    <div class="container mx-auto h-full flex flex-col justify-evenly items-center">
      <ChooseWordsNumber />
			<StatsAfterTyping v-if="typingIsOver"/>
      <TextForTyping  />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
