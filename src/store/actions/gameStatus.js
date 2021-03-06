/**Contains the redux actions related to the game status. These include:
 *  updateScore: Action to update the current score.
 *  gameOver: Action to set the gameOver to true.
 *  pauseGame: Action to pause the game.
 *  resumeGame: Action to resume the game.
 *  incrementShapesDropped: Action to increment shapesDropped.
 *  nextLevel: Action to progress onto the next level.
 *  incrementClearedLines: Action to increment the number of cleared line.
 *  newGame: Action to start a new game.
 *  updateGameStatus: Action to update the current status of the game.
 *    e.g: gameOver, newHighScore, gameNotStarted, etc.
 *  updateHighScores: Action to update high scores.
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

export const newGame = () => {
  /**Action to start a new game. */
  return { type: actionTypes.NEW_GAME };
};

export const updateGameStatus = status => {
  return {
    type: actionTypes.UPDATE_GAME_STATUS,
    status: status
  };
};

export const updateHighScores = highScores => {
  return {
    type: actionTypes.UPDATE_HIGH_SCORES,
    highScores: highScores
  };
};
