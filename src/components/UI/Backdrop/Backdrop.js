/**Component which renders a semi-transparent grey overlay over the screen. */

// Third Party Imports
import React from "react";

// Local Imports
import classes from "./Backdrop.css";

const backdrop = props =>
  /**Renders a semi-transparent grey overlay across the entire screen. */
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
