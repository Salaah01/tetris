// Third Party Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Local Imports
import classes from "./Controls.module.scss";
import "../../assets/SCSS/arrows.scss";
import * as actions from "../../store/actions/index";

class Controls extends Component {
  moveLeftHandler = () => {
    /**Clicks the move left hidden button. */
    if (document.getElementById("move-left-btn")) {
      document.getElementById("move-left-btn").click();
    }
  };

  moveRightHandler = () => {
    /**Clicks the move right hidden button. */
    if (document.getElementById("move-right-btn")) {
      document.getElementById("move-right-btn").click();
    }
  };

  moveDownHandler = () => {
    /**Clicks the move down hidden button. */
    if (document.getElementById("move-down-btn")) {
      document.getElementById("move-down-btn").click();
    }
  };

  rotateHandler = () => {
    /**Clicks the rotate hidden button. */
    if (document.getElementById("rotate-btn")) {
      document.getElementById("rotate-btn").click();
    }
  };

  render() {
    window.addEventListener("keydown", event => {
      event.stopImmediatePropagation();
      if (!this.props.paused) {
        if (event.keyCode === 37 && document.getElementById("move-left-btn")) {
          document.getElementById("ctrl-move-left").click();
        } else if (
          event.keyCode === 39 &&
          document.getElementById("move-right-btn")
        ) {
          document.getElementById("ctrl-move-right").click();
        } else if (
          event.keyCode === 38 &&
          document.getElementById("rotate-btn")
        ) {
          document.getElementById("ctrl-rotate").click();
        } else if (
          event.keyCode === 40 &&
          document.getElementById("move-down-btn")
        ) {
          document.getElementById("ctrl-move-down").click();
        }
      }
    });

    return (
      <div className={classes.Controls}>
        <button
          id="ctrl-move-left"
          onClick={this.moveLeftHandler}
          className={`${classes.Buttons} ${classes.LeftBtn}`}
        >
          <span className="arrow arrow-left"></span>
        </button>
        <button
          id="ctrl-move-right"
          onClick={this.moveRightHandler}
          className={`${classes.Buttons} ${classes.RightBtn}`}
        >
          <span className="arrow arrow-right"></span>
        </button>
        <button
          id="ctrl-move-down"
          onClick={this.moveDownHandler}
          className={`${classes.Buttons} ${classes.DownBtn}`}
        >
          <span className="arrow arrow-down"></span>
        </button>
        <button
          id="ctrl-rotate"
          onClick={this.rotateHandler}
          className={`${classes.Buttons} ${classes.RotateBtn}`}
        >
          <span class="arrow arrow-up curve-right">
            <span class="curve"></span>
          </span>
        </button>
        <button onClick={this.props.pauseGame} className={`${classes.Buttons} ${classes.PauseBtn}`}>Pause Game</button>
        <button onClick={this.props.resumeGame} className={`${classes.Buttons} ${classes.ResumeBtn}`}>Resume Game</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    paused: state.gameStatus.paused,
    shapesDropped: state.gameStatus.shapesDropped
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pauseGame: () => dispatch(actions.pauseGame()),
    resumeGame: () => dispatch(actions.resumeGame())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
