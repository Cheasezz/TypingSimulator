import { defineStore } from 'pinia';

const endpointForGetText = 'https://baconipsum.com/api/?type=all-meat&sentences=30';

export const useTextStore = defineStore('text', {
  state: () => ({
    wordsList: null,
    selectedWordsNumber: 25,
    arrayWithWordsNumbers: [10, 25, 50, 100],
  }),
  getters: {},
  actions: {
    async getWords() {
      const res = await fetch(endpointForGetText);
      const data = await res.json();
      // Ответ - это массив, у которого под индексом [0] случайная строка
      // Преобразуем плученный данные. Разделяем по пробельным значениям
      // selectedWordsNumber - лимит слов
      this.wordsList = data[0].split(' ', this.selectedWordsNumber).map((word, index) => {
        // В полученном новом массиве проходимся по каждому слову и убираем ненужные символы.
        word = word.replace(/[\s.,%]/gi, '');
        // К каждому слову, кроме последнего, добавляем пробел в конце.
        if (index !== this.selectedWordsNumber - 1) word = word + ' ';
        // И теперь каждое слово разбиваем на буквы и записываем в массив
        // На выходе получится двумерный массив [[s,k,y, ],[i,c,e]]
        return [...word];
      });
    },
  },
});

