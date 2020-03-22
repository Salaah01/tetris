/**Contains the redux actions related to the game grid. These include:
 *  updateShapeUnitsCount: updates the state with the current number of shape
 *    units.
 *  updateGrid: Updates the grid by replacing certain elements in the grid
 *     using values set in a sub grid.
 *  startDropNewBlock: Action to start dropping new blocks.
 *  stopDropNewBlock: Action to stop dropping new blocks.
 *  deleteRow: Action to delete a row.
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
  /**Updates the grid with elements defined in newSubGrid.
   * Args:
   *    newSubGrid: a sub grid of the main grid which represents new grid
   *      elements for the grid to be updated with.
   */
  return {
    type: actionTypes.UPDATE_GRID,
    newSubGrid: newSubGrid
  };
};

export const startDropNewBlock = () => {
  /**Action to start dropping new blocks. */
  return {
    type: actionTypes.START_DROP_NEW_BLOCK
  };
};

export const stopDropNewBlock = () => {
  /**Action to stop dropping new blocks. */
  return {
    type: actionTypes.STOP_DROP_NEW_BLOCK
  };
};

export const deleteRow = () => {
  /**Action to delete a row. */
  return {
    type: actionTypes.DELETE_ROW
  };
};
