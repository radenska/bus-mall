'use strict';

var products = [];
var clickTotal = 0;
var imgFiles = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imgNames = [];
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var elImg;
var elLi;
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

function displayPic(position, whichSpot, index) {
  products[index].appearLast = clickTotal + 1;
  products[index].spot = whichSpot;
  products[index].numAppearances += 1;
  elLi = document.createElement('li');
  elImg = document.createElement('img');
  elImg.src = products[index].path;
  elLi.appendChild(elImg);
  position.appendChild(elLi);
}

function randomNumber() {
  return Math.floor(Math.random() * imgFiles.length);
}

function whichNotToUse () {
  dontUse = [];
  if (clickTotal !== 0) {
    for (var i = 0; i < imgFiles.length; i++) {
      if (products[i].appearLast === clickTotal) {
        products[i].spot = '';
        dontUse.push(i);
      }
    }
    console.log('dontUse rest: ' + dontUse);
  }
  else {
    dontUse = [randomNumber(), randomNumber(), randomNumber()];
    console.log('dontUse first: ' + dontUse);
  }
}

function compare() {
  do {
    randomNum = randomNumber();
  } while (dontUse.indexOf(randomNum) !== -1);
  console.log('randomNum from compare: ');
  // randomNum = randomNumber();
  // for (var i = 0; i < dontUse.length; i++) {
  //   while (randomNum === dontUse[i]) {
  //     randomNum = randomNumber();
  //   }
  dontUse.push(randomNum);
  console.log('dontuse after compare' + dontUse);
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

function findImage() {
  for (var i = 0; i < products.length; i++) {
    if (whichImg === products[i].spot) {
      return i;
    }
  }
}

function clickHandler (e) {
  e.preventDefault();
  alert('in the handler!');
  clickTotal += 1;
  whichImg = e.currentTarget.id;
  console.log('whichImg: ' + whichImg);
  var imgLoc = findImage();
  products[imgLoc].clicks += 1;
  console.log('imgLoc: ' + imgLoc);
}

getNames();
create();
alwaysThreePics();
// whichThreeLastTime();
document.addEventListener('click', clickHandler);
center.addEventListener('click', clickHandler);
right.addEventListener('click', clickHandler);
