'use strict';

var products = [];
var clickTotal = 0;
var imgFiles = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imgNames = [];
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var butt = document.getElementById('butt');
var elImg;
var buttText;
var buttEl;
var randomNum;
var dontUse;
var appearances = [];
var clickS = [];
var tempAppearances;
var tempClickS;

function getNames() {
  for (var i = 0; i < imgFiles.length; i++) {
    var tempString = imgFiles[i];
    imgNames[i] = tempString.slice(0, (tempString.length - 4)); //cut off the .ext from each file to get the name
  }
}

function MakeProducts (name, path) {
  this.name = name;
  this.path = 'img/' + path;
  this.clicks = 0;
  this.numAppearances = 0;
  this.appearLast = 0;
  this.spot = '';
}

function create() { //calls the constructor to make all of the image objects
  for (var i = 0; i < imgFiles.length; i++) {
    products.push(new MakeProducts(imgNames[i], imgFiles[i]));
  }
}

function displayPic(position, whichSpot, index) { //renders a pic on the screen
  products[index].appearLast = clickTotal + 1; //appearsLast is used to check if a pic has been used;
  products[index].spot = whichSpot; //left, right, or center, to compare with what was clicked later;
  products[index].numAppearances += 1; //keeps track of how many times image has appeared
  elImg = document.createElement('img'); //create an img element
  elImg.src = products[index].path; //links image source to img element we created
  position.appendChild(elImg); //attaches img element to the proper li location tagged in the html, left, right, or center
}

function randomNumber() {
  return Math.floor(Math.random() * imgFiles.length); //returns a random number 0-19
}

function whichNotToUse () {//recoginzes the three images last used and puts them in an array
  dontUse = [];
  if (clickTotal !== 0) {
    for (var i = 0; i < imgFiles.length; i++) {
      if (products[i].appearLast === clickTotal) {
        products[i].spot = ''; //this product was in the last turn, so we have to turn its spot back to empty;
        dontUse.push(i);
      }
    }
  }
  else {
    dontUse = [randomNumber(), randomNumber(), randomNumber()]; //in the first round, no images have been used, so assigns three random ones as used
  }
}

function compare() {
  do {
    randomNum = randomNumber();
  } while (dontUse.indexOf(randomNum) !== -1); //searches through dontUse array to check if this randomNumber can be used
  dontUse.push(randomNum); //randomNum has passed validation (was not used in last turn, has not been picked this turn, so now it can be added to the don't use array)
}

function alwaysThreePics () {
  whichNotToUse();
  compare();
  displayPic(left, 'left', randomNum);
  compare();
  displayPic(center, 'center', randomNum);
  compare();
  displayPic(right, 'right', randomNum);
}

function findImage(whichImg) { //finds the image which was clicked by going through the array of objects and looking for spot, which should match whichImg
  for (var i = 0; i < products.length; i++) {
    if (whichImg === products[i].spot) {
      return i;
    }
  }
}

function objectToArrays() {//extracts data from objects and puts it into individual arrays until i can figure out the syntax of .forEach
  for (var i = 0; i < products.length; i++) {
    appearances.push(products[i].numAppearances);
    clickS.push(products[i].clicks);
  }
  console.log('appearances after round: ' + appearances);
  console.log('appearances after round: ' + clickS);
  if (localStorage.totalAppearances) { //I decided only to save the data after every "round" aka 25 clicks
    tempAppearances = JSON.parse(localStorage.getItem('totalAppearances'));
    tempClickS = JSON.parse(localStorage.getItem('totalClickS'));
    for (i = 0; i < imgNames.length; i++) {
      appearances[i] = appearances[i] + tempAppearances[i];
      clickS[i] = clickS[i] + tempClickS[i];
    }
    console.log('appearances after array sum: ' + appearances);
    console.log('clicks after array sum: ' + clickS);
  }
  console.log('stringified apps: ' + JSON.stringify(appearances));
  console.log('stringified clicks: ' + JSON.stringify(clickS));
  localStorage.setItem('totalAppearances', JSON.stringify(appearances));
  localStorage.setItem('totalClickS', JSON.stringify(clickS));
}

function insertButt() {
  buttEl = document.createElement('button');
  buttText = document.createTextNode('RESULTS');
  buttEl.appendChild(buttText);
  butt.appendChild(buttEl);
}

function clickHandler (e) {
  e.preventDefault();
  if (clickTotal < 25) {
    clickTotal += 1;
    products[findImage(e.currentTarget.id)].clicks += 1; //currentTarget.id should return left, right, or center, the id of the EVENT LISTENER
    left.innerHTML = '';
    center.innerHTML = '';
    right.innerHTML = '';
    if (clickTotal !== 25) {
      alwaysThreePics();
    }
    else {
      alert('Congratulations, you have finished the study! Please click the results button to view a summary of your choices.');
      objectToArrays();
      insertButt();
    }
  }
  else {
    alert('You may no longer vote. Please click the results button to view a summary of your choices!');
  }
}

function buttHandler (e) {
  e.preventDefault();
  butt.innerHTML = '';
  document.location.href = 'results.html';
}

getNames();
create();
alwaysThreePics();

left.addEventListener('click', clickHandler);
center.addEventListener('click', clickHandler);
right.addEventListener('click', clickHandler);
butt.addEventListener('click', buttHandler);
