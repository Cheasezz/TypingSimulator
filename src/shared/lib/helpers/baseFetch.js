export async function baseFetch(url) {
  const res = await fetch(url)

  if (!res.ok) throw Error('Network response was not OK')
  const data = await res.json()

  return data
}
