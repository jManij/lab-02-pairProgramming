'use strict';

// shows and hides elements based on name selection
$('header > select#select-template').on('change', function() {
  // hides default value
  $(`main > section`).show();
  if (this.value === 'default') {
    $(`main > section`).show();
    $(`main > section:first-child`).hide();
  } else {
    // shows selected images
    $(`main > select`).show();

    let $item = this.value;
    console.log('$item: ', $item);

    $(`main > section:not([value=${$item}])`).hide();
  }
});

// shows and hides elements based on number of horns selection
$('header > select#select-options').on('change', function() {
  $(`main > section`).show();
  // hides default value
  if (this.value === 'default2') {
    $(`main > section`).show();
    $(`main > section:first-child`).hide();
  } else {
    // shows selected images
    $(`main > select`).show();

    let $options = this.value;
    console.log('$options: ', $options);

    // eslint-disable-next-line no-unused-vars
    $(`main > section:not([id=${$options}])`).hide();
  }
});

let filePath = './data/page-1.json';

// page change
$('a').on('click', function(event) {
  event.preventDefault();

  // clears out options list when switching pages
  $('header > select#select-template').empty();
  $('header > select#select-options').empty();

  // keeps default behavior of option list
  const setTypeLabel = () => {
    const $typeLabel = $('<option></option');
    $typeLabel.attr('value', 'default').text('Filter by Keyword');
    $('header > select#select-template').append($typeLabel);
  };

  // keeps default behavior of option list
  const setOptionsLabel = () => {
    const $optionsLabel = $('<option></option');
    $optionsLabel.attr('value', 'default2').text('Filter by Horns');
    $('header > select#select-options').append($optionsLabel);
  };

  // Make changes when switching pages
  if (filePath === './data/page-1.json') {
    $('a').text('Page 2');
    $('main').empty();
    allAnimals = [];
    filePath = './data/page-2.json';

    setTypeLabel();
    setOptionsLabel();

    Animal.getAllAnimalsFromFile();
  } else {
    filePath = './data/page-1.json';
    $('a').text('Home');
    $('main').empty();
    allAnimals = [];
    setTypeLabel();
    setOptionsLabel();
    Animal.getAllAnimalsFromFile();
  }
});

let allAnimals = [];

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

// creates option list
Animal.prototype.filterWithJQuery = function() {
  // option list for creature keywor
  const $selectType = $('<option></option>');
  $selectType.attr('value', this.keyword).text(this.keyword);

  $('header > select#select-template').append($selectType);

  // option list for number of horns
  const $selectHorns = $('<option></option>');
  $selectHorns.attr('value', this.horns).text(this.horns);

  $('header > select#select-options').append($selectHorns);
};

Animal.getAllAnimalsFromFile = () => {
  // logic that id's the page we are on

  const fileType = 'json';
  $.get(filePath, fileType).then(myAnimalJSON => {
    myAnimalJSON.forEach(animal => {
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
