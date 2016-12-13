'use strict';

var products = [];
var clickTotal = 0;
var imgFiles = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imgNames = [];
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var leftEl;
var rightEl;
var centerEl;

function getNames() {
  for (var i = 0; i < imgFiles.length; i++) {
    var tempString = imgFiles[i];
    imgNames[i] = tempString.slice(0, (tempString.length - 4));
  }
}

getNames();

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

create();

var elImg;
var elLi;
var randomNum;
var lastThree;

function displayPic(position, index) {
  elLi = document.createElement('li');
  elImg = document.createElement('img');
  elImg.src = products[index].path;
  elLi.appendChild(elImg);
  position.appendChild(elLi);
}

function randomNumber() {
  return products[Math.floor(Math.random() * imgFiles.length)].path;
}

function whichThreeLastTime (obj) {
  lastThree = [];
  for (var i = 0; i < imgFiles.length; i++) {
    if (this[i].appearLast === clickTotal) {
      lastThree.push(i);
    }
  }
}

function alwaysThreePics (obj) {
  randomNum = randomNumber();
  whichThreeLastTime();
  while (randomNum === lastThree[0] || randomNum === lastThree[1] || randomNum === lastThree[2]) {
    randomNum = randomNumber();
  }
  displayPic(left, randomNum);

displayPic(center);
  displayPic(right);
}

alwaysThreePics();
