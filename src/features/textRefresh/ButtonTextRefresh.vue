<script setup>
import { IconRefresh } from '@/shared/ui/icons'
import { BaseButton } from '@/shared/ui/baseButton'
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
