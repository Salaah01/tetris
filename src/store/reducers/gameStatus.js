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
 *  newGame: Starts a new game by resetting the state to the intial state.
 */

// Third Party Imports

// Local Imports
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../corefunctions";

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
  blocksForLevelCheckpoints: (() => {
    const blocksArray = []
    for (let i = 2; i <= 99; i++) {
      blocksArray.push(Math.ceil((i * 5) ** 1.2));
    }
    return blocksArray
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
   * element in blocksForLevelCheckpoints.
   */
  if (action.shapesDropped === state.blocksForLevelCheckpoints[0]) {
    return updateObject(state, {
      level: state.level + 1,
      multiplier: state.multiplier + state.level / 10,
      speed: Math.max(Math.floor(state.speed / (1 + state.level / 100)), 0),
      blocksForLevelCheckpoints: state.blocksForLevelCheckpoints.slice(1)
    });
  } else {
    return state;
  }
};

const gameOver = state => {
  /**Tells the system that it is game over. */
  return updateObject(state, {
    gameOver: true,
    playing: false
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
  /**Increaments linesCleared. */
  return updateObject(state, { linesCleared: state.linesCleared + 1 });
};

const newGame = state => {
  /**Start a new game by updating the state to the initial state. */
  return updateObject(state, {...initialState, playing: true, paused: false})
}

const reducer = (state = initialState, action) => {
  /**Dispatches the appropiate action depending on the action.type. */
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
      return newGame(state)
    default:
      return state;
  }
};

export default reducer;
