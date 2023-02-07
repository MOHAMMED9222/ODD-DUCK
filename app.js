'use strict'

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');


function Duck (name) {
  this.name = name;
  this.src = `images/${name}}.${fileExtension}`;
  this.views = 0
}

let bag = new Duck('bag-duck')
let banana = new Duck('banana-boat')
let bathroom = new Duck('bathroom-duck')

let allDucks = [bag, banana, bathroom]