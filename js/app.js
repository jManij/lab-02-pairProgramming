'use strict';

// List of all animal objects
const allAnimals = [];

const Animal = function(title, url, description, keyword, horns) {
  this.title = title;
  this.url = url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
};

Animal.getAllAnimalsFromFile = () => {
  const filePath = './data/page-1.json';
  const fileType = 'json';
  $.get(filePath, fileType).then(myAnimalJSON => {
    myAnimalJSON.forEach(animal => {
      new Animal(animal.title, animal.url, animal.description, animal.keyword, animal.horns);
    });
  });
};

Animal.getAllAnimalsFromFile();
// console.log('Animal.getAllAnimalsFromFile();: ', Animal.getAllAnimalsFromFile());
