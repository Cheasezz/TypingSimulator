<script>
import ChooseWordsNumber from './components/ChooseWordsNumber.vue'
import TextForTyping from './components/TextForTyping.vue';
import StatsAfterTyping from './components/StatsAfterTyping.vue';
export default {
	components:{
		ChooseWordsNumber,
		TextForTyping,
		StatsAfterTyping
	},
	data(){
		return{
			wordsNumber:25,
			objectForStats:null,
		}
	},
	methods:{
		setWordsNumber(val){
			this.wordsNumber = val
		},
		setObjectForStats(val){
			this.objectForStats=val
		}
	}
};
</script>
<template>
  <main class="h-screen bg-gray-500">
    <div class="container mx-auto h-full flex flex-col justify-evenly items-center">
      <ChooseWordsNumber @selected-words-number="setWordsNumber"/>
			<StatsAfterTyping v-if="objectForStats?.typingIsOver" :objectForStats="objectForStats"/>
      <TextForTyping :wordsNumber="wordsNumber" @object-for-stats="setObjectForStats"/>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
