'use strict';
// Variables
let currentScore, activePlayer;
let scores = [0, 0];
const pointsToWin = 30;

// Selector's
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score_p0 = document.querySelector('#score--0');
const score_p1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

// Initial value's
dice.classList.add('hidden');

init();
// Listener's
btnRollDice.addEventListener('click', () => {
  // Get random Number
  const diceNum = Math.trunc(Math.random() * 6) + 1;
  // Display correct image of dice
  dice.src = `dice-${diceNum}.png`;
  dice.classList.remove('hidden');
  // check if the number is not 1, if not display de value, otherwise change player
  if (diceNum !== 1) {
    currentScore += diceNum;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    scores[activePlayer] = 0;
    setScoreActivePlayer();
    changePlayer();
  }
});

btnHold.addEventListener('click', () => {
  // add the current score to active player's
  scores[activePlayer] += currentScore;
  setScoreActivePlayer();
  // check if currect score is >= 100
  // finish the game
  if (scores[activePlayer] >= pointsToWin) {
    document.querySelector('.player--active').classList.add('player--winner');
    btnHold.classList.add('hidden');
    btnRollDice.classList.add('hidden');
    btnNewGame.focus();
  }
  // change player
  changePlayer();
});

btnNewGame.addEventListener('click', init);

// Function's
function changePlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function setScoreActivePlayer() {
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
}

function init() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
  btnHold.classList.remove('hidden');
  btnRollDice.classList.remove('hidden');
  current0.textContent = 0;
  current1.textContent = 0;
  score_p0.textContent = 0;
  score_p1.textContent = 0;
  if (document.querySelector('.player--winner'))
    document
      .querySelector('.player--winner')
      .classList.remove('player--winner');
}
