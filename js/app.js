'use strict';

// List of all animal objects
const allAnimales = [];

const Animal = function(title, url, description, keyword, horns) {
  this.title = title;
  this.url = url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
};

Animal.getAllAnimalsFromFile = () => {
  const filePath = './data';
};
