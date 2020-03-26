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
        <p>Level: {this.props.level}</p>
        <p>Score: {this.props.score}</p>
        <p>Lines: {this.props.linesCleared}</p>
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
