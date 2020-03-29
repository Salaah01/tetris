// Third Party Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Local Imports
import classes from "./StatusBar.module.scss";
import * as actions from "../../store/actions/index";

class StatusBar extends Component {
  highScores = { score1: 0, score2: 0, score3: 0 };
  constructor(props) {
    super(props);
    this.updateHighScore();
  }

  updateHighScore = () => {
    const lsHighScores = JSON.parse(localStorage.getItem("highScore"));

    if (lsHighScores) {
      // this.highScores = JSON.parse(localStorage.getItem("highScore"));
      if (lsHighScores.score1) {
        this.highScores.score1 = lsHighScores.score1;
      }
      if (lsHighScores.score2) {
        this.highScores.score2 = lsHighScores.score2;
      }
      if (lsHighScores.score3) {
        this.highScores.score3 = lsHighScores.score3;
      }
    }

    localStorage.setItem("highScore", JSON.stringify(this.highScores));
  };

  render() {
    return (
      <div className={classes.StatusBar}>
        <div className={classes.GameInfo}>
          <p className={classes.BodyText}>Level: {this.props.level}</p>
          <p className={classes.BodyText}>Score: {this.props.score}</p>
          <p className={classes.BodyText}>Lines: {this.props.linesCleared}</p>
        </div>
        <div className={classes.HighScore}>
          <h2 className={classes.HighScore__Heading}>High Scores:</h2>
          <div className={classes.HighScore__Body}>
            <p className={classes.HighScore__ScoreInfo}>
              <span>1:</span>
              <span>{this.highScores.score1}</span>
            </p>
            <p className={classes.HighScore__ScoreInfo}>
              <span>2:</span>
              <span>{this.highScores.score2}</span>
            </p>
            <p className={classes.HighScore__ScoreInfo}>
              <span>3:</span>
              <span>{this.highScores.score3}</span>
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
    linesCleared: state.gameStatus.linesCleared
  };
};

export default connect(mapStateToProps)(StatusBar);
