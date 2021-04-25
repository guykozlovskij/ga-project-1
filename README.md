![GA LOGO](./img/ga_logo.png) 

### General Assembly, Software Engineering Immersive 

# Cosmos Intruders

## Overview

Cosmos Intruders is my first ever front-end development project, produced as part of General Assembly's Immersive Sofware Engineering Bootcamp. 

The goal of the project was to create a grid-based game rendered in the browser utilising JavaScript, HTML and CSS.

Having been given a choice of possible games to work on, I have went with _Space Invaders_. I picked this particular game as I felt it was just within the reach of my comfort zone in relation to my knowledge , but difficult enough to push me to reach further and cleverly utilise the skills I have had so far.

My goal was to emulate to original game-feel and ensure the game is challenging and fun to play.

Click [here](https://guykozlovskij.github.io/project-1/) to play the game. 

## The Brief

- **Render the game in a browser**
- **Design logic for winning and display an endgame screen showing result**
- **Implement a projectile system which succesfuly removes elements on screen upon impact**
- **Write out logic for enemy movement**
- **Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles**
- **Use JavaScript for DOM manipulation**
- **Deploy your game online for others to access**

## Technologies Used

- HTML5
- CSS
- JavaScript
- Git and GitHub
- Visual Studio Code

## The Approach

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

### The Player 

The player is a variable defined with a number, which defines the position on the grid: 

```js
//* Player starting position 
  let player = 517
```

Player is the visualised by adding a corresponding sprite via a CSS **.class**.

```js
//* Adds Player to the Grid
  cells[player].classList.add('player')
```

