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


// settinggs to use with local storage
let settings = {
  darkMode: false,
  open: null,
  comment: "",
};
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
    let stringifiedPictures = JSON.stringify(allDucks);
    localStorage.setItem('myPictures', stringifiedPictures);
  } else {
    imageHolder.removeEventListener('click', handleDuckClick);
    //myButton.addEventListener('click', renderResults)
    renderChart();

  }
}
let storedPictures = localStorage.getItem('myPictures');
let parsedData = JSON.parse(storedPictures);

if (storedPictures) {
  allDucks = parsedData;
} else {
  let bag = new Duck('bag');
  let banana = new Duck('banana');
  let bathroom = new Duck('bathroom');
  let boots = new Duck('boots');
  let breakfast = new Duck('breakfast');
  let bubblegum = new Duck('bubblegum');
  let chair = new Duck('chair');
  let cthulhu = new Duck('cthulhu');
  let dogDuck = new Duck('dog-duck');
  let dragon = new Duck('dragon');
  let pen = new Duck('pen');
  let petSweep = Duck('pet-sweep');
  let scissors = new Duck('scissors');
  let shark = new Duck('shark');
  let sweep = new Duck('sweep', 'png');
  let tauntaun = new Duck('tauntaun');
  let unicorn = new Duck('unicorn');
  let waterCan = new Duck('water-can');
  let wineGlass = new Duck('wine-glass');

  allDucks.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);
}



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

let mode = document.getElementsByClassName("mode");
let details = document.getElementsByTagName("details");
let commentBox = document.getElementById("commentBox");
let openDetail = null;



function enterDarkMode() {
  let body = document.body;
  let welcome = document.getElementById("welcome");
  let button = document.getElementById("darkButton");
  body.classList.remove("light");
  welcome.classList.remove("light");
  body.classList.add("dark");
  welcome.classList.add("dark");
  button.setAttribute("checked", "checked");



  // the datta we want to save round to round
  settings.darkMode = true;


  // update value in LocalStorage
  saveSettings()
}

function enterLightMode() {
  let body = document.body;
  let welcome = document.getElementById("welcome");
  let button = document.getElementById("lightButton");
  body.classList.remove("dark");
  welcome.classList.remove("dark");
  body.classList.add("light");
  welcome.classList.add("light");
  button.setAttribute("checked", "checked");

  // data to save in local storage:
  settings.darkMode = false;

  // update value in localStorage:
  saveSettings();
}
// put something into localStorage
function saveSettings() {
  console.log(settings);

  // pack it: turn the data into a string
  let stringfly = JSON.stringify(settings);

  // label it (aka key). our is "settings"
// store it
localStorage.setItem('settings', stringfly);
}


function applySettings() {
   // we got it using the key we picked (in this case 'settings');
   let getSettings = localStorage.getItem('settings');

// unpack the data (change it back into javascript, not a string)
let parserdData = JSON.parse(getSettings);
//update the value of the global variable setting
// with these new values
settings = parserdData;
}
// get data from local storage

function pageLoad() {
  // we got it using the key we picked (in this case 'settings');
  let getSettings = localStorage.getItem('settings');

  if (getSettings) {
   applySettings();
if (settings.darkMode) {
  enterDarkMode();
} else {
  enterLightMode();
}
commentBox.value = settings.comment
  } else {
    // if there is no data in localStorage, exit the function.
  return;
  }

}

// ADD EVENT LISTENER TO DARK MODE FORM
for (let i = 0; i < mode.length; i++) {
  mode[i].addEventListener("click", function (){
    // change styling of background and text color
    if (this.value === "dark") {
      enterDarkMode();
    }
    if(this.value === "light") {
      enterLightMode();
    }
  });
}
// add event listner to all details
for (let i = 0; i < details.length; i++)
{
  details[i].addEventListener("click", function (){
// store the open detail in localStorage
if (settings === 1) {
  
  // guard clause so that details that get closed stay closed

  settings.open = null;
  // update what is in localStorage.
  saveSettings();
  return;
}
openDetail = i;
settings.open = i;
saveSettings();
// remove the 'open' attribute from other details
// remove the 'open' attribute from other details
for (let j = 0; j < details.length; j++) {
  if (j !== openDetail) {
    details[j].removeAttribute("open");
  }
}
  });
}
commentBox.addEventListener('input', function () {
  settings.comment = commentBox.value;
  saveSettings();
});
// load the page with the saved settings 
pageLoad();