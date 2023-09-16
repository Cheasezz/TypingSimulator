<script setup>
import { IconRefresh } from '@/shared/ui/icons'
import { BaseButton } from '@/shared/ui/baseButton'
import { useTextStore } from '@/entities/text'
import { useStatsStore } from '@/entities/stats'

const textStore = useTextStore()
const statsStore = useStatsStore()
const { getWords } = textStore

async function refreshText() {
  statsStore.mistaks = 0
  await getWords()
}
</script>

<template>
  <BaseButton
    type="button"
    @click="refreshText"
  >
    <IconRefresh class="fill-teal-400" />
  </BaseButton>
</template>
