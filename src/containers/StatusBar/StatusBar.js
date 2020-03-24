// Third Party Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Local Imports
import classes from "./StatusBar.module.scss";
import * as actions from "../../store/actions/index";

class StatusBar extends Component {
  render() {
    return (
      <div className={classes.StatusBar}>
        <h1>Level: {this.props.level}</h1>
        <h1>Score: {this.props.score}</h1>
        <h1>Lines: {this.props.linesCleared}</h1>
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
