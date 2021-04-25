//* Initial game state
let isGamePlaying = false




// * The grid element
const grid = document.querySelector('.grid')
//* Width of a single row
const width = 23
//* An array of cells
const cells = []
//* Initial alien movement direction set to left
let direction = 1




//* Starts the game
const startButton = document.querySelector('#menu')
startButton.addEventListener('click', () => {
  if (isGamePlaying === false) {
    startGame()
  }
})




if (isGamePlaying === false) {
  startButton.innerHTML = 'Start Game'
  document.getElementById('menu').style.border = '3px solid white'
  document.getElementById('menu').style.padding = '50px '
}




function startGame() {
  isGamePlaying = true
  startButton.innerHTML = ''
  document.getElementById('menu').style.border = ''
  document.getElementById('menu').style.padding = ''
  const aKey = document.querySelector('#a-key')
  aKey.innerHTML = ''
  const dKey = document.querySelector('#d-key')
  dKey.innerHTML = ''
  const wKey = document.querySelector('#w-key')
  wKey.innerHTML = ''
  




  //* Score and lives tracker
  let score = 0
  const scoreTracker = document.querySelector('#score-tracker')
  let lives = 3
  const livesTracker = document.querySelector('#lives-tracker')




  //* Player starting position 
  let player = 517
  // //* Player projectile starting position is the same as players 
  let playerProjectile = player
  //* Array of aliens
  let aliens = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150]
  //* Mothership starting position
  // let mothership = 22



  //* Grid generated here
  for (let index = 0; index < width ** 2; index++) {
    const div = document.createElement('div')
    grid.appendChild(div)
    //! to be updated ------------------------------------------------------------------------
    // div.innerHTML = index
    //! to be updated ------------------------------------------------------------------------
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
        if (playerProjectile > 22 && !cells[playerProjectile].classList.contains('alien')) {
          cells[playerProjectile].classList.remove('projectile')
          playerProjectile -= width
          cells[playerProjectile].classList.add('projectile')
          if (cells[playerProjectile].classList.contains('alien')) {
            //? Updates the score
            score += 10
            scoreTracker.innerHTML = `Score: ${score}`

          }
          // if (cells[playerProjectile].classList.contains('mothership')) {
          //   score += 100
          //   scoreTracker.innerHTML = `Score: ${score}`
          //   cells[playerProjectile].classList.remove('projectile')
          //   cells[playerProjectile].classList.remove('mothership')
          // }
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


    // let monthershipMovesID

    // const mothershipID = setInterval(() => {
    //   motherShipMoves()
    // }, 15000)

    // let mothershipInitiated = false

    // function motherShipMoves() {
    //   if (mothershipInitiated === false) {
    //     mothershipInitiated = true
    //   }
    //   monthershipMovesID = setInterval(() => {
    //     if (mothership < 45) {
    //       cells[mothership].classList.remove('mothership')
    //       mothership = mothership + 1
    //       cells[mothership].classList.add('mothership')
    //     } else {
    //       cells[mothership].classList.remove('mothership')
    //       clearInterval(monthershipMovesID)
    //       mothershipInitiated = false
    //     }

    //   }, 2000)
    // }
    const endCard = document.querySelector('#end-card')




    //* Winning - Loosing 
    const aliensLanded = aliens.some(alienID => alienID > 500)

    if (lives === 0 || aliensLanded) {
      isGamePlaying = false
      clearInterval(alienMovementID)
      clearInterval(alienShootID)

      endCard.innerHTML = 'You Lose! Click to PLAY again.'
      document.getElementById('end-card').style.border = '3px solid white'
      document.getElementById('end-card').style.padding = '20px '
      document.getElementById('end-card').style.backgroundColor = 'black'
      endCard.addEventListener('click', () => {
        newGame()
      })
    }

    if (aliens.length === 0) {
      isGamePlaying = false
      clearInterval(alienMovementID)
      clearInterval(alienShootID)
      // clearInterval(mothershipID)

      endCard.innerHTML = 'You WIN! Click to PLAY again.'
      endCard.addEventListener('click', () => {
        newGame()
      })
      document.getElementById('end-card').style.border = '3px solid white'
      document.getElementById('end-card').style.padding = '20px '
      document.getElementById('end-card').style.backgroundColor = 'black'
    }

  }

  function newGame() {
    location.reload()
  }
}