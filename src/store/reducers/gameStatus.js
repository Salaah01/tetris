/**Contains the redux reducers related to the game grid. These include:
 *  updateScore: Updates the current score. This depends on whether the user
 *    has removed a complete row or manually moved the block down.
 *  nextLevel: Progresses the name to the next level by updating the level
 *    and the score multiplier.
 *  gameOver: Indicates that the game is over by setting playing to false and
 *    gameOver to true.
 *  pauseGame: Pauses the game by setting paused to true.
 *  resumeGame: Resumes the game by setting paused to false.
 *  incrementShapesDropped: Increments the number of shapes dropped.
 *  incrementClearedLines: Increments the number of lines cleared.
 *  newGame: Starts a new game by resetting the state to the initial state.
 *  updateStatus: Updates the game status which explains what state the game
 *    is in. e.g: gameOver, newHighScore, gameNotStarted, etc.
 *  updateHighScores: Action to update high scores.
 */

// Third Party Imports

// Local Imports
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../corefunctions";

export const gameStatuses = {
  /**Objects containing named variable to be used when updating the game
   * status.
   */
  GAME_NOT_STARTED: "GAME_NOT_STARTED",
  GAME_STARTED: "GAME_STARTED",
  GAME_OVER: "GAME_OVER"
};

const getHighScores = () => {
  /**Checks the local storage for high scores. With either return an array of
   * 0s, or an array with the high scores taken form the local storage.
   */
  const highScores = [0, 0, 0];
  const lsHighScores = JSON.parse(localStorage.getItem("highScores"));
  if (lsHighScores) {
    for (let idx = 0; idx <= 2; idx++) {
      if (lsHighScores[idx]) {
        highScores[idx] = Number(lsHighScores[idx]);
      }
    }
  }
  return highScores;
};

const initialState = {
  score: 0,
  level: 1,
  speed: 750,
  linesCleared: 0,
  gameOver: false,
  playing: false,
  multiplier: 1,
  shapesDropped: 0,
  paused: true,
  status: gameStatuses.GAME_NOT_STARTED,
  highScores: getHighScores(),
  blocksForLevelCheckpoints: (() => {
    const blocksArray = [];
    for (let i = 2; i <= 99; i++) {
      blocksArray.push(Math.ceil((i * 5) ** 1.2));
    }
    return blocksArray;
  })()
};

const updateScore = (state, action) => {
  /** Updates the score. */
  let baseScore = 1;

  if (action.triggerReason === "deleteRow") {
    baseScore = action.xMax;
  } else if (action.triggerReason === "dropBlock") {
    baseScore = 1;
  } else {
    throw Error(
      "invalid argument for action.triggerReason. Valid arguments are deleteRow, dropBlow."
    );
  }
  return updateObject(state, {
    score: Math.ceil(state.score + baseScore * state.multiplier)
  });
};

const nextLevel = (state, action) => {
  /**Progress onto the next level if action.shapesDropped is equal to the first
   * element in blocksForLevelCheckpoints. As part of progressing to the next
   * level the speed is also updated.
   */
  if (action.shapesDropped === state.blocksForLevelCheckpoints[0]) {
    return updateObject(state, {
      level: state.level + 1,
      multiplier: state.multiplier + state.level / 10,
      speed: Math.max(Math.floor(state.speed / (1 + state.level / 100)), 0),
      speed: Math.max(Math.floor(state.speed / (1 + state.level  ** (1  + state.level / 10) / 100)), 0),
      blocksForLevelCheckpoints: state.blocksForLevelCheckpoints.slice(1)
    });
  } else {
    return state;
  }
};

const gameOver = state => {
  /**Tells the system that it is game over and update the local storage if the
   * user beats a high score.
   */

  // If gameOver is already true, then avoid updating the store.
  if (state.gameOver) {
    return state;
  }

  let newHighScores = [...state.highScores];

  if (state.score > newHighScores[0]) {
    newHighScores = [state.score, newHighScores[0], newHighScores[1]];
  } else if (state.score > newHighScores[1]) {
    newHighScores = [newHighScores[0], state.score, newHighScores[1]];
  } else if (state.score > newHighScores[2]) {
    newHighScores = [newHighScores[0], newHighScores[1], state.score];
  }

  localStorage.setItem("highScores", JSON.stringify(newHighScores));

  return updateObject(state, {
    gameOver: true,
    playing: false,
    paused: true,
    status: gameStatuses.GAME_OVER,
    highScores: newHighScores
  });
};

const pauseGame = state => {
  /**Pauses the game. */
  return updateObject(state, { paused: true });
};

const resumeGame = state => {
  /**Resumes the game. */
  return updateObject(state, { paused: false });
};

const incrementShapesDropped = state => {
  /**Increments shapesDropped. */
  return updateObject(state, { shapesDropped: state.shapesDropped + 1 });
};

const incrementClearedLines = state => {
  /**Increments linesCleared. */
  return updateObject(state, { linesCleared: state.linesCleared + 1 });
};

const newGame = state => {
  /**Start a new game by updating the state to the initial state. */
  return updateObject(state, {
    ...initialState,
    playing: true,
    paused: false,
    highScores: getHighScores(),
    status: gameStatuses.GAME_STARTED
  });
};

const updateGameStatus = (state, action) => {
  /**Updates the game status with a new status. */
  return updateObject(state, { status: action.status });
};

const updateHighScores = (state, action) => {
  /**Updates the high scores. */
  return updateObject(state, { highScores: action.highScores });
};

const reducer = (state = initialState, action) => {
  /**Dispatches the appropriate action depending on the action.type. */
  switch (action.type) {
    case actionTypes.UPDATE_SCORE:
      return updateScore(state, action);
    case actionTypes.NEXT_LEVEL:
      return nextLevel(state, action);
    case actionTypes.GAME_OVER:
      return gameOver(state);
    case actionTypes.PAUSE_GAME:
      return pauseGame(state);
    case actionTypes.RESUME_GAME:
      return resumeGame(state);
    case actionTypes.INCREMENT_SHAPES_DROPPED:
      return incrementShapesDropped(state);
    case actionTypes.INCREMENT_CLEARED_LINES:
      return incrementClearedLines(state);
    case actionTypes.NEW_GAME:
      return newGame(state);
    case actionTypes.UPDATE_GAME_STATUS:
      return updateGameStatus(state, action);
    case actionTypes.UPDATE_HIGH_SCORES:
      return updateHighScores(state, action);
    default:
      return state;
  }
};

export default reducer;
