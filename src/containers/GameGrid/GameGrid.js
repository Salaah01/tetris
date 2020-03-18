// Third Party Imports
import React, { Component } from "react";
import classes from "./GameGrid.module.scss";

// Local Imports
import * as actions from "../../store/actions/index";
import ShapeFactory from "../../components/Blocks/ShapesFactory";
import { connect } from "react-redux";

const newComponent = props => {
  return <ShapeFactory shape="FlippedZ" />;
};

const l = [];

class GameGrid extends Component {
  materialiseGrid = () => {
    let gridElems = [];
    for (const row of Object.keys(this.props.grid)) {
      for (let col = 1; col <= this.props.grid[row].length + 1; col++) {
        gridElems.push(
          <div
            style={{
              gridRow: "row " + row.split("row")[1],
              gridColumn: "col " + col,
              display: this.props.grid[row][col - 1] ? "Block" : "None",
              height: "100%",
              width: "100%",
              backgroundColor: this.props.grid[row][col - 1]
                ? this.props.grid[row][col - 1]
                : "transparent"
            }}
          />
        );
      }
    }
    return gridElems;
  };


  newComponent = () => {
    return <ShapeFactory shape="ZShape" />;
  };

  render() {
    let shape = l;
    if (this.props.dropBlock) {
      shape = newComponent();
    }

    return (
      <div className={classes.GameGrid}>
        {this.materialiseGrid()}
        {shape}
      </div>
    );
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
