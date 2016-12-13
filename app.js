'use strict';

var products = [];
var clickTotal = 0;
var imgFiles = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imgNames = [];
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var results = document.getElementById('results');
var elImg;
var elLi;
var elTd;
var elTr;
var randomNum;
var dontUse;
var whichImg;
var imgLoc;

function getNames() {
  for (var i = 0; i < imgFiles.length; i++) {
    var tempString = imgFiles[i];
    imgNames[i] = tempString.slice(0, (tempString.length - 4));
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
  elLi = document.createElement('li'); //create an li element
  elImg = document.createElement('img'); //create an img element
  elImg.src = products[index].path; //links image source to img element we created
  elLi.appendChild(elImg); //attaches img element to li element
  position.appendChild(elLi); //attaches li element to the proper li location tagged in the html, left, right, or center
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
    // console.log('dontUse rest: ' + dontUse);
  }
  else {
    dontUse = [randomNumber(), randomNumber(), randomNumber()]; //in the first round, no images have been used, so assigns three random ones as used
    // console.log('dontUse first: ' + dontUse);
  }
}

function compare() {
  do {
    randomNum = randomNumber();
  } while (dontUse.indexOf(randomNum) !== -1); //searches through dontUse array to check if this randomNumber can be used
  // console.log('randomNum from compare: ' + randomNum);
  dontUse.push(randomNum); //randomNum has passed validation (was not used in last turn, has not been picked this turn, so now it can be added to the don't use array)
  // console.log('dontuse after compare' + dontUse);
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

function findImage() { //finds the image which was clicked by going through the array of objects and looking for spot, which should match whichImg
  for (var i = 0; i < products.length; i++) {
    if (whichImg === products[i].spot) {
      return i;
    }
  }
}

function displayData(array) {
  for (var i = 0; i < array.length; i++) {
    elTd= document.createElement('td'); //create a td element
    elTd.textContent = array[i]; //assign td the value at that spot in the array
    elTr.appendChild(elTd); //attach td to tr
    results.appendChild(elTr); //append to results table
  }
}

function displayName(type) {
  elTr = document.createElement('tr');
  elTd= document.createElement('td'); //create a td element
  elTd.textContent = type; //assign td the value at that spot in the array
  elTr.appendChild(elTd); //attach td to tr
  results.appendChild(elTr);
}

function extractAppearances() {
  var appearances = [];
  for (var i = 0; i < products.length; i++) {
    appearances.push(products[i].numAppearances);
  }
  return appearances;
}

function extractClicks () {
  var clickS = [];
  for (var i = 0; i < products.length; i++) {
    clickS.push(products[i].clicks);
  }
  return clickS;
}

function percentChosen () {
  var percent = [];
  for (var i = 0; i < products.length; i++) {
    percent.push(Math.floor((products[i].clicks/products[i].numAppearances) * 100));
  }
  return percent;
}

function addResults() {
  displayName('Image Names');
  displayData(imgNames);
  displayName('# of appearances');
  displayData(extractAppearances());
  displayName('# of clicks');
  displayData(extractClicks());
  displayName('% of time chosen');
  displayData(percentChosen());
}

function clickHandler (e) {
  e.preventDefault();
  if (clickTotal < 25) {
    clickTotal += 1;
    whichImg = e.currentTarget.id; //should return left, right, or center, the id of the EVENT LISTENER
    // console.log('whichImg: ' + whichImg);
    var imgLoc = findImage();
    products[imgLoc].clicks += 1;
    // console.log('imgLoc: ' + imgLoc);
    left.innerHTML = '';
    center.innerHTML = '';
    right.innerHTML = '';
    if (clickTotal !== 25) {
      alwaysThreePics();
    }
    else {
      alert('Congratulations, you have finished the study! Please click the results button to view a summary of your choices.');
      addResults();
    }
  }
  else {
    alert('You may no longer vote. Please click the results button to view a summary of your choices!');
  }
}

getNames();
create();
alwaysThreePics();

left.addEventListener('click', clickHandler);
center.addEventListener('click', clickHandler);
right.addEventListener('click', clickHandler);
