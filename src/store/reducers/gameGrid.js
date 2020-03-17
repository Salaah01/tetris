/**============================================================================
 * FILENAME: gameGrid.js
 * PURPOSE: Contains the redux reducers related to the game grid.
 *          These include:
 *              updateShapeUnitsCount: Updates the shape units count.
 * ============================================================================
 */

// Third Party Imports

// Local Imports
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../corefunctions";

const initialState = {
  shapeUnitsCount: 0,
  xMax: 6,
  yMax: 20,
  dropBlock: true,
  grid: {}
};

for (let gridRow = 1; gridRow <= initialState.yMax; gridRow++) {
  initialState.grid[`row${gridRow}`] = Array(initialState.xMax).fill(false);
}

const updateShapeUnitsCount = (state, action) => {
  /**Updates the shape units count. */
  return updateObject(state, {
    shapeUnitsCount: action.currentCount + action.shapeSize
  });
};

const updateGrid = (state, action) => {
  // const newGrid = updateObject(state.grid, action.newSubGrid);
  const stateCopy = { ...state };
  const newGrid = { ...state.grid, ...action.newSubGrid };

  stateCopy.grid = newGrid;
  return stateCopy;
};

const startDropNewBlock = state => {
  return updateObject(state, { dropBlock: true });
};

const stopDropNewBlock = state => {
  return updateObject(state, { dropBlock: false });
};

/**Redux reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SHAPE_UNITS_COUNT:
      return updateShapeUnitsCount(state, action);
    case actionTypes.UPDATE_GRID:
      return updateGrid(state, action);
    case actionTypes.START_DROP_NEW_BLOCK:
      return startDropNewBlock(state);
    case actionTypes.STOP_DROP_NEW_BLOCK:
      return stopDropNewBlock(state);
    default:
      return state;
  }
};

export default reducer;
