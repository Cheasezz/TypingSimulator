<script setup>
import { onBeforeMount, ref } from 'vue'
import { useTextStore } from '../model/store'
import { storeToRefs } from 'pinia'

const textStore = useTextStore()
const { wordsInSeparateChars, classObj, isLoaded } = storeToRefs(textStore)
const { getWords } = textStore
const fetchErr = ref(null)

onBeforeMount(async () => {
  try {
    await getWords()
  } catch (error) {
    fetchErr.value = error
  }
})
</script>

<template>
  <div class="w-5/6 flex flex-wrap relative">
    <span v-if="fetchErr">{{ fetchErr.message }}</span>
    <slot
      v-if="!isLoaded"
      name="loader"
    />

    <template v-if="isLoaded && !fetchErr">
      <slot name="modal" />
      <slot name="input" />

      <div
        v-for="(word, wordIndex) of wordsInSeparateChars"
        :key="wordIndex"
        class="m-2 text-xl opacity-60"
      >
        <kbd
          v-for="(character, characterIndex) of word"
          :key="characterIndex"
          :class="[classObj ? classObj[`${wordIndex}-${characterIndex}`] : '']"
        >
          {{ character }}
        </kbd>
      </div>
    </template>
  </div>
</template>
