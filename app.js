'use strict'
// 3 GLOBALS, DOM
let imageHolder = document.getElementById('imageHolder')
let myButton = document.getElementById('resultsButton')

let image1 = document.getElementById('img1');
let image2 = document.getElementById('img2');
let image3 = document.getElementById('img3');

let resultsContainer = document.getElementById('resultsContainer')

let numberOfMatchUps = 0;
let numberOfMatchupsAllowed = 25;
let allDucks = [];
let indexArray = [];
//let indexArray = [];


// 1
function Duck(name, fileExtension = 'jpeg') {
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
let sweep = new Duck('sweep', 'png')
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
  // let duck1 = selectrandomDuck();
  // let duck2 = selectrandomDuck();
  // let duck3 = selectrandomDuck();

  while (indexArray.length < 6) {
    let ranNum = selectrandomDuck();
    // console.log(duck1, duck2, duck3);
    if (!indexArray.includes(ranNum)) {
      indexArray.push(ranNum);
    }
  }

  let duck1 = indexArray.shift();
  let duck2 = indexArray.shift();
  let duck3 = indexArray.shift();

  console.log(duck1, duck2, duck3)
  console.log(image1, image2, image3)
  image1.src = allDucks[duck1].src;
  image2.src = allDucks[duck2].src;
  image3.src = allDucks[duck3].src;
  image1.alt = allDucks[duck1].name;
  image2.alt = allDucks[duck2].name;
  image3.alt = allDucks[duck3].name;

  allDucks[duck1].views++;
  allDucks[duck2].views++;
  allDucks[duck3].views++;


}
renderDucks();

function renderResults() {
  console.log('views')
  // if (numberOfMatchUps === 0)


  for (let i = 0; i < allDucks.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allDucks[i].name} had ${allDucks[i].views} views and ${allDucks[i].likes} likes.`;
    resultsContainer.appendChild(li);
  }
  myButton.removeEventListener('click', renderResults)

}
imageHolder.addEventListener('click', handleDuckClick)

function handleDuckClick(event) {
  let clickedDuck = event.target.alt;
  console.log(clickedDuck)
  for (let i = 0; i < allDucks.length; i++) {
    if (allDucks[i].name === clickedDuck) {
      allDucks[i].likes++;
    }
  }
  // which image got clicked?
  numberOfMatchUps++;
  // 
  // numberOfMatchUps--;

  if (numberOfMatchUps < numberOfMatchupsAllowed) {
    renderDucks();
  } else {
    imageHolder.removeEventListener('click', handleDuckClick);
    //myButton.addEventListener('click', renderResults)
    renderChart();

  }}



const ctx = document.getElementById('myChart');

function renderChart () {

  let duckLikes = [];
  let duckNames = [];
  let duckViews = [];

  for (let i = 0; i < allDucks.length; i++) {
    duckLikes.push(allDucks[i].likes);
    duckNames.push(allDucks[i].name);
    duckViews.push(allDucks[i].views);
  }
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: duckNames,
    datasets: [
      {
      label: '# of Votes',
      data: duckLikes,
      borderWidth: 1,
      backgroundColor: ['purple','red',]
    },
    {
      label: '# of Views',
      data: duckLikes,
      borderWidth: 1,
      backgroundColor: ['blue', 'orange'
      ]
    }
  ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
}