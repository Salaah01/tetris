/**Contains the redux actions related to the game status. These include:
 *  updateScore: Action to update the current score.
 */

// Third Party Imports

// Local Imports
import * as actionTypes from "./actionTypes";

export const updateScore = (triggerReason, xMax) => {
  /**Action to update the current score.
   * Args:
   *  triggerReason: (str[deleteRow|dropBlock]) A reason which will advise why
   *    the score is being updated.
   */
  return {
    type: actionTypes.UPDATE_SCORE,
    triggerReason: triggerReason,
    xMax: xMax
  };
};

export const gameOver = () => {
  /**Action to indicate game over. */
  return { type: actionTypes.GAME_OVER };
};

export const pauseGame = () => {
  /**Action to pause the game. */
  return { type: actionTypes.PAUSE_GAME };
};

export const resumeGame = () => {
  /**Action to resume the game. */
  return { type: actionTypes.RESUME_GAME };
};

export const incrementShapesDropped = () => {
  /**Action to increment shapes dropped. */
  return { type: actionTypes.INCREMENT_SHAPES_DROPPED };
};

export const nextLevel = shapesDropped => {
  /**Action to move onto the next level. */
  return { type: actionTypes.NEXT_LEVEL, shapesDropped: shapesDropped };
};

export const incrementClearedLines = () => {
  /**Action to increment the number of lines cleared. */
  return { type: actionTypes.INCREMENT_CLEARED_LINES };
};
