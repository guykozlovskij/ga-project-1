// * Game Grid element
const grid = document.querySelector('.grid')
//* Width of a row
const width = 20
//* Array of cells
const cells = []




//* Player starting position 
let player = 389
// //* Player projectile starting position is the same as players 
let playerProjectile = player
let aliens = [0, 1, 2, 3, 20, 21, 22, 23, 40, 41, 42, 43]




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
        playerProjectile -= 20
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
      }
    }, 30)
  }
}




//* Alien movement 
setInterval(() => {
  for (let i = 0; i <= aliens.length - 1; i++) {
    cells[aliens[i]].classList.remove('alien')
  }
  for (let i = 0; i <= aliens.length - 1; i++) {
    aliens[i] += 1
  }
  for (let i = 0; i <= aliens.length - 1; i++) {
    cells[aliens[i]].classList.add('alien')
  }
}, 1000)









//? Potential refactor ?
// setInterval(() => {
//   aliens.forEach((alien, index) => {
//     cells[alien].classList.remove('alien')
//     alien += 1
//     aliens[index] += 1
//     cells[alien].classList.add('alien')
//   })
// }, 1000)