/**Shape factory takes an shape name as an argument and returns a new
 * shape component.
 */

// Third Party Imports
import React, { Component } from "react";

// Local Imports
import Square from "./Shapes/Square";

class ShapeFactory extends Component {
  colours = ["#2ecc71", "#3498db", "#9b59b6", "#e67e22", "#f1c40f", "#e74c3c"];

  block_colour = () =>
    this.colours[Math.floor(Math.random() * this.colours.length)];

  render() {
    switch (this.props.shape) {
      case "Square":
        return (
          <Square
            col={this.props.col}
            row={this.props.row}
            colour={this.block_colour()}
          />
        );
      default:
        console.error("Invalid shape");
    }
  }
}

export default ShapeFactory;
