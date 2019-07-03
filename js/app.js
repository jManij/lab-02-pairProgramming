'use strict';

// List of all animal objects
const allAnimals = [];

const Animal = function (title, url, description, keyword, horns) {
  this.title = title;
  this.url = url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
};

Animal.prototype.renderwithJQuery = function () {
  const animalTemplatehtml = $('#photo-template').html();
  const $newAnimal = $('<section></section>');
  $newAnimal.html(animalTemplatehtml);

  $newAnimal.find('h2').text(this.title);
  $newAnimal.find('img').attr('src', this.url);
  $newAnimal.find('p').text(this.description);


  $('main').append($newAnimal);

}

Animal.getAllAnimalsFromFile = () => {
  const filePath = './data/page-1.json';
  const fileType = 'json';
  $.get(filePath, fileType).then(myAnimalJSON => {
    myAnimalJSON.forEach(animal => {
<<<<<<< HEAD
      new Animal(animal.title, animal.url, animal.description, animal.keyword, animal.horns);
    });
  });
};

Animal.getAllAnimalsFromFile();
// console.log('Animal.getAllAnimalsFromFile();: ', Animal.getAllAnimalsFromFile());
=======
      // new Animal(animal.title, animal.url, animal.description, animal.keyword, animal.horns);
      allAnimals.push(new Animal(animal.title, animal.image_url, animal.description, animal.keyword, animal.horns));
    });

    allAnimals.forEach(animal => {
      animal.renderwithJQuery();

    });

  });
};



Animal.getAllAnimalsFromFile();
// console.log(Animal);
console.log(allAnimals);
>>>>>>> 6cde711efd19f90fb058751b1a4a6f38f89bd1e3
