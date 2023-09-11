// убираем ненужные символы.
// На выходе получится двумерный массив [[s,k,y, ],[i,c,e]]
export function mapText(text, wordsCount) {
  const mapedText = text.split(' ', wordsCount).map((word, index) => {
    let clearWord = word.replace(/[\s.,%]/gi, '')
    if (index !== wordsCount - 1) clearWord += ' '
    return [...clearWord]
  })
  return mapedText
}
