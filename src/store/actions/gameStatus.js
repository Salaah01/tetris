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

  return {
    type: actionTypes.GAME_OVER
  };
};
