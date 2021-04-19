// * Game Grid element
const grid = document.querySelector('.grid')
//* Width of a row
const width = 20
//* Array of cells
const cells = []



//! EDGE DETECTION





//* Player starting position 
let player = 389
// //* Player projectile starting position is the same as players 
let playerProjectile = player




//* The Grid
for (let index = 0; index < width ** 2; index++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = index
  div.style.width = `${100 / width}%`
  div.style.height = `${100 / width}%`
  cells.push(div)
}




//* Adds Player to the Grid
cells[player].classList.add('player')
//* Adds Alien to the Grid
const one = 106
const two = 107
const three = 108
const four = 109
const five = 110
const six = 111
const seven = 112
let superAlien = 0

cells[one].classList.add('alien')
cells[two].classList.add('alien')
cells[three].classList.add('alien')
cells[four].classList.add('alien')
cells[five].classList.add('alien')
cells[six].classList.add('alien')
cells[seven].classList.add('alien')
cells[superAlien].classList.add('alien')


//* Player movement and shoting
document.addEventListener('keydown', (event) => {
  const key = event.key

  //* Movement to the left
  if (key === 'a' && !(player % width === 0)) {
    cells[player].classList.remove('player')
    player -= 1
    cells[player].classList.add('player')
  }

  //* Movement to the rigth 
  if (key === 'd' && !(player % width === width - 1)) {
    cells[player].classList.remove('player')
    player += 1
    cells[player].classList.add('player')
  }

  //* Projectile fire
  if (key === 'w') {
    bang()
  }
})




//* Player projectile code
let bangInitiated = false

function bang() {
  if (bangInitiated === false) {
    bangInitiated = true
    playerProjectile = player

    const intervalID = setInterval(() => {
      if (playerProjectile > 19 && !cells[playerProjectile].classList.contains('alien')) {
        cells[playerProjectile].classList.remove('projectile')
        playerProjectile -= 20
        cells[playerProjectile].classList.add('projectile')
      } else {
        cells[playerProjectile].classList.remove('projectile')
        cells[playerProjectile].classList.remove('alien')
        playerProjectile = player
        clearInterval(intervalID)
        bangInitiated = false
      }
    }, 30)
  }
}





const intervalID2 = setInterval(() => {
  if (!cells[superAlien].classList.contains('projectile')) {
    cells[superAlien].classList.remove('alien')
    superAlien = superAlien + 1
    cells[superAlien].classList.add('alien')
  } else {
    clearInterval(intervalID2)
    cells[superAlien].classList.remove('alien')
  }
}, 1500)



