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
      { x: Math.floor(this.props.xMax / 2) + 1, y: 2 },
      { x: Math.floor(this.props.xMax / 2) + 2, y: 2 }
    ],
    leftSide: Math.floor(this.props.xMax / 2),
    rightSide: Math.floor(this.props.xMax / 2) + 2,
    currentRow: 2,
    dropping: this.props.dropBlock,
    grid: { ...this.props.grid }
  };

  bottomBlockUnits = () => [this.state.shape[2], this.state.shape[3]];

  componentDidMount() {
    /**Creates an interval where at iteration, a check to whether the block
     * can continue to drop further will take place, before dropping the block.
     * If this returns false, then stop the setInterval function and update the
     * state to cause another block to drop.
     */
    const dropBlockInterval = setInterval(() => {
      if (this.shouldBlockDrop()) {
        this.dropBlock();
      } else {
        clearInterval(dropBlockInterval);
        // By quickly changing the state, can force a new update whilst
        // avoiding an if check and dispatching an action to the store.
        this.updateGridHandler();
        this.props.onStopDropNewBlock();
        this.props.onStartDropNewBlock();
      }
    }, 185);
  }

  shouldBlockDrop = () => {
    /**Return whether or not the block can drop another level.
     * This is dependant on the yMax limit (the height of the container)
     * and whether there is a block directly below.
     */
    const nextRow = this.state.currentRow + 1;
    if (nextRow > this.props.yMax) {
      return false;
    } else {
      let nextGridRow = this.state.grid[`row${nextRow}`];
      nextGridRow = [
        this.state.grid[`row${this.state.currentRow}`],
        this.state.grid[`row${nextRow}`]
      ];
      let nextGridPositions = this.bottomBlockUnits().map(
        blockUnit => nextGridRow[blockUnit.x - 1]
      );

      nextGridPositions = [
        nextGridRow[0][this.state.shape[0].x - 1],
        nextGridRow[0][this.state.shape[1].x - 1],
        nextGridRow[1][this.state.shape[2].x - 1],
        nextGridRow[1][this.state.shape[3].x - 1]
      ];

      console.log(nextGridRow, nextGridPositions, this.state.grid);
      return nextGridPositions.every(elem => !elem);
    }
  };

  deleteRows = currentLocalGrid => {
    /**Checks if a row is "full" and is full with block elements, if so
     * remove that row and move each row above, down one row.
     */
    // For safety, a new grid is created though it is likely that the object
    // can be mutated.
    const grid = {
      ...currentLocalGrid
    };
    const gridKeys = Object.keys(grid);
    const reversedKeys = [...gridKeys];
    const rowLength = grid[gridKeys[0]].length;
    reversedKeys.reverse();

    for (let colIdx = 0; colIdx < gridKeys.length; colIdx++) {
      const colName = gridKeys[colIdx];

      // Check if a row contains 0 "false" elements.
      if (!grid[colName].filter(rowElem => rowElem === false).length) {
        const reversedSubKeys = reversedKeys.slice(
          reversedKeys.indexOf(colName)
        );

        for (let rskIdx = 0; rskIdx <= reversedSubKeys.length - 1; rskIdx++) {
          if (reversedSubKeys[rskIdx + 1]) {
            grid[reversedSubKeys[rskIdx]] = [
              ...grid[reversedSubKeys[rskIdx + 1]]
            ];
          } else {
            grid[reversedSubKeys[rskIdx]] = Array(rowLength).fill(false);
          }
        }
      }
    }
    return grid;
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

  dropBlock = () => {
    /**Drops the block another level by updating the local state. */
    this.setState(prevState => ({
      shape: prevState.shape.map(blockUnit => ({
        x: blockUnit.x,
        y: blockUnit.y + 1
      })),
      currentRow: prevState.currentRow + 1
    }));
  };

  moveLeftHandler = () => {
    /**Moves the block left. */
    this._moveBlock("left");
  };

  moveRightHandler = () => {
    /**Moves the block right. */
    this._moveBlock("right");
  };

  _moveBlock = direction => {
    /**Moves the block either left or right if possible.
     * A block will only move in either direction providing there are no
     * obstructions, these include other blocks and walls.
     * Args:
     *    direction: (String['left', 'right]) The direction of movement.
     */
    let stepSizeX;
    if (direction === "left") {
      stepSizeX = -1;
    } else {
      stepSizeX = 1;
    }

    if (
      (this.state.rightSide < this.props.xMax && direction === "right") ||
      (this.state.leftSide > 1 && direction === "left")
    ) {
      // const mapBlockToGrid = this.state.shape.map(blockUnit => ({
      //   x: blockUnit.x + stepSizeX - 1,
      //   y: blockUnit.y
      // }));
      const mapBlockToGrid = this.state.shape.map(
        blockUnit =>
          this.props.grid[`row${blockUnit.y}`][blockUnit.x + stepSizeX - 1]
      );

      // Check if there is a block in the way.
      if (mapBlockToGrid.every(elem => !elem)) {
        this.setState(prevState => ({
          shape: prevState.shape.map(blockUnit => ({
            x: blockUnit.x + stepSizeX,
            y: blockUnit.y
          })),
          leftSide: prevState.leftSide + stepSizeX,
          rightSide: prevState.rightSide + stepSizeX
        }));
      }
    }
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
