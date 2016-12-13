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
  this.clickTotal = 0;
  this.NumAppearances = 0;
  this.displayedLastTime = false;
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

// function appendEl(elContent, table) { //creates and appends an element, relies on global variables
//   el = document.createElement('td');
//   el.textContent = elContent;
//   el2.appendChild(el);
//   table.appendChild(el2);
// }
var elImg;
var elLi;

function displayPic(position) {
  var randomNum = products[Math.floor(Math.random() * imgFiles.length)].path;
  elLi = document.createElement('li');
  elImg = document.createElement('img');
  elImg.src = randomNum;
  elLi.appendChild(elImg);
  position.appendChild(elLi);
}

function alwaysThreePics () {
  displayPic(left);
  displayPic(center);
  displayPic(right);
}

alwaysThreePics();
