/**Button to start a resume the game when paused.. */

// Third Party Imports
import React from "react";

// Local Imports
import classes from "../Menu.module.scss";

const resumeGameBtn = props => {
  /**Returns a button to resume a game currently paused.
   * Args:
   *  props.onClickHandler: (function) Runs some onClick command when the new
   *    game button is clicked.
   *  props.gameStarted: (any) A value to run a truthy check against to
   *    determine whether the game has already started.
   */

  let resumeBtn = null;
  if (props.gameStarted) {
    resumeBtn = (
      <button
        className={`${classes.Btn} ${classes.BtnResume}`}
        onClick={props.onClickHandler}
      >
        Resume
      </button>
    );
  }
  return resumeBtn;
};

export default resumeGameBtn;
