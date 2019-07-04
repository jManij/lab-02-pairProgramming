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

Animal.prototype.renderwithHandlebars = function() {
  var source = document.getElementById('photo-template').innerHTML;
  var template = Handlebars.compile(source);

  // pass in object here
  var context = { title: this.title, url: this.url, description: this.description, keyword: this.keyword, horns: this.horns };
  var html = template(context);

  $('main').prepend(html);
};

Animal.prototype.filterWithJQuery = function() {
  const $selectEl = $('<option></option>');
  $selectEl.attr('value', this.keyword).text(this.keyword);

  $('header>select').append($selectEl);
};

Animal.getAllAnimalsFromFile = () => {
  // logic that id's the page we are on
  const filePath = $('body').attr('id') === 'index' ? './data/page-1.json' : '../data/page-2.json';

  const fileType = 'json';
  $.get(filePath, fileType).then(myAnimalJSON => {
    myAnimalJSON.forEach(animal => {
      // new Animal(animal.title, animal.url, animal.description, animal.keyword, animal.horns);
      allAnimals.push(new Animal(animal.title, animal.image_url, animal.description, animal.keyword, animal.horns));
    });

    allAnimals.forEach(animal => {
      animal.renderwithHandlebars();
      animal.filterWithJQuery();
    });
  });
};

Animal.getAllAnimalsFromFile();

// =============================================================
