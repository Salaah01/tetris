/* A square block block along with its controls. */

// Third Party Imports
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// Local Imports
import * as actions from "../../../store/actions/index";
import SingleUnit from "../../Blocks/singleUnit";

class SquareBlock extends Component {
  state = {
    topLeft: { x: Math.floor(this.props.xMax / 2), y: 1 },
    topRight: { x: Math.floor(this.props.xMax / 2) + 1, y: 1 },
    bottomLeft: { x: Math.floor(this.props.xMax / 2), y: 2 },
    bottomRight: { x: Math.floor(this.props.xMax / 2) + 1, y: 2 },
    currentRow: 2,
    xLeft: Math.floor(this.props.xMax / 2),
    xRight: Math.floor(this.props.xMax / 2) + 1,
    dropping: this.props.dropBlock,
    grid: { ...this.props.grid }
  };

  componentDidMount() {
    /**Creates an interval where at iteration, a check to whether the block
     * can continue to drop further will take place, before dropping the block.
     * If this returns false, then stop the setIntervalFunction and update the
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
      const nextGridRow = this.state.grid[`row${nextRow}`];
      const nextGridColumns = nextGridRow.slice(
        this.state.topLeft.x - 1,
        this.state.topRight.x
      );
      return nextGridColumns.every(elem => !elem);
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
        console.log(reversedSubKeys);

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
      ...newSubGrid[row1].slice(0, this.state.topLeft.x - 1),
      this.props.colour,
      this.props.colour,
      ...newSubGrid[row1].slice(this.state.topRight.x)
    ];
    newSubGrid[row2] = [
      ...newSubGrid[row2].slice(0, this.state.bottomLeft.x - 1),
      this.props.colour,
      this.props.colour,
      ...newSubGrid[row2].slice(this.state.bottomRight.x)
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
      topLeft: { x: prevState.topLeft.x, y: prevState.topLeft.y + 1 },
      topRight: { x: prevState.topRight.x, y: prevState.topRight.y + 1 },
      bottomLeft: { x: prevState.bottomLeft.x, y: prevState.bottomLeft.y + 1 },
      bottomRight: {
        x: prevState.bottomRight.x,
        y: prevState.bottomRight.y + 1
      },
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
      (this.state.topRight.x < this.props.xMax && direction === "right") ||
      (this.state.topLeft.x > 1 && direction === "left")
    ) {
      // Check if there is a block in the way.
      const mapBlockToGrid = [
        this.props.grid[`row${this.state.topLeft.y}`][
          this.state.topLeft.x + stepSizeX - 1
        ],
        this.props.grid[`row${this.state.topRight.y}`][
          this.state.topRight.x + stepSizeX - 1
        ],
        this.props.grid[`row${this.state.bottomLeft.y}`][
          this.state.bottomLeft.x + stepSizeX - 1
        ],
        this.props.grid[`row${this.state.bottomRight.y}`][
          this.state.bottomRight.x + stepSizeX - 1
        ]
      ];

      if (mapBlockToGrid.every(elem => !elem)) {
        this.setState(prevState => ({
          topLeft: {
            x: prevState.topLeft.x + stepSizeX,
            y: prevState.topLeft.y
          },
          topRight: {
            x: prevState.topRight.x + stepSizeX,
            y: prevState.topRight.y
          },
          bottomLeft: {
            x: prevState.bottomLeft.x + stepSizeX,
            y: prevState.bottomLeft.y
          },
          bottomRight: {
            x: prevState.bottomRight.x + stepSizeX,
            y: prevState.bottomRight.y
          }
        }));
      }
    }
  };

  render() {
    /**Renders the component. */
    return (
      <Fragment>
        <button onClick={this.moveLeftHandler}>Left</button>
        <button onClick={this.moveRightHandler}>Right</button>
        <SingleUnit
          col={this.state.topRight.x}
          row={this.state.topRight.y}
          unit="topLeft"
          colour={this.props.colour}
        />
        <SingleUnit
          col={this.state.topLeft.x}
          row={this.state.topRight.y}
          unit="topRight"
          colour={this.props.colour}
        />
        <SingleUnit
          col={this.state.bottomLeft.x}
          row={this.state.bottomLeft.y}
          unit="bottomLeft"
          colour={this.props.colour}
        />
        <SingleUnit
          col={this.state.bottomRight.x}
          row={this.state.bottomRight.y}
          unit="bottomRight"
          colour={this.props.colour}
        />
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
