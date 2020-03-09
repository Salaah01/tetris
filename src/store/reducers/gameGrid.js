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
import { updateObject } from "../../shared/utility";

const initialState = {
  shapeUnitsCount: 0
};

const updateShapeUnitsCount = (state, action) => {
  /**Updates the shape units count. */
  return updateObject(state, {
    shapeUnitsCount: action.currentCount + action.shapeSize
  });
};

const reducer = (state = initialState, action) => {
  /**Redux reducer */
  switch (action.type) {
    case actionTypes.UPDATE_SHAPE_ELEM_COUNT:
      return updateShapeUnitsCount(state, action);
    default:
      return state;
  }
};

export default reducer;
