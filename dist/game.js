"use strict";
//* Initial game state
var isGamePlaying = false;
// * The grid element
var grid = document.querySelector('.grid');
//* Width of a single row
var width = 23;
//* An array of cells
var cells = [];
console.log('here', cells);
//* Initial alien movement direction set to left
var direction = 1;
//* Starts the game
var startButton = document.querySelector('#menu');
startButton.addEventListener('click', function () {
    if (!isGamePlaying) {
        startGame();
    }
});
if (!isGamePlaying) {
    startButton.innerHTML = 'Start Game';
    document.getElementById('menu').style.border = '3px solid white';
    document.getElementById('menu').style.padding = '50px ';
}
function startGame() {
    isGamePlaying = true;
    startButton.innerHTML = '';
    document.getElementById('menu').style.border = '';
    document.getElementById('menu').style.padding = '';
    var aKey = document.querySelector('#a-key');
    aKey.innerHTML = '';
    var dKey = document.querySelector('#d-key');
    dKey.innerHTML = '';
    var wKey = document.querySelector('#w-key');
    wKey.innerHTML = '';
    //* Score and lives tracker
    var score = 0;
    var scoreTracker = document.querySelector('#score-tracker');
    var lives = 3;
    var livesTracker = document.querySelector('#lives-tracker');
    //* Player starting position 
    var player = 517;
    // //* Player projectile starting position is the same as players 
    var playerProjectile = player;
    //* Array of aliens
    var aliens = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150];
    //* Mothership starting position
    //* Grid generated here
    for (var index = 0; index < Math.pow(width, 2); index++) {
        var div = document.createElement('div');
        grid.appendChild(div);
        //! to be updated ------------------------------------------------------------------------
        // div.innerHTML = index
        //! to be updated ------------------------------------------------------------------------
        div.style.width = 100 / width + "%";
        div.style.height = 100 / width + "%";
        cells.push(div);
    }
    //* Adds Player to the Grid
    cells[player].classList.add('player');
    //* Adds Aliens to the Grid
    aliens.forEach(function (alien) {
        cells[alien].classList.add('alien');
    });
    //* Player movement and shooting
    document.addEventListener('keydown', function (event) {
        var key = event.key;
        //? Movement to the left
        if (key === 'a' && !(player % width === 0)) {
            cells[player].classList.remove('player');
            player -= 1;
            cells[player].classList.add('player');
        }
        //? Movement to the right
        if (key === 'd' && !(player % width === width - 1)) {
            cells[player].classList.remove('player');
            player += 1;
            cells[player].classList.add('player');
        }
        //? Projectile fire
        if (key === 'w') {
            bang();
        }
    });
    //* Player projectile initiation value
    var bangInitiated = false;
    //? Allows only one projectile at a time on the screen
    function bang() {
        if (bangInitiated === false) {
            bangInitiated = true;
            playerProjectile = player;
            //? Checks if no aliens ahead and moves projectile forward
            var intervalID_1 = setInterval(function () {
                if (playerProjectile > 22 && !cells[playerProjectile].classList.contains('alien')) {
                    cells[playerProjectile].classList.remove('projectile');
                    playerProjectile -= width;
                    cells[playerProjectile].classList.add('projectile');
                    if (cells[playerProjectile].classList.contains('alien')) {
                        //? Updates the score
                        score += 10;
                        scoreTracker.innerHTML = "Score: " + score;
                    }
                }
                else {
                    cells[playerProjectile].classList.remove('projectile');
                    cells[playerProjectile].classList.remove('alien');
                    //? Updating the array upon impact with the projectile
                    aliens = aliens.filter(function (alien) {
                        return alien !== playerProjectile;
                    });
                    clearInterval(intervalID_1);
                    bangInitiated = false;
                }
            }, 30);
        }
    }
    //* Alien movement
    var alienMovementID = setInterval(function () {
        var leftWall = aliens[0] % width === 0;
        var rightWall = aliens[aliens.length - 1] % width === width - 1;
        if ((leftWall && direction === -1) || (rightWall && direction === 1)) {
            direction = width;
        }
        else if (direction === width) {
            if (leftWall) {
                direction = 1;
            }
            else
                direction = -1;
        }
        for (var i = 0; i <= aliens.length - 1; i++) {
            cells[aliens[i]].classList.remove('alien');
        }
        for (var i = 0; i <= aliens.length - 1; i++) {
            aliens[i] += direction;
        }
        for (var i = 0; i <= aliens.length - 1; i++) {
            cells[aliens[i]].classList.add('alien');
        }
        //? Alien movement speed
    }, 500); //800
    //* Alines shooting speed 
    var alienShootID = setInterval(function () {
        alienBang();
    }, 800);
    //* Alien shooting logic
    var alienBangInitiated = false;
    function alienBang() {
        if (alienBangInitiated === false) {
            alienBangInitiated = true;
            var randomAlienIndex = Math.floor(Math.random() * aliens.length);
            var alienProjectile_1 = aliens[randomAlienIndex];
            var alienBangID_1 = setInterval(function () {
                if (alienProjectile_1 < 529) {
                    cells[alienProjectile_1].classList.remove('alien-projectile');
                    alienProjectile_1 += width;
                    cells[alienProjectile_1].classList.add('alien-projectile');
                    if (cells[player].classList.contains('alien-projectile')) {
                        lives -= 1;
                        livesTracker.innerHTML = ("Lives: " + lives);
                    }
                }
                else {
                    clearInterval(alienBangID_1);
                    alienBangInitiated = false;
                }
                //? Alien projectile speed  
            }, 40);
        }
        var endCard = document.querySelector('#end-card');
        //* Winning - Loosing 
        var aliensLanded = aliens.some(function (alienID) { return alienID > 500; });
        if (lives === 0 || aliensLanded) {
            isGamePlaying = false;
            clearInterval(alienMovementID);
            clearInterval(alienShootID);
            endCard.innerHTML = 'Game Over! Click to PLAY again.';
            document.getElementById('end-card').style.border = '3px solid white';
            document.getElementById('end-card').style.padding = '20px ';
            document.getElementById('end-card').style.backgroundColor = 'black';
            endCard.addEventListener('click', function () {
                newGame();
            });
        }
        if (aliens.length === 0) {
            isGamePlaying = false;
            clearInterval(alienMovementID);
            clearInterval(alienShootID);
            endCard.innerHTML = 'You WIN! Click to PLAY again.';
            endCard.addEventListener('click', function () {
                newGame();
            });
            document.getElementById('end-card').style.border = '3px solid white';
            document.getElementById('end-card').style.padding = '20px ';
            document.getElementById('end-card').style.backgroundColor = 'black';
        }
    }
    function newGame() {
        location.reload();
    }
}
