/**Main menu */

// Third Party Imports
import React from "react";
import { connect } from "react-redux";

// Local Imports
import classes from "./Menu.module.scss";
import * as actions from "../../store/actions";

const menu = props => {
  let menuClasses;
  if (props.paused) {
    menuClasses = [classes.Menu, classes.Open];
  } else {
    menuClasses = [classes.Menu];
  }

  return (
    <div className={menuClasses.join(" ")}>
      <h1 className={classes.Heading}>{props.shapesDropped ? 'Paused': 'Tetris'}</h1>
      <button
        className={`${classes.Btn} ${classes.BtnNewGame}`}
        onClick={props.onNewGame}
      >
        New Game
      </button>
      <button
        className={`${classes.Btn} ${classes.BtnResume}`}
        onClick={props.onResumeGame}
      >
        Resume
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    paused: state.gameStatus.paused,
    shapesDropped: state.gameStatus.shapesDropped
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResumeGame: () => dispatch(actions.resumeGame()),
    onNewGame: () => {
        dispatch(actions.gameStatus_newGame())
        dispatch(actions.gameGrid_newGame())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(menu);
