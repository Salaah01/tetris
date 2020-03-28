/**Contains the redux reducers related to the game grid. These include:
 *  updateShapeUnitsCount: Updates the shape units count.
 *  updateGrid: Using an updated sub grid of the current grid, occupied the
 *    elements in the grid placing it with the values in the sub grid.
 *  startDropNewBlock: Start to drop blocks by setting dropBlock to true.
 *  dropDropNewBlock: Stop dropping new blocks by setting dropBlock to false.
 *  newGame: Start a new game by updating the state to the initial state.
 */

// Third Party Imports

// Local Imports
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../corefunctions";

const initialState = {
  shapeUnitsCount: 0,
  xMax: 10,
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
  /**Using an updated sub grid of the current grid, occupied the elements in
   * the grid placing it with the values in the sub grid.
   */
  const stateCopy = { ...state };
  const newGrid = { ...state.grid, ...action.newSubGrid };

  stateCopy.grid = newGrid;
  return stateCopy;
};

const startDropNewBlock = state => {
  /**Start to drop blocks by setting dropBlock to true. */
  return updateObject(state, { dropBlock: true });
};

const stopDropNewBlock = state => {
  /**Stop dropping new blocks by setting dropBlock to false. */
  return updateObject(state, { dropBlock: false });
};

const newGame = state => {
  /**Start a new game by updating the state to the initial state. */
  return updateObject(state, initialState)
}

const reducer = (state = initialState, action) => {
  /**Dispatches the appropiate action depending on the action.type. */
  switch (action.type) {
    case actionTypes.UPDATE_SHAPE_UNITS_COUNT:
      return updateShapeUnitsCount(state, action);
    case actionTypes.UPDATE_GRID:
      return updateGrid(state, action);
    case actionTypes.START_DROP_NEW_BLOCK:
      return startDropNewBlock(state);
    case actionTypes.STOP_DROP_NEW_BLOCK:
      return stopDropNewBlock(state);
    case actionTypes.NEW_GAME:
        return newGame(state)
    default:
      return state;
  }
};

export default reducer;
