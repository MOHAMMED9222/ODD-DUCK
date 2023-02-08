'use strict'
// 3 GLOBALS, DOM
let myContainer = document.querySelector('section')
let myButton = document.querySelector('button')

let image1 = document.getElementById('img1');
let image2 = document.getElementById('img2');
let image3 = document.getElementById('img3');

let results = document.getElementById('resultsContainer')

let numberOfMatchUps = 0;
let numberOfMatchupsAllowed = 25;
let allDucks = [];


// 1
function Duck (name, fileExtension = 'jpeg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.views = 0;
  this.likes = 0;
}
// 2
let bag = new Duck('bag')
let banana = new Duck('banana')
let bathroom = new Duck('bathroom')
let boots = new Duck('boots')
let breakfast = new Duck('breakfast')
let bubblegum = new Duck('bubblegum')
let chair = new Duck('chair')
let cthulhu = new Duck('cthulhu')
let dogduck = new Duck('dog-duck')
let dragon = new Duck('dragon')
let pen = new Duck('pen')
let scissors = new Duck('scissors')
let shark = new Duck('shark')
let sweep = new Duck('sweep','png')
let tautaun = new Duck('tauntaun')
let unicorn = new Duck('unicorn')
let waterCan = new Duck('water-can')
let wineGlass = new Duck('wine-glass')

allDucks = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, scissors, shark, sweep, tautaun, unicorn, waterCan, wineGlass]

// - function to get 2 random goats
//     - Math.random()
//     - check to confirm not the same goat
//     - to load new images (increment the views)
//     - increment the number of match ups 

function selectrandomDuck() {
  return Math.floor(Math.random() * allDucks.length); 

}

function renderDucks() {
  let duck1 = selectrandomDuck();
  let duck2 = selectrandomDuck();
  let duck3 = selectrandomDuck();

  while (duck1 === duck2) {
    duck2 = selectrandomDuck();
  }
  while (duck1 === duck3 || duck2 === duck3) {
    duck3 = selectrandomDuck();
  }
console.log(duck1, duck2, duck3)
console.log(image1, image2, image3)
   image1.src = allDucks[duck1].src;
   image2.src = allDucks[duck2].src;
    image3.src = allDucks[duck3].src;
    image1.alt = allDucks[duck1].name;
    image2.alt = allDucks[duck2].name;
   image3.alt = allDucks[duck3].name;
}

function renderResults() {
  let results = document.querySelector('ul');
  for (let i = 0; i < allDucks.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allDucks[i].name} had ${allDucks[i].views} views and ${allDucks[i].likes} likes.`;
    results.appendChild(li);
  }
}
renderDucks();


function handleDuckClick(event) {
  let clickedDuck = event.target.alt;
  for (let i = 0; i < allDucks.length; i ++) {
    if (allDucks[i].name === clickedDuck) {
      allDucks[i].likes++;
    }
  }
  // which image got clicked?

  // 
numberOfMatchUps--;
renderDucks();
if (numberOfMatchUps === 0){
  myContainer.removeEventListener('click', handleDuckClick);
}
else{
  //myContainer.removeEventListener('click', handleDuckClick);
  myButton.addEventListener('click', renderResults);
}
}




// event listner

myContainer.addEventListener('click', handleDuckClick)
results.document.getElementById('resultsContainer')