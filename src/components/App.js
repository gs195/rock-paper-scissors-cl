const Game = require("./Game");
const Player = require("./Player");
const { displayMessage } = require("../common/Utils");
const requestValidInput = require("../common/RequestValidInput");
const {
  COMPUTER,
  BLANK_LINE,
  PLAYER_TYPE,
  GAME_END_MESSAGE,
  GAME_START_MESSAGE,
  REPEAT_GAME_MESSAGE,
  USER_INPUT_END_GAME,
  VALIDATION_SUCCESS_PHRASE,
  REQUEST_PLAYER_TYPE_MESSAGE,
  MAX_NUMBER_OF_GAME_ROUNDS,
  MAX_ROUNDS_TERMINATION_MESSAGE,
  USER_CONFIRMATION_RESPONSE_TYPE
} = require("../common/Constants");

const playGame = async () => {
  const currentGame = new Game();

  displayMessage(GAME_START_MESSAGE);
  displayMessage(BLANK_LINE);

  let playerType = await requestValidInput(
    PLAYER_TYPE,
    REQUEST_PLAYER_TYPE_MESSAGE
  );

  displayMessage(`${VALIDATION_SUCCESS_PHRASE} ${playerType}`);
  displayMessage(BLANK_LINE);

  const playerA = new Player(COMPUTER);
  const playerB = new Player(playerType);

  let moveA = "";
  let moveB = "";
  let winner = "";
  let gameRounds = 0;

  while (!winner) {
    if (gameRounds >= MAX_NUMBER_OF_GAME_ROUNDS) {
      displayMessage(MAX_ROUNDS_TERMINATION_MESSAGE);
      break;
    }
    moveA = await playerA.makeMove();
    moveB = await playerB.makeMove();
    displayMessage(
      `(Player 2) ${playerType === COMPUTER ? COMPUTER : "you"} chose ${moveB}`
    );
    displayMessage(`(Player 1) ${COMPUTER} chose ${moveA}`);
    displayMessage(BLANK_LINE);
    winner = currentGame.getWinner({ playerA: moveA, playerB: moveB });
    gameRounds += 1;
  }

  currentGame.announceWinner(playerType);
  return winner;
};

const playGameLoop = async () => {
  let end = false;
  while (!end) {
    await playGame();
    displayMessage(BLANK_LINE);
    const userResponse = await requestValidInput(
      USER_CONFIRMATION_RESPONSE_TYPE,
      REPEAT_GAME_MESSAGE
    );
    if (userResponse === USER_INPUT_END_GAME) {
      end = true;
    }
  }
  displayMessage(GAME_END_MESSAGE);
  return;
};

module.exports = { playGameLoop, playGame };
