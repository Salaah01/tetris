// A single block unit

import React from "react";
import classes from "./singleUnit.module.scss";

const blockUnit = props => (
  <div
    className={classes.BlockUnit}
    style={{
      gridRow: `row ${props.row}`,
      gridColumn: `col ${props.col}`,
      backgroundColor: props.colour,
      border: '.5px solid black'
    }}
  ></div>
);

export default blockUnit;
