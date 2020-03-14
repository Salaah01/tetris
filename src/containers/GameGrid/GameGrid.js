// Third Party Imports
import React, { Component } from "react";
import classes from "./GameGrid.module.scss";

// Local Imports
import * as actions from "../../store/actions/index";
import ShapeFactory from "../../components/Blocks/ShapesFactory";
import { connect } from "react-redux";

const newComponent = props => {
  return <ShapeFactory shape="Square" />;
};

const l = [];

class GameGrid extends Component {

  materialiseGrid = () => {
    let gridElems = [];
    for (let row of Object.keys(this.props.grid)) {
      for (let col = 1; col <= this.props.grid[row].length + 1; col++) {
        gridElems.push(
          <div
            style={{
              gridRow: "row " + row.split("row")[1],
              gridColumn: "col " + col,
              display: this.props.grid[row][col-1] ? "Block" : "None",
              height: "100%",
              width: "100%",
              backgroundColor: this.props.grid[row][col-1]
                ? this.props.grid[row][col-1]
                : "transparent"
            }}
          />
        );
      }
    }

    return gridElems
  };

  deleteRow = () => {
    for (let row of Object.keys(this.props.grid)) {
      // Check that a no elements in a row are false.
      if (!this.props.grid[row].filter(elem => elem === false).length) {
         console.log(1)
      }
    }
  }

  newComponent = () => {
    return <ShapeFactory shape="Square" />;
  };

  render() {
    let shape = l;
    if (this.props.dropBlock) {
      // l.push(newComponent());
      shape = newComponent();
    }
    const gridElements = this.materialiseGrid()

  return <div className={classes.GameGrid}>{this.materialiseGrid()}{shape}</div>;
  }
}

const mapStateToProps = state => {
  return {
    dropBlock: state.gameGrid.dropBlock,
    grid: state.gameGrid.grid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStopDropNewBlock: () => dispatch(actions.stopDropNewBlock())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameGrid);
