// Third Party Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import Radium from "radium";

// Local Imports
import classes from "./StatusBar.module.scss";
import * as actions from "../../store/actions/index";

class StatusBar extends Component {
  render() {
    const style = {
      maxWidth: `${5.3 * this.props.xMax}vh`,
      width: '100%',
      marginLeft: '-1rem'

    };

    return (
      <div className={classes.StatusBar} style={style}>
        <div className={classes.GameInfo}>
          <h2 className={classes.GameInfo__Heading}>Tetris</h2>
          <p className={classes.GameInfo__Body}>Level: {this.props.level}</p>
          <p className={classes.GameInfo__Body}>Score: {this.props.score}</p>
          <p className={classes.GameInfo__Body}>Lines: {this.props.linesCleared}</p>
        </div>
        <div className={classes.HighScore}>
          <h2 className={classes.HighScore__Heading}>High Scores:</h2>
          <div className={classes.HighScore__Body}>
            <p className={classes.HighScore__ScoreInfo}>
              <span>1:</span>
              <span>{this.props.highScores[0]}</span>
            </p>
            <p className={classes.HighScore__ScoreInfo}>
              <span>2:</span>
              <span>{this.props.highScores[1]}</span>
            </p>
            <p className={classes.HighScore__ScoreInfo}>
              <span>3:</span>
              <span>{this.props.highScores[2]}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    score: state.gameStatus.score,
    level: state.gameStatus.level,
    linesCleared: state.gameStatus.linesCleared,
    highScores: state.gameStatus.highScores,
    xMax: state.gameGrid.xMax
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateHighScore: highScores =>
      dispatch(actions.updateHighScores(highScores))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(StatusBar));
