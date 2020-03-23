// Third Party Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Local Imports
import classes from "./StatusBar.module.scss";
import * as actions from "../../store/actions/index";

class StatusBar extends Component {
  render() {
    return <div><h1>Score: {this.props.score}</h1></div>;
  }
}

const mapStateToProps = state => {
  return {
    score: state.gameStatus.score
  };
};


export default connect(mapStateToProps)(StatusBar);
