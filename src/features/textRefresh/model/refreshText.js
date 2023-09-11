import { useTextStore } from '@/entities/text'

export async function refreshText() {
  const textStore = useTextStore()
  const { getWords } = textStore
  await getWords()
}
