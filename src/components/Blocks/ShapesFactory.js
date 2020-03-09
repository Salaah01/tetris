/**Shape factory takes an shape name as an argument and returns a new
 * shape component.
 */

// Third Party Imports
import React, { Component } from "react";

// Local Imports
import Square from "./Shapes/Square";

class ShapeFactory extends Component {
  render() {
    switch (this.props.shape) {
      case "Square":
        return <Square />;
      default:
        console.error("Invalid shape");
    }
  }
}

export default ShapeFactory;
