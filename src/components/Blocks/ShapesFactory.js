/**Shape factory takes an shape name as an argument and returns a new
 * shape component.
 */

// Third Party Imports
import React, { Component } from "react";

// Local Imports
import OShape from "./Shapes/OShape";
import ZShape from "./Shapes/ZShape";
import SShape from "./Shapes/SShape";
import IShape from "./Shapes/IShape";
import TShape from "./Shapes/TShape";
import JShape from "./Shapes/JShape";
import LShape from "./Shapes/LShape";

class ShapeFactory extends Component {
  colours = ["#2ecc71", "#3498db", "#9b59b6", "#e67e22", "#f1c40f", "#e74c3c"];

  block_colour = () =>
    this.colours[Math.floor(Math.random() * this.colours.length)];

  render() {
    const coreProps = {
      col: this.props.col,
      row: this.props.row,
      colour: this.block_colour()
    };
    switch (this.props.shape) {
      case "OShape":
        return <OShape {...coreProps} />;
      case "ZShape":
        return <ZShape {...coreProps} />;

      case "SShape":
        return <SShape {...coreProps} />;

      case "IShape":
        return <IShape {...coreProps} />;

      case "TShape":
        return <TShape {...coreProps} />;

      case "JShape":
        return <JShape {...coreProps} />;

      case "LShape":
        return <LShape {...coreProps} />;

      default:
        console.error("Invalid shape");
    }
  }
}

export default ShapeFactory;
