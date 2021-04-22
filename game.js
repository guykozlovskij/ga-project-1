// * Game Grid element
const grid = document.querySelector('.grid')
//* Width of a row
const width = 23
//* Array of cells
const cells = []
//* Initial alien movement direction set to left
let direction = 1
//* Initial game state
let isGamePlaying = false







//* Starts the game
const startButton = document.querySelector('#menu')
startButton.addEventListener('click', () => {
  if (isGamePlaying === false) {
    startGame()
  }
})




//*Start Game styling
startButton.addEventListener('mou')





function startGame() {
  isGamePlaying = true
  startButton.innerHTML = ''


  //* Score and lives tracker
  let score = 0
  const scoreTracker = document.querySelector('#score-tracker')
  let lives = 3
  const livesTracker = document.querySelector('#lives-tracker')
  



  //! to be updated ------------------------------------------------------------------------
  const resultText = document.querySelector('#win-lose')
  //! to be updated ------------------------------------------------------------------------



  //* Player starting position 
  let player = 517
  // //* Player projectile starting position is the same as players 
  let playerProjectile = player
  //* Array of aliens
  let aliens = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150]




  //* The Grid
  for (let index = 0; index < width ** 2; index++) {
    const div = document.createElement('div')
    grid.appendChild(div)
    // div.innerHTML = index
    div.style.width = `${100 / width}%`
    div.style.height = `${100 / width}%`
    cells.push(div)
  }




  //* Adds Player to the Grid
  cells[player].classList.add('player')
  //* Adds Aliens to the Grid
  aliens.forEach(alien => {
    cells[alien].classList.add('alien')
  })




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

    //? Projectile fire
    if (key === 'w') {
      bang()
    }
  })




  //* Player projectile code
  let bangInitiated = false

  //? Allows only one projectile at a time on screen
  function bang() {
    if (bangInitiated === false) {
      bangInitiated = true
      playerProjectile = player

      //? Checks if no aliens ahead and moves projectile forward
      const intervalID = setInterval(() => {
        if (playerProjectile > 19 && !cells[playerProjectile].classList.contains('alien')) {
          cells[playerProjectile].classList.remove('projectile')
          playerProjectile -= width
          cells[playerProjectile].classList.add('projectile')
        } else {
          cells[playerProjectile].classList.remove('projectile')
          cells[playerProjectile].classList.remove('alien')
          //? Updating the array upon impact with the projectile
          aliens = aliens.filter((alien) => {
            return alien !== playerProjectile
          })
          clearInterval(intervalID)
          bangInitiated = false
          //? Updates the score
          score += 10
          scoreTracker.innerHTML = `Score: ${score}`
        }
      }, 30)
    }
  }




  //* Alien movement
  const alienMovementID = setInterval(() => {

    const leftWall = aliens[0] % width === 0
    const rightWall = aliens[12] % width === width - 1

    if ((leftWall && direction === - 1) || (rightWall && direction === 1)) {
      direction = width
    } else if (direction === width) {
      if (leftWall) {
        direction = 1
      } else direction = -1
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.remove('alien')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      aliens[i] += direction
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.add('alien')
    }
  //? Alien movement speed
  }, 500)//800




  //* Alines shooting speed 
  const alienShootID = setInterval(() => {
    alienBang()
  }, 800)




  //* Alien shooting logic
  let alienBangInitiated = false

  function alienBang() {
    if (alienBangInitiated === false) {
      alienBangInitiated = true
      const randomAlienIndex = Math.floor(Math.random() * aliens.length)
      let alienProjectile = aliens[randomAlienIndex]

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
    }



    //* Winning - Loosing 
    const aliensLanded = aliens.some(alienID => alienID > 500)

    if (lives === 0 || aliensLanded) {
      isGamePlaying = false
      clearInterval(alienMovementID)
      clearInterval(alienShootID)
      resultText.innerHTML = 'You Lose!'
    }
    if (aliens.length === 0 ) {
      isGamePlaying = false
      clearInterval(alienMovementID)
      clearInterval(alienShootID)
      resultText.innerHTML = 'You Win!'
    }

  }

}




