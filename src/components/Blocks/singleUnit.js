// A single block unit

import React from "react";
import classes from "./singleUnit.module.scss";

const blockUnit = props => (
  <div
    className={classes.BlockUnit}
    style={{ gridRow: `row ${props.row}`, gridColumn: `col ${props.col}` }}
  ></div>
);

export default blockUnit;
