// ==================== CONSTANTS ==================== //
const STATUS_DISPLAY = document.querySelector('.game-notification'),
  AGAIN= document.getElementById('again')
  GAME_STATE = ["", "", "", "", "", "", "", "", ""],
  WINNINGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  WIN_MESSAGE = () => `El jugador ${currentPlayer} ha ganado!`,
  DRAW_MESSAGE = () => `El juego ha terminado en empate!`,
  CURRENT_PLAYER_TURN = () => `Turno del jugador ${currentPlayer}`

  
// ==================== VARIABLES ==================== //
let gameActive = true,
  currentPlayer = "O"
const elementos=document.querySelectorAll('.game-cell')

// ==================== FUNCTIONS ==================== //

function main() {
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  listeners()
}

function listeners() {
  document.querySelector('.game-container').addEventListener('click', handleCellClick)
  document.querySelector('.game-restart').addEventListener('click', handleRestartGame)
}

function handleStatusDisplay(message) {
  STATUS_DISPLAY.innerHTML = message
}

function handleRestartGame() {
  gameActive = true
  currentPlayer = "X"
  restartGameState()
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  elementos.forEach(elem=>elem.classList.remove('dancing'))
  AGAIN.classList.toggle('appears')
}

function handleCellClick(clickedCellEvent /** Type Event **/) {
  const clickedCell = clickedCellEvent.target
  if (clickedCell.classList.contains('game-cell')) {
    clickedCell.classList.add('activate')
    const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
    if (GAME_STATE[clickedCellIndex] !== '' || !gameActive) {
      if(GAME_STATE[clickedCellIndex]===""){
        clickedCell.classList.remove('activate')
      }else{
        return
      }
      return false
    }

    handleCellPlayed(clickedCell, clickedCellIndex)
    handleResultValidation()
  }
}

function handleResultValidation() {
  let roundWon = false
  for (let i = 0; i < WINNINGS.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
    const winCondition = WINNINGS[i] // Guarda la combinación por ejemplo: [0, 1, 2]
    let position1 = GAME_STATE[winCondition[0]],
      position2 = GAME_STATE[winCondition[1]],
      position3 = GAME_STATE[winCondition[2]] // Almacena el valor del estado actual del juego según las posiciones de winCondition

    if (position1 === '' || position2 === '' || position3 === '') {
      continue; // Si hay algún valor vacio nadie ha ganado aún
    }
    if (position1 === position2 && position2 === position3) {
      roundWon = true // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida

      break
    }
  }

  if (roundWon) {
    handleStatusDisplay(WIN_MESSAGE())
    elementos.forEach(elem=>elem.classList.add('dancing'))
    AGAIN.classList.toggle('appears')
    gameActive = false
    return
  }

  let roundDraw = !GAME_STATE.includes("") // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces es empate
  if (roundDraw) {
    handleStatusDisplay(DRAW_MESSAGE())
    elementos.forEach(elem=>elem.classList.add('losing'))
    AGAIN.classList.toggle('appears')
    gameActive = false
    return
  }

  handlePlayerChange()
}

function handleCellPlayed(clickedCell /* object HTML */, clickedCellIndex) {
  GAME_STATE[clickedCellIndex] = currentPlayer // Agrega en la posición correspondiente el valor ya sea "X" u "O" en el estado actual del juego
  clickedCell.innerHTML = currentPlayer // Agrega en el HTML el valor del jugador
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  handleStatusDisplay(CURRENT_PLAYER_TURN())
}

function restartGameState() {
  let i = GAME_STATE.length
  elementos.forEach(cell => {
    cell.innerHTML = ""
    cell.classList.remove('activate');
    cell.classList.remove('losing')
  })
  
  while (i--) {
    GAME_STATE[i] = ''
  }
}

main()