/**Component which renders a semi-transparent grey overlay over the screen. */

// Third Party Imports
import React from "react";
import { connect } from 'react-redux'

// Local Imports
import classes from "./Backdrop.module.scss";

const backdrop = props =>
  /**Renders a semi-transparent grey overlay across the entire screen. */
  props.paused ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

const mapStateToProps = state => {
  return {
    paused: state.gameStatus.paused
  }
}

export default connect(mapStateToProps, null)(backdrop);
