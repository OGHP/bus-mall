'use strict';

var images = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var imageData = [];
var totalClicks = 0;


function BusMallImages(images) {
    this.name = images.split('/')[1].split('.')[0];  //just the image NAME
    this.path = images;
    this.clicksPerImage = 0;
    this.timesDisplayed = 0;

    imageData.push(this);
};

/********* creats objects from the constructor ********/
function objectCreator() {
    for (var i = 0; i < images.length; i++) {
        new BusMallImages(images[i])
    }
};
objectCreator();

/********* render three images ********/
var image1 = document.getElementById('image-one');
var image2 = document.getElementById('image-two');
var image3 = document.getElementById('image-three');

function renderThreeImages() {
    var randomNumber1 = Math.floor(Math.random() * (images.length - 1));
    var randomNumber2 = Math.floor(Math.random() * (images.length - 1));
    var randomNumber3 = Math.floor(Math.random() * (images.length - 1));
    console.log('creates random number 1', randomNumber1);
    console.log('creates random number 2', randomNumber2);
    console.log('creates random number 3', randomNumber3);
    image1.src = imageData[randomNumber1].path;
    image2.src = imageData[randomNumber2].path;
    image3.src = imageData[randomNumber3].path;
};

renderThreeImages();

//TODO 1. Be able to receive clicks on the displayed images and track those clicks for each image.

//TODO 2. Track how many times each image is displayed

//TODO 3. Upon receiving a click, three new non - duplicating random images need to be automatically displayed.

/********* event listener ********/
// var imageOne = document.getElementById('image-one');


// function eventListenerFunctionName() {
//     increment tally for the image in the array
// };

// imageOne.addEventListener('click', eventListenerFunctionName());
