/**Main menu */

// Third Party Imports
import React, { Fragment } from "react";
import { connect } from "react-redux";

// Local Imports
import { playMusic } from "../../corefunctions";
import classes from "./Menu.module.scss";
import * as actions from "../../store/actions";
import { gameStatuses } from "../../store/reducers/gameStatus";
import NewGameBtn from "./HTMLElements/newGameButton";
import ResumeGameBtn from "./HTMLElements/resumeGameButton";
import * as controlsImg from "../../assets/images/controls.png";

const menu = props => {
  let menuClasses;
  if (props.paused) {
    menuClasses = [classes.Menu, classes.Open].join(" ");
  } else {
    menuClasses = classes.Menu;
  }

  const newGameHandler = () => {
    /**Starts a new game. */
    playMusic()
    props.onNewGame();
    props.onShapeDropped();
  };

  const resumeGameHandler = () => {
    /**Resumes a paused game. */
    playMusic()
    props.onResumeGame();

  }


  const newGameBtn = <NewGameBtn onClickHandler={newGameHandler} />;
  const resumeGameBtn = (
    <ResumeGameBtn
      onClickHandler={resumeGameHandler}
      gameStarted={props.shapesDropped}
    />
  );

  let menuContents;
  switch (props.status) {
    case gameStatuses.GAME_NOT_STARTED:
      menuContents = (
        <Fragment>
          <h1 className={classes.Heading} id='menu-title'>Tetris</h1>
          <img
            className={classes.ControlsImg}
            src={controlsImg}
            alt="Game controls"
          />
          {newGameBtn}
        </Fragment>
      );
      break;
    case gameStatuses.GAME_STARTED:
      menuContents = (
        <Fragment>
          <h1 className={classes.Heading} id='menu-title'>Paused</h1>
          {newGameBtn}
          {resumeGameBtn}
        </Fragment>
      );
      break;
    case gameStatuses.GAME_OVER:
      const beatHighScore =
        props.highScores.filter(highScore => highScore < props.score).length >
        0;

      menuContents = (
        <Fragment>
          <h1 className={classes.Heading} id='menu-title'>
            {beatHighScore ? "New High Score!" : "Game Over"}
          </h1>
          <p className={classes.Score}>
            {props.score}
            <span className={classes.Score__Label}>pts</span>
          </p>
          {newGameBtn}
        </Fragment>
      );
      break;
    default:
      menuContents = null;
  }

  return <div className={menuClasses}>{menuContents}</div>;
};

const mapStateToProps = state => {
  return {
    paused: state.gameStatus.paused,
    shapesDropped: state.gameStatus.shapesDropped,
    gameOver: state.gameStatus.gameOver,
    score: state.gameStatus.score,
    status: state.gameStatus.status,
    highScores: state.gameStatus.highScores
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
