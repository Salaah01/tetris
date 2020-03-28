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

  const newGameHandler = () => {
    props.onNewGame()
    props.onShapeDropped()
  }

  const newGameBtn = (
    <button
      className={`${classes.Btn} ${classes.BtnNewGame}`}
      onClick={newGameHandler}
    >
      New Game
    </button>
  );

  let resumeBtn = null;
  if (props.shapesDropped) {
    resumeBtn = (
      <button
        className={`${classes.Btn} ${classes.BtnResume}`}
        onClick={props.onResumeGame}
      >
        Resume
      </button>
    );
  }

  return (
    <div className={menuClasses.join(" ")}>
      <h1 className={classes.Heading}>
        {props.shapesDropped ? "Paused" : "Tetris"}
      </h1>
      {newGameBtn}
      {resumeBtn}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    paused: state.gameStatus.paused,
    shapesDropped: state.gameStatus.shapesDropped
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResumeGame: () => dispatch(actions.resumeGame()),
    onNewGame: () => {
      dispatch(actions.gameStatus_newGame());
      dispatch(actions.gameGrid_newGame());
    },
    onShapeDropped: () => dispatch(actions.incrementShapesDropped())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(menu);
