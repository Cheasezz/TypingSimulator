import { baseFetch } from '@/shared/lib/helpers'

const TEXT_URL = 'https://baconipsum.com/api/?type=all-meat&sentences=30'

export async function getText() {
  const text = await baseFetch(TEXT_URL)
  return text
}
