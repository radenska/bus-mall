'use strict';

var products = [];
var clickTotal = 0;
var imgFiles = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imgNames = [];
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var elImg;
var elLi;
var randomNum;
var dontUse;

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
  this.NumAppearances = 0;
  this.appearLast = 42;
  // this.percent = 0;

  // this.calculatePercent = function()
  //   this.percent = Math.floor((this.clickTotal/this.NumAppearances) * 100);
  // };
}

function create() {
  for (var i = 0; i < imgFiles.length; i++) {
    products.push(new MakeProducts(imgNames[i], imgFiles[i]));
  }
}

function displayPic(position, index) {
  products[index].appearLast = clickTotal + 1;
  elLi = document.createElement('li');
  elImg = document.createElement('img');
  elImg.src = products[index].path;
  elLi.appendChild(elImg);
  position.appendChild(elLi);
}

function randomNumber() {
  return Math.floor(Math.random() * imgFiles.length);
}

function whichThreeLastTime () {
  dontUse = [67];
  for (var i = 0; i < imgFiles.length; i++) {
    if (products[i].appearLast === clickTotal) {
      dontUse.push(i);
    }
  }
}

function compare() {
  for (var i = 0; i < dontUse.length; i++) {
    do {
      randomNum = randomNumber();
    } while (randomNum === dontUse[i]);
  }
  dontUse.push(randomNum);
}

function alwaysThreePics () {
  whichThreeLastTime();
  compare();
  displayPic(left, randomNum);
  compare();
  displayPic(center, randomNum);
  compare();
  displayPic(right, randomNum);
}

getNames();
create();
alwaysThreePics();
// whichThreeLastTime();
