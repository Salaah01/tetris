// Third Party Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Local Imports
import classes from "./GameGrid.module.scss";
import * as actions from "../../store/actions/index";
import ShapeFactory from "../../components/Blocks/ShapesFactory";

const newComponent = props => {
  return <ShapeFactory random />;
};

const l = [];

class GameGrid extends Component {
  materialiseGrid = () => {
    let gridElems = [];

    for (const row of Object.keys(this.props.grid)) {
      for (let col = 1; col <= this.props.grid[row].length + 1; col++) {
        gridElems.push(
          <div
            className={`${classes.Blocks} ${
              this.props.grid[row][col - 1]
                ? classes.Blocks__filled
                : classes.Blocks__unfilled
            }`}
            style={{
              gridRow: "row " + row.split("row")[1],
              gridColumn: "col " + col,
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
      <div
        className={classes.GameGrid}
        style={{
          gridTemplateRows: `repeat(${this.props.yMax}, [row] calc(100%/${this.props.yMax}))`,
          gridTemplateColumns: `repeat(${this.props.xMax}, [col] calc(100% / ${this.props.xMax}))`
        }}
      >
        {this.materialiseGrid()}
        {shape}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dropBlock: state.gameGrid.dropBlock,
    grid: state.gameGrid.grid,
    xMax: state.gameGrid.xMax,
    yMax: state.gameGrid.yMax
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStopDropNewBlock: () => dispatch(actions.stopDropNewBlock()),
    onShapeDropped: () => dispatch(actions.incrementShapesDropped()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameGrid);
