/**Contains the redux reducers related to the game grid. These include:
 *  updateScore: Action to update the current score.
 *  nextLevel: Progresses the name to the next level by updating the level
 *    and the score multiplier.
 */

// Third Party Imports

// Local Imports
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../corefunctions";

const initialState = {
  score: 0,
  level: 1,
  blocksPlayed: 0,
  speed: 750,
  gameOver: false,
  playing: true,
  multiplier: 1,
  shapesDropped: 0,
  blocksForLevelCheckpoints: [],
  paused: false
};

// Build blocksForLevelCheckpoints
for (let i = 2; i <= 99; i++) {
  initialState.blocksForLevelCheckpoints.push(Math.ceil((i * 5) ** 1.2));
}

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
  console.log(action.shapesDropped, state.blocksForLevelCheckpoints[0]);
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
  return updateObject(state, {
    gameOver: true,
    playing: false
  });
};

const pauseGame = state => {
  return updateObject(state, { paused: true });
};

const resumeGame = state => {
  return updateObject(state, { paused: false });
};

const incrementShapesDropped = state => {
  return updateObject(state, { shapesDropped: state.shapesDropped + 1 });
};

const reducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default reducer;
