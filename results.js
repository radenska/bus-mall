'use strict';

var imgFiles = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imgNames = [];
var results = document.getElementById('results');
var elTd;
var elTr;
var appearances = [];
var clickS = [];
var percent = [];

function getNames() {
  for (var i = 0; i < imgFiles.length; i++) {
    var tempString = imgFiles[i];
    imgNames[i] = tempString.slice(0, (tempString.length - 4)); //cut off the .ext from each file to get the name
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

function extractData() {//extracts data from localStorage and puts it into individual arrays
  if (!localStorage.totalAppearances) {
    alert('Oops! There\'s no data to display!');
  } else {
    appearances = JSON.parse(localStorage.getItem('totalAppearances'));
    clickS = JSON.parse(localStorage.getItem('totalClickS'));
    for (var i = 0; i < appearances.length; i++) {
      percent.push(Math.floor((clickS[i]/appearances[i]) * 100));
    }
  }
}

function addResults() {
  extractData();
  displayName('Image Names');
  displayData(imgNames);
  displayName('# of appearances');
  displayData(appearances);
  displayName('# of clicks');
  displayData(clickS);
  displayName('% of time chosen');
  displayData(percent);
  renderChart();
  renderChart2();
}

function renderChart() {
  var votes = document.getElementById('votes-chart').getContext('2d');
  votes.canvas.width = 1000;
  votes.canvas.height = 600;
  var votesChart = new Chart(votes,{
    type: 'bar',
    data: {
      labels: imgNames,
      datasets: [
        {
          label: '# of votes',
          data: clickS,
          backgroundColor: 'blue'
        },
        {
          label: '# of appearances',
          data: appearances,
          backgroundColor: 'green'
        }
      ]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function renderChart2() {
  var pers = document.getElementById('percent-chart').getContext('2d');
  pers.canvas.width = 1000;
  pers.canvas.height = 600;
  var percentChart = new Chart(pers,{
    type: 'pie',
    data: {
      labels: imgNames,
      datasets: [
        {
          label: '% of times voted (votes/appearances)',
          data: percent,
          backgroundColor: ['red', 'slateblue', 'green', 'blue', 'olive', 'orange', 'brown', 'black', 'violet', 'yellow', 'indigo', 'magenta', 'cyan', 'salmon', 'darkkhaki', 'lavender', 'seagreen', 'bisque', 'chocolate', 'darkslategray']
        }
      ]
    },
    options: {
      responsive: false,
    }
  });
}

getNames();
addResults();
