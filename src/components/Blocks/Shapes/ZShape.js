/**A Z shape block along with its controls. */

// Third Party Imports
import React, { Fragment } from "react";
import { connect } from "react-redux";

// Local Imports
import * as actions from "../../../store/actions/index";
import SingleUnit from "../singleUnit";
import BaseShape from "../BaseShape";

class SquareBlock extends BaseShape {
  state = {
    shape: [
      { x: Math.floor(this.props.xMax / 2), y: 1 },
      { x: Math.floor(this.props.xMax / 2) + 1, y: 1 },
      { x: Math.floor(this.props.xMax / 2) + 1, y: 2 },
      { x: Math.floor(this.props.xMax / 2) + 2, y: 2 }
    ],
    shape: [
      { y: Math.floor(this.props.xMax / 2) + 1, x: 2 },
      { y: Math.floor(this.props.xMax / 2) + 2, x: 2 },
      { y: Math.floor(this.props.xMax / 2), x: 1 },
      { y: Math.floor(this.props.xMax / 2) + 1, x: 1 }
    ],
    leftSide: Math.floor(this.props.xMax / 2),
    rightSide: Math.floor(this.props.xMax / 2) + 2,
    currentRow: 2,
    dropping: this.props.dropBlock,
    grid: { ...this.props.grid },
    rotationFlag: false
  };

  bottomBlockUnits = () => [this.state.shape[2], this.state.shape[3]];

  shouldBlockDrop = () => {
    /**Return whether or not the block can drop another level.
     * This is dependant on the yMax limit (the height of the container)
     * and whether there is a block directly below.
     */
    const nextRow = Math.max.apply(
      null,
      this.state.shape.map(elem => elem.y + 1)
    );

    if (nextRow > this.props.yMax) {
      return false;
    } else {
      const nextGridRow = [
        this.state.grid[`row${this.state.currentRow}`],
        this.state.grid[`row${nextRow}`]
      ];

      let nextGridPositions = [
        nextGridRow[0][this.state.shape[0].x - 1],
        nextGridRow[0][this.state.shape[1].x - 1],
        nextGridRow[1][this.state.shape[2].x - 1],
        nextGridRow[1][this.state.shape[3].x - 1]
      ];

      nextGridPositions = this.state.shape.map(
        blockUnit => this.state.grid[`row${blockUnit.y + 1}`][blockUnit.x - 1]
      );

      return nextGridPositions.every(elem => !elem);
    }
  };

  rotationHandler = () => {
    /**Rotates the block 90 degrees if possible. */
    const localShapeState = [];
    for (let elemIdx = 0; elemIdx <= this.state.shape.length; elemIdx++) {
      localShapeState.push({ ...this.state.shape[elemIdx] });
    }
  };

  updateGridHandler = () => {
    /**Updates the grid in th redux store. */

    // Create a copy of the grid
    const newSubGrid = {};
    for (const colName of Object.keys(this.state.grid)) {
      newSubGrid[colName] = [...this.state.grid[colName]];
    }

    // Using the shape state, update the grid values with the colour of a
    // block element occupying the spot.
    for (let unitIdx = 0; unitIdx < this.state.shape.length; unitIdx++) {
      newSubGrid[`row${this.state.shape[unitIdx].y}`][
        this.state.shape[unitIdx].x - 1
      ] = this.props.colour;
    }

    // Find and remove complete lines.
    const grid = this.deleteRows({ ...this.state.grid, ...newSubGrid });

    // Update local state and redux store.
    this.setState(
      props => ({
        grid: {
          ...props.grid,
          ...grid
        }
      }),
      () => this.props.onUpdateGrid(this.state.grid)
    );
  };

  render() {
    /**Renders the component. */
    const blockUnits = this.state.shape.map((blockUnit, idx) => (
      <SingleUnit
        key={idx}
        col={blockUnit.x}
        row={blockUnit.y}
        colour={this.props.colour}
      />
    ));
    return (
      <Fragment>
        <button onClick={this.moveLeftHandler}>Left</button>
        <button onClick={this.moveRightHandler}>Right</button>
        <button onClick={this.rotationHandler}>Rotate</button>
        {blockUnits}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    xMax: state.gameGrid.xMax,
    yMax: state.gameGrid.yMax,
    grid: state.gameGrid.grid,
    dropBlock: state.gameGrid.dropBlock
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateGrid: newSubGrid => dispatch(actions.updateGrid(newSubGrid)),
    onStartDropNewBlock: () => dispatch(actions.startDropNewBlock()),
    onStopDropNewBlock: () => dispatch(actions.stopDropNewBlock()),
    onDeleteRow: () => dispatch(actions.deleteRow())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SquareBlock);
