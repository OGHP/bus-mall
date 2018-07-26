'use strict';

var images = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var imageData = [];
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var container = document.getElementById('container');
var totalClicks = 0;
var previousImagesDisplayed = [];

var labelNames = [];
var productVotesPerImage = [];


function BusMallImages(images) {
    this.name = images.split('/')[1].split('.')[0];  //just the image NAME
    this.path = images;
    this.clicksPerImage = 0; //votes
    this.timesImageDisplayed = 0;

    imageData.push(this);
    labelNames.push(this.name);

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
};

/********* click event handler ********/

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

    if (totalClicks >= 25) {
        //putting all the votes into their own array to appear on the chart
        for(var h = 0; h < imageData.length; h++) {
            //pushing votes from object into their own array
            productVotesPerImage.push(imageData[h].clicksPerImage);
        }

        //DOM element manipulation styling
        left.style.display = "none";
        center.style.display = "none";
        right.style.display = "none";

        alert('Thanks for voting! Here come your results!');
        container.removeEventListener('click', handleClick);

        //sending votes to local storage
        votesForLocalStorage();

        //show chart to user
        renderVotesPerImageChart();

        /********* create li's to render list of photos and their votes to page ********/
        // (might not keep this)
        // var ulEl = document.getElementById('results-list');

        // for (var j = 0; j < images.length; j++) {
        //     var liEl = document.createElement('li');
        //     liEl.textContent = imageData[j].name + ' was clicked ' + imageData[j].clicksPerImage + ' times';
        //     ulEl.appendChild(liEl);
        // }
    }

    renderThreeImages();
}

/********* add total clicks to local storage ********/

function votesForLocalStorage() {
    var currentVotesPlusNewVotes = [];

    if (localStorage.multipleSurveyVotes) {
        for (var i = 0; i < productVotesPerImage.length; i++) {
            currentVotesPlusNewVotes[i] = productVotesPerImage[i] + JSON.parse(localStorage.multipleSurveyVotes)[i];
        }
    }
    else {
        currentVotesPlusNewVotes = productVotesPerImage;
    };
    var stringifiedVotes = JSON.stringify(currentVotesPlusNewVotes);
    localStorage.setItem('multipleSurveyVotes', stringifiedVotes); //setting to local storage
}

renderThreeImages();
container.addEventListener('click', handleClick);


/********* canvas chart guideline ********/

// function makeChart(){

// }

// function makeChartData() {

// }

// function drawChart() {

// }

function renderVotesPerImageChart() {
    var ctx = document.getElementById('myChart').getContext('2d');

    var votesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelNames,
            datasets: [{
                label: "Your Voting Results",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: productVotesPerImage,
            }]
        },
        options: {
            responsive: false,
                scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }]
                }
        }
    });
}
