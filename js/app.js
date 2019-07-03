'use strict';

$('select').on('change', function() {
  if (this.value === 'default') {
    $(`main > section`).show();
    $(`main > section:first-child`).hide();
  } else {
    $(`main > section`).show();

    let $item = this.value;
    // eslint-disable-next-line no-unused-vars
    let $sectionEls = $(`main > section:not([value=${$item}])`).hide();
  }
});

const allAnimals = [];

const Animal = function(title, url, description, keyword, horns) {
  this.title = title;
  this.url = url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
};

Animal.prototype.renderwithJQuery = function() {
  const animalTemplatehtml = $('#photo-template').html();
  const $newAnimal = $('<section></section>');
  $newAnimal.html(animalTemplatehtml);
  $newAnimal.attr('value', this.keyword);

  $newAnimal.find('h2').text(this.title);
  $newAnimal.find('img').attr('src', this.url);
  $newAnimal.find('p').text(this.description);

  $('main').append($newAnimal);
};

Animal.prototype.filterWithJQuery = function() {
  const $selectEl = $('<option></option>');
  $selectEl.attr('value', this.keyword).text(this.keyword);

  $('header>select').append($selectEl);
};

Animal.getAllAnimalsFromFile = () => {
  const filePath = './data/page-1.json';
  const fileType = 'json';
  $.get(filePath, fileType).then(myAnimalJSON => {
    myAnimalJSON.forEach(animal => {
      // new Animal(animal.title, animal.url, animal.description, animal.keyword, animal.horns);
      allAnimals.push(new Animal(animal.title, animal.image_url, animal.description, animal.keyword, animal.horns));
    });

    allAnimals.forEach(animal => {
      animal.renderwithJQuery();
      animal.filterWithJQuery();
    });
  });
};

Animal.getAllAnimalsFromFile();
