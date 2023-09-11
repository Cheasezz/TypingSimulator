<script setup>
import { BaseButton, IconRefresh } from '@/shared/ui'
import { refreshText } from './model/refreshText'
</script>

<template>
  <BaseButton
    type="button"
    @click="refreshText"
  >
    <IconRefresh class="fill-teal-400" />
  </BaseButton>
</template>
