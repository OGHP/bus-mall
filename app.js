'use strict';

var images = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var imageData = [];
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var container = document.getElementById('container');
var totalClicks = 0;
var previousImagesDisplayed = [];

function BusMallImages(images) {
    this.name = images.split('/')[1].split('.')[0];  //just the image NAME
    this.path = images;
    this.clicksPerImage = 0; //votes
    this.timesImageDisplayed = 0;

    imageData.push(this);
};

/********* creates objects from the constructor ********/
function objectCreator() {
    for (var i = 0; i < images.length; i++) {
        new BusMallImages(images[i])
    }
};
objectCreator();

/********* need separate random generator ********/
function random() {
    return Math.floor(Math.random() * images.length);
}

/********* render three random index positions ********/
function renderThreeImages() {
    var randomIndex = [];

    randomIndex[0] = random();
    randomIndex[1] = random();
    randomIndex[2] = random();

    //preventing all duplicates
    while (randomIndex[0] === randomIndex[1] || randomIndex[0] === randomIndex[2] || randomIndex[1] === randomIndex[2] || previousImagesDisplayed.includes(randomIndex[0]) || previousImagesDisplayed.includes(randomIndex[1]) || previousImagesDisplayed.includes(randomIndex[2])) {
        randomIndex[0] = random();
        randomIndex[1] = random();
        randomIndex[2] = random();
        console.log('a dupe was prevented');
    }

/********* render three random images ********/
    console.log('previous image displayed', previousImagesDisplayed);

    previousImagesDisplayed = [];

    left.src = imageData[randomIndex[0]].path;
    imageData[randomIndex[0]].timesImageDisplayed++;
    //this is for comparison between what was previously displayed & what is newly displayed
    previousImagesDisplayed.push(randomIndex[0]);

    center.src = imageData[randomIndex[1]].path;
    imageData[randomIndex[1]].timesImageDisplayed++;
    previousImagesDisplayed.push(randomIndex[1]);

    right.src = imageData[randomIndex[2]].path;
    imageData[randomIndex[2]].timesImageDisplayed++;
    previousImagesDisplayed.push(randomIndex[2]);
    console.log('previous image', previousImagesDisplayed);

    left.title = imageData[randomIndex[0]].name;
    center.title = imageData[randomIndex[1]].name;
    right.title = imageData[randomIndex[2]].name;

    // left.src = imageData[randomIndex[0]].path;
    // center.src = imageData[randomIndex[1]].path;
    // right.src = imageData[randomIndex[2]].path;

};

// console.log('what does renderThreeImages do', renderThreeImages());
// renderThreeImages();


function handleClick(event) {
    if (event.target.id === 'container') {
        return alert('Remember to click on an image');
    }
    console.log(event.target.title);

    for (var i = 0; i < imageData.length; i++) {
        if (event.target.title === imageData[i].name) {
            imageData[i].clicksPerImage++;
        }
    }

    //logging total clicks
    totalClicks++;
    console.log(totalClicks, 'total clicks');

    if (totalClicks >= 4) {
        alert('Thanks for voting! Here come your results!');
        container.removeEventListener('click', handleClick);

        var ulEl = document.getElementById('results-list');

        for (var j = 0; j < images.length; j++) {
            var liEl = document.createElement('li');
            liEl.textContent = imageData[j].name + ' was clicked ' + imageData[j].clicksPerImage + ' times';
            ulEl.appendChild(liEl);
        }
        console.log('image data', imageData);
    }

    renderThreeImages();
}

renderThreeImages();
container.addEventListener('click', handleClick);
