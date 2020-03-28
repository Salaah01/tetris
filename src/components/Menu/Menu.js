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

  let menuClasses;
  if (props.paused) {
    menuClasses = [classes.Menu, classes.Open];
  } else {
    menuClasses = [classes.Menu];
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
        onClick={props.resumeGame}
      >
        Resume
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    paused: state.gameStatus.paused
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resumeGame: () => dispatch(actions.resumeGame()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(menu);
