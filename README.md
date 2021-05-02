![GA LOGO](./img/ga_logo.png) 

### General Assembly, Software Engineering Immersive 

# Cosmos Intruders

## Overview

'Cosmos Intruders' is my first ever front-end development project, produced as part of General Assembly's Immersive Software Engineering Bootcamp. 

The goal of the project was to create a grid-based game rendered in the browser using 'vanilla' JavaScript, HTML and CSS. The project was to be completed individually within one week.

Having been given a choice of possible games to work on, I have chosen  _Space Invaders_. I picked this particular game as I felt it was just within the reach of my comfort zone in relation to my knowledge, but difficult enough to push me to reach further and cleverly utilize the skills I had obtained.

My goal was to emulate the original game-feel and ensure the game is challenging and fun to play.

You can launch the game on GitHub pages [here](https://guykozlovskij.github.io/project-1/).

## Table of contents 
* [The Brief](#brief)
  * [Technologies Used](#tech)
  * [The Approach](#approach)
  * [The Grid](#grid)
  * [The Player](#player)
    * [Player Movement](#player-movement)
    * [Player Projectile](#player-shooting)
  * [Aliens](#aliens)
    * [Alien Wall Collision](#alien-wall)
    * [Alien Projectiles](#alien-shooting)
* [Challenges](#challenges)
* [Victories](#Victories)
* [Lessons Learned](#lessons)
* [Potential Future Features](#future)


<a name="brief"></a>

## The Brief 

- **Render the game in a browser**
- **Design logic for winning and display an endgame screen showing the result**
- **Implement a projectile system which successfully removes elements on screen upon impact**
- **Write out logic for enemy movement**
- **Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles**
- **Use JavaScript for DOM manipulation**
- **Deploy your game online for others to access**
- **Use semantic markup for HTML and CSS (adhere to best practices**)

<a name="tech"></a>
## Technologies Used

- HTML5
- CSS
- JavaScript
- Git and GitHub
- Visual Studio Code
- Google Fonts

<a name="approach"></a>
## The Approach

<a name="grid"></a>

### The Grid 

The game is built on a 23 x 23 grid generated from HTML divs using a  JavaScript **for** loop which appends the divs as children of the grid. 

```js
//* The grid element
const grid = document.querySelector('.grid')
//* Width of a single row
const width = 23
//* An array of cells
const cells = []

//* Grid generated here
 for (let index = 0; index < width ** 2; index++) {
    const div = document.createElement('div')
    grid.appendChild(div)
    div.style.width = `${100 / width}%`
    div.style.height = `${100 / width}%`
    cells.push(div)
  }
```

![](/img/readme_images/grid_display.png)

*(Grid is highlighted for demonstration purposes and is not visible in-game.)*

<a name="player"></a>
### The Player 

![](/img/readme_images/player.png)

The player is a variable defined with a number, which defines its position on the grid: 

```js
//* Player starting position 
  let player = 517
```

Player is then visualised by adding a corresponding sprite via a CSS **.class**.

```js
//* Adds Player to the Grid
  cells[player].classList.add('player')
```

<a name="player-movement"></a>

**Player movement** is regulated by an event listener that checks for a `keydown` event on the user's keyboard. The wall detection logic is written to detect collision relative to the players position. Player is moved either left or right by one cell per single `keydown` event by incrementing or decreasing the player value and then removing the sprite class in the current cell and immediately adding in the following one. This logic of removing class, incrementing value and adding class is used through all elements on the grid to create movement. 

```js
  //* Player movement and shoting
  document.addEventListener('keydown', (event) => {
    const key = event.key

    //? Movement to the left
    if (key === 'a' && !(player % width === 0)) {
      cells[player].classList.remove('player')
      player -= 1
      cells[player].classList.add('player')
    }

    //? Movement to the rigth 
    if (key === 'd' && !(player % width === width - 1)) {
      cells[player].classList.remove('player')
      player += 1
      cells[player].classList.add('player')
    }
```
<a name="player-shooting"></a>

**Player projectile** is fired when a specific `keydown` is detected and a function is called.

```js
  //? Projectile fire
    if (key === 'w') {
      bang()
    }
  })
```
When the function `bang()` is called, the player projectile, held in the same position as the `player` element, is incremented by the full `width` of the grid, every 30 milliseconds using a `setInterval`. In the same fashion as the player movement the class is being removed and added after the incrementation to create movement. With every incrementation the player projectile will check for the enemy class within itself and will continue incrementing until an enemy is found. 

Once an enemy class is found the enemy and the projectile will be removed and the `score` global variable will be updated. This will also update the `alien` array by removing the one which was hit by the projectile. 
```js
  //* Player projectile initiation value
  let bangInitiated = false

  //? Allows only one projectile at a time on the screen
  function bang() {
    if (bangInitiated === false) {
      bangInitiated = true
      playerProjectile = player

      //? Checks if no aliens ahead and moves projectile forward
      const intervalID = setInterval(() => {
        if (playerProjectile > 22 && !cells[playerProjectile].classList.contains('alien')) {
          cells[playerProjectile].classList.remove('projectile')
          playerProjectile -= width
          cells[playerProjectile].classList.add('projectile')
          if (cells[playerProjectile].classList.contains('alien')) {
            //? Updates the score
            score += 10
            scoreTracker.innerHTML = `Score: ${score}`
          }
        } else {
          
          cells[playerProjectile].classList.remove('projectile')
          cells[playerProjectile].classList.remove('alien')
          //? Updating the array upon impact with the projectile
          aliens = aliens.filter((alien) => {
            return alien !== playerProjectile
          })
          clearInterval(intervalID)
          bangInitiated = false
        }
      }, 30)
    }
  }
```
<a name="aliens"></a>

### The Aliens

![](/img/readme_images/aliens.png)

Enemy ships are defined as an array of numbers which corresponds to their position on the grid:

```js
//* Array of aliens
  let aliens = [46, 47, 48, 49, 50, ...]
```
They are then added to the grid using a `forEach` statement:

```js
 //* Adds Aliens to the Grid
  aliens.forEach(alien => {
    cells[alien].classList.add('alien')
  })
```
<a name="alien-wall"></a>

**Alien wall collision** is written in a similar fashion to the players' collision, with the difference being us measuring a whole array of objects, rather than a single one. I opted out to have the first and the last objects in the array as the measuring points, checking if they are divisible by the `width`.
```js
 //* Alien movement
  const alienMovementID = setInterval(() => {

    const leftWall = aliens[0] % width === 0
    const rightWall = aliens[aliens.length - 1] % width === width - 1


    if ((leftWall && direction === - 1) || (rightWall && direction === 1)) {
      direction = width
    } else if (direction === width) {
      if (leftWall) {
        direction = 1
      } else direction = -1
    }
 
...
  
  }, 500)//800
```
<a name="alien-shooting"></a>

## Alien Projectiles

The alien projectile is fired every 40 milliseconds using  a `setInterval`. The firing position is randomly determined using `Math.random` across the full alien array:

```js
const randomAlienIndex = Math.floor(Math.random() * aliens.length)
let alienProjectile = aliens[randomAlienIndex]
``` 

Once a random shooting position is picked, a `setInterval` then is initiated, which moves the projectile across the full width of the grid, checking every cell for the player in the same manner as the player projectile. If the projectile cell finds a **player** class, the projectile is immediately removed and the global `lives` variable is decremented. 


```js
const alienBangID = setInterval(() => {

        if (alienProjectile < 529) {
          cells[alienProjectile].classList.remove('alien-projectile')
          alienProjectile += width
          cells[alienProjectile].classList.add('alien-projectile')
          if (cells[player].classList.contains('alien-projectile')) {
            lives -= 1
            livesTracker.innerHTML = (`Lives: ${lives}`)
          }
        } else {
          clearInterval(alienBangID)
          alienBangInitiated = false

        }
        //? Alien projectile speed  
      }, 40)
```
<a name="challenges"></a>

## Challenges
This was my very first front-end JavaScript project which utilized all the things I have learned so far in the immersive course. Starting from a completely empty canvas and building the application from scratch was challenging but also emboldening. 

The Alien movement posed the biggest challenge in the project. It was something I had to spend most of my time on as it took me a while to think of the best way of them interacting with the walls and move down upon contact **as a group**. 

The second-biggest challenge was implementing a correct way of updating the alien array once an alien has been hit by a projectile. This was due to my initial approach of just removing a class of a single alien, rather than updating the array.

<a name="victories"></a>

## Victories
I am very happy with the look and feel of the game. Although it may seem simple, the simplistic Atari-esque retro look and feel is exactly what I was striving for. Additionally, the speed and difficulty of the game is something I considered to be really important, as it is a game after all. Regardless of this being a very simple project I wanted the game to be fun to play, and I believe I have managed to achieve that. 

Since I  have completed this project without much guidance from the instructors I feel very motivated and empowered to continue my journey of learning to code with much anticipation and excitement. 

<a name="lessons"></a>

## Lessons Learned 
This project has truly highlighted to me the importance of thinking ahead. I have encountered a few moments where some careless commitments early on have rippled down the line by the end of the project. This has made refactoring difficult and if I were to do this project again I would spend more time whiteboarding and planning out the development steps in more detail.

Additionally, I now understand the importance of a clean and organized code and good comments. The bigger the project gets the more easy it is to start losing track of things. In all my future projects I will be doing my best to better follow the KISS and DRY code principles. 

<a name="future"></a>

## Potential Future Features 
- Refactoring the movement and shooting mechanics
- More accurately emulate the original game: i.e. sounds, destructible cover, alien mothership, high-score tracking. 