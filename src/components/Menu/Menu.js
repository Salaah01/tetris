/**Main menu */

// Third Party Imports
import React, { Fragment } from "react";
import { connect } from "react-redux";

// Local Imports
import classes from "./Menu.module.scss";
import * as actions from "../../store/actions";
import { gameStatuses } from "../../store/reducers/gameStatus";
import NewGameBtn from "./HTMLElements/newGameButton";
import ResumeGameBtn from "./HTMLElements/resumeGameButton";

const menu = props => {
  let menuClasses;
  if (props.paused) {
    menuClasses = [classes.Menu, classes.Open].join(" ");
  } else {
    menuClasses = classes.Menu;
  }

  const newGameHandler = () => {
    props.onNewGame();
    props.onShapeDropped();
    props.onStatusUpdate(gameStatuses.GAME_STARTED);
  };

  const newGameBtn = <NewGameBtn onClickHandler={newGameHandler} />;
  const resumeGameBtn = (
    <ResumeGameBtn
      onClickHandler={props.onResumeGame}
      gameStarted={props.shapesDropped}
    />
  );

  let menuContents;
  switch (props.status) {
    case gameStatuses.GAME_NOT_STARTED:
      menuContents = (
        <Fragment>
          <h1 className={classes.Heading}>Tetris</h1>
          {newGameBtn}
        </Fragment>
      );
      break;
    case gameStatuses.GAME_STARTED:
      menuContents = (
        <Fragment>
          <h1 className={classes.Heading}>Paused</h1>
          {newGameBtn}
          {resumeGameBtn}
        </Fragment>
      );
      break;
    case gameStatuses.GAME_OVER:
      // Update high score and check if has beat any high scores.
      let beatHighScore = false;
      const highScores = JSON.parse(localStorage.getItem("highScore"));
      if (props.score > Number(highScores.score1)) {
        highScores.score3 = highScores.score2;
        highScores.score2 = highScores.score1;
        highScores.score1 = props.score;
        beatHighScore = true;
      } else if (props.score > Number(highScores.score2)) {
        highScores.score3 = highScores.score2;
        highScores.score2 = props.score;
        beatHighScore = true;
      } else if (props.score > Number(highScores.score3)) {
        highScores.score3 = props.score;
        beatHighScore = true;
      }
      // Update the local storage if a high score has been beat.
      if (beatHighScore) {
        localStorage.setItem("highScore", JSON.stringify(highScores));
      }

      menuContents = (
        <Fragment>
          <h1 className={classes.Heading}>
            {beatHighScore ? "New High Score!" : "Game Over"}
          </h1>
          <p>Score: {props.score}</p>
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
    status: state.gameStatus.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResumeGame: () => dispatch(actions.resumeGame()),
    onNewGame: () => {
      dispatch(actions.gameStatus_newGame());
      dispatch(actions.gameGrid_newGame());
    },
    onShapeDropped: () => dispatch(actions.incrementShapesDropped()),
    onStatusUpdate: newStatus => dispatch(actions.updateGameStatus(newStatus))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(menu);
