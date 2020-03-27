/**Main menu */

// Third Party Imports
import React from "react";
import { connect } from "react-redux";

// Local Imports
import classes from "./Menu.module.scss";
import * as actions from "../../store/actions";

const menu = props => {
  const newGameHandler = () => {
    console.log("new game");
  };

  const resumeGameHandler = () => {
    console.log("resume");
  };

  let menuClasses;
  if (props.show) {
    menuClasses = [classes.Menu, classes.Open];
  } else {
    menuClasses = [classes.Menu, classes.Close];
  }

  return (
    <div className={menuClasses.join(" ")}>
      <button
        className={`${classes.Btn} ${classes.BtnNewGame}`}
        onClick={newGameHandler}
      >
        New Game
      </button>
      <button
        className={`${classes.Btn} ${classes.BtnResume}`}
        onClick={resumeGameHandler}
      >
        Resume
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    resumeGame: () => dispatch(actions.resumeGame())
  };
};

export default connect(null, mapDispatchToProps)(menu);
