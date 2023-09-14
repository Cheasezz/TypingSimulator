<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="absolute z-10 w-full h-full backdrop-blur-sm text-center">
    <span class="text-2xl select-none">{{ text }}</span>
  </div>
</template>
