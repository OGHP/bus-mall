'use strict';

var images = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var imageData = [];
var totalClicks = 0;

//constructor
function BusMallImages(images) {
    this.name = images.split('/')[1].split('.')[0];  //just the image NAME
    this.path = images;
    this.clicksPerImage = 0;
    this.timesDisplayed = 0;

    //everything in the BusMallImages function goes into the array above
    imageData.push(this);
};

//push the image NAME, PATH, and CLICKS to the imageData array
function objectCreator() {
    for (var i = 0; i < images.length; i++) {
        new BusMallImages(images[i])
    }
};
objectCreator();


var image1 = document.getElementById('image-one');
var image2 = document.getElementById('image-two');
var image3 = document.getElementById('image-three');

//render calls generateRandomNumber
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

// var imageTag1 = document.getElementById('image-one');

// imageTag1.addEventListener('submit', function (event) {
//     event.preventDefault();

//     var name = event.target.name.value;
//     var path = event.target.minCustomer.value;
//     var clicksPerImage = event.target.clicksPerImage.value;
//     var timesDisplayed = event.target.timesDisplayed.value;

// });

document.getElementById("image-one").addEventListener("click", function (event) {
    event.target.textContent = "click count: " + event.detail;
});


//console.log(event.target.textContent = "click count: " + event.detail);


//listening for click on image
