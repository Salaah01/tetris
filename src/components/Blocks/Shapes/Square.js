/**A square block block along with its controls. */

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
      { x: Math.floor(this.props.xMax / 2), y: 2 },
      { x: Math.floor(this.props.xMax / 2) + 1, y: 2 }
    ],
    leftSide: Math.floor(this.props.xMax / 2),
    rightSide: Math.floor(this.props.xMax / 2) + 2,
    currentRow: 2,
    dropping: this.props.dropBlock,
    grid: { ...this.props.grid }
  };

  bottomBlockUnits = () => [this.state.shape[2], this.state.shape[3]];

  shouldBlockDrop = () => {
    /**Return whether or not the block can drop another level.
     * This is dependant on the yMax limit (the height of the container)
     * and whether there is a block directly below.
     */
    const nextRow = this.state.currentRow + 1;
    if (nextRow > this.props.yMax) {
      return false;
    } else {
      const nextGridRow = [
        this.state.grid[`row${this.state.currentRow}`],
        this.state.grid[`row${nextRow}`]
      ];

      const nextGridPositions = [
        nextGridRow[0][this.state.shape[0].x - 1],
        nextGridRow[0][this.state.shape[1].x - 1],
        nextGridRow[1][this.state.shape[2].x - 1],
        nextGridRow[1][this.state.shape[3].x - 1]
      ];

      return nextGridPositions.every(elem => !elem);
    }
  };

  updateGridHandler = () => {
    /**Updates the grid in th redux store. */
    const currentRow = this.state.currentRow;
    const row1 = `row${currentRow - 1}`;
    const row2 = `row${currentRow}`;

    const newSubGrid = {
      [row1]: [...this.state.grid[row1]],
      [row2]: [...this.state.grid[row2]]
    };

    newSubGrid[row1] = [
      ...newSubGrid[row1].slice(0, this.state.shape[0].x - 1),
      this.props.colour,
      this.props.colour,
      ...newSubGrid[row1].slice(this.state.shape[1].x)
    ];
    newSubGrid[row2] = [
      ...newSubGrid[row2].slice(0, this.state.shape[2].x - 1),
      this.props.colour,
      this.props.colour,
      ...newSubGrid[row2].slice(this.state.shape[3].x)
    ];

    // Delete rows from the grid where the row is completely filled with
    // block elements.
    const grid = this.deleteRows({
      ...this.state.grid,
      [row1]: newSubGrid[row1],
      [row2]: newSubGrid[row2]
    });

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
