const startGameBtn = document.getElementById("start-game-btn");
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSOR = "SCISSOR";
const DEFAULT_CHOICE = ROCK;
const PLAYER_WINS = "Player Wins....";
const PLAYER_LOST = "Player Lost....";
const DRAW = "Match Draw....";
let isGameRunning = false;

function getPlayerChoice() {
  let selection = prompt(`${ROCK}, ${PAPER} or ${SCISSOR}?`, "").toUpperCase();
  if (selection != ROCK && selection != PAPER && selection != SCISSOR) {
    alert(`Invalid Choice! We choose ${DEFAULT_CHOICE} for you!`);
    return DEFAULT_CHOICE;
  }
  return selection;
}

function getComputerChoice() {
  let computerChoice = Math.random();
  if (computerChoice <= 0.34) return ROCK;
  else if (computerChoice <= 0.67) return PAPER;
  else if (computerChoice <= 1) return SCISSOR;
}

function getWinner(cChoice, pChoice) {
  if (cChoice === pChoice) {
    return DRAW;
  } else if ((cChoice === ROCK && pChoice === PAPER) || (cChoice === PAPER && pChoice === SCISSOR) || (cChoice === SCISSOR && pChoice === ROCK)) {
    return PLAYER_WINS;
  } else {
    return PLAYER_LOST;
  }
}

startGameBtn.addEventListener("click", () => {
  if (isGameRunning) return;
  isGameRunning = true;
  let playerChoice = getPlayerChoice();
  let computerChoice = getComputerChoice();
  let winner = getWinner(computerChoice,playerChoice);
  let message = `You picked ${playerChoice}, computer picked ${computerChoice}, so you `;
  if (winner === DRAW) {
    message += "had a draw. Try again... 🔁";
  } else if (winner === PLAYER_WINS) {
    message += "win. Hurray! 🎉🎊";
  } else if (winner === PLAYER_LOST) {
    message += "lost. Better luck next time !!! 🤞";
  }
  alert(message);
  isGameRunning = false;
});
