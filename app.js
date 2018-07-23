'use strict';

var images = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var imageData = [];

//constructor with parameter
function ImageTracker(images) {
    this.name = images.split('/')[1].split('.')[0];  //just the image NAME
    this.path = images;
    this.totalClicks = 0;

    imageData.push(this); //everything in the ImageTracker function goes into the array above

    // this.render();
}

//loop over the number of images and push the image NAME, PATH, and CLICKS to the imageData array
for (var i = 0; i < images.length; i++) {
    imageData.push(new ImageTracker(images[i]))
};
console.log('list img name, path, clicks', imageData);

//get a random image but how to I get images in here?
ImageTracker.prototype.generateRandomPhoto = function () {
    return Math.floor(Math.random() * (images.length-1)); // 0-19 will match up with file paths
};
console.log('creates random number', Math.floor(Math.random() * (images.length - 1)));


ImageTracker.prototype.render = function () {
    this.generateRandomPhoto()
};
