/**Button to start a new game. */

// Third Party Imports
import React from "react";

// Local Imports
import classes from "../Menu.module.scss";

const newGameBtn = props => {
  /**Returns a button to start a new game.
   * Args:
   *  props.onClickHandler: (function) Runs some onClick command when the new
   *    game button is clicked.
   */
  return (
    <button
      className={`${classes.Btn} ${classes.BtnNewGame}`}
      onClick={props.onClickHandler}
    >
      New Game
    </button>
  );
};

export default newGameBtn;
