var gameImages = [
    'images/mercury.png',
    'images/venus.png',
    'images/earth.png',
    'images/mars.png',
    'images/jupiter.png',
    'images/saturn.png',
    'images/uranus.png',
    'images/neptune.png',
    'images/pluto-sphere.png'
];

$(document).ready(initializeApp);

var game = null;

function initializeApp(){
    var info = {
        frontImages: gameImages,
        backImage: 'images/silver-back.png'
    };
    game = new Game(info);
    game.startGame();
}

