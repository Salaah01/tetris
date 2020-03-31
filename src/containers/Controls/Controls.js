// Third Party Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Local Imports
import classes from "./Controls.module.scss";
import "../../assets/SCSS/arrows.scss";
import * as actions from "../../store/actions/index";
import * as musicMp3 from "../../assets/audio/Tetris_theme.mp3";
import * as musicOgg from "../../assets/audio/Tetris_theme.ogg";
import * as musicM4a from "../../assets/audio/Tetris_theme.m4a";
import { pauseMusic } from "../../corefunctions";
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

  pauseHandler = () => {
    pauseMusic();
    this.props.pauseGame();
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
        <div
          id="ctrl-move-left"
          onClick={this.moveLeftHandler}
          className={classes.Buttons}
        >
          <span>
            <i className="fa fa-arrow-left"></i>
          </span>
        </div>
        <div
          id="ctrl-move-right"
          onClick={this.moveRightHandler}
          className={classes.Buttons}
        >
          <span>
            <i className="fa fa-arrow-right"></i>
          </span>
        </div>
        <div
          id="ctrl-move-down"
          onClick={this.moveDownHandler}
          className={classes.Buttons}
        >
          <span>
            <i className="fa fa-arrow-down"></i>
          </span>
        </div>
        <div
          id="ctrl-rotate"
          onClick={this.rotateHandler}
          className={classes.Buttons}
        >
          <span>
            <i className="fa fa-sync-alt"></i>
          </span>
        </div>
        <div
          onClick={this.pauseHandler}
          className={`${classes.Buttons} ${classes.PauseBtn}`}
        >
          <span>
            <i className="fa fa-pause"></i>
          </span>
        </div>
        <div style={{display: 'none'}}>
          <audio controls loop play id="tetris-music">
            <source src={musicOgg} type="audio/ogg" />
            <source src={musicM4a} type="audio/m4a" />
            <source src={musicMp3} type="audio/mp3" />
          </audio>
        </div>
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
