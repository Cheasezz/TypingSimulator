export async function getWordsList(wordsNumber){
	const res = await fetch('https://baconipsum.com/api/?type=all-meat&sentences=30');
	const data = await res.json();
	// Ответ - это массив, у которого под индексом [0] случайная строка
	// Преобразуем плученный данные. Разделяем по пробельным значениям
	// wordsNumber - лимит слов
	return data[0].split(' ', wordsNumber).map((word,index) => {
		// В полученном новом массиве проходимся по каждому слову и убираем ненужные символы.
		word = word.replace(/[\s.,%]/gi, '');
		// К каждому слову, кроме последнего, добавляем пробел в конце.
		if(index!==wordsNumber-1)word = word + ' '
		// И теперь каждое слово разбиваем на буквы и записываем в массив
		// На выходе получится двумерный массив [[s,k,y, ],[i,c,e]]
		return [...word];
	});
}