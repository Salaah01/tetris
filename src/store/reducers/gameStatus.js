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
  gameOver: false,
  playing: true,
  multiplier: 1,
  shapesDropped: 0
};

const updateScore = (state, action) => {
  /** */
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

const nextLevel = state => {
  return updateObject(state, {
    level: state.level + 1,
    multiplier: state.multiplier + state.level / 10
  });
};

const gameOver = state => {
  return updateObject(state, {
    gameOver: true,
    playing: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SCORE:
      return updateScore(state, action);
    case actionTypes.NEXT_LEVEL:
      return nextLevel(state);
    case actionTypes.GAME_OVER:
      return gameOver(state);
    default:
      return state;
  }
};

export default reducer;
