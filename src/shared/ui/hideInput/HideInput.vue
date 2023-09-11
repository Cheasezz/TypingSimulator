<script setup>
// eslint-disable-next-line vue/require-prop-types
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    ref="input"
    type="text"
    class="absolute w-0 h-0"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
