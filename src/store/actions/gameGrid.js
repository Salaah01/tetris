/**============================================================================
 * FILENAME: gameGrid.js
 * PURPOSE: Contains the redux actions related to the game grid. These include:
 *            updateShapeUnitsCount: updates the state with the current number
 *              of shape units.
 * ============================================================================
 */

// Third Party Imports

// Local Imports
import * as actionTypes from "./actionTypes";

export const updateShapeUnitsCount = (currentCount, shapeSize) => {
  /**Updates the current shape unit/element current count using the current
   * count and the size of the shape.
   * Args:
   *    currentCount: current shape unit/element count (taken from the state).
   *    shapeSize: size of the shape (number of units).
   */
  return {
    type: actionTypes.UPDATE_SHAPE_UNITS_COUNT,
    currentCount: currentCount,
    shapeSize: shapeSize
  };
};

export const updateGrid = newSubGrid => {
  return {
    type: actionTypes.UPDATE_GRID,
    newSubGrid: newSubGrid
  };
};

export const startDropNewBlock = () => {
  return {
    type: actionTypes.START_DROP_NEW_BLOCK
  };
};

export const stopDropNewBlock = () => {
  return {
    type: actionTypes.STOP_DROP_NEW_BLOCK
  };
};
