// Third Party Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import Radium from "radium";

// Local Imports
import classes from "./GameGrid.module.scss";
import * as actions from "../../store/actions/index";
import ShapeFactory from "../../components/Blocks/ShapesFactory";

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
    return <ShapeFactory random />;
  };

  render() {
    let shape = l;
    if (this.props.dropBlock && !this.props.gameOver) {
      shape = this.newComponent();
    }

    const style = {
      gridTemplateRows: `repeat(${this.props.yMax}, [row] calc(100%/${this.props.yMax}))`,
      gridTemplateColumns: `repeat(${this.props.xMax}, [col] calc(100% / ${this.props.xMax}))`,
      // width: `${45 * this.props.xMax}px`,
      // height: `${33.75 * this.props.yMax}px`,
      // width: `${5.3 * this.props.xMax}vh`,
      // height: `${4 * this.props.yMax}vh`

    };

    return (
      <div className={classes.GameGrid} style={style}>
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
    yMax: state.gameGrid.yMax,
    gameOver: state.gameStatus.gameOver
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStopDropNewBlock: () => dispatch(actions.stopDropNewBlock()),
    onShapeDropped: () => dispatch(actions.incrementShapesDropped())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(GameGrid));
