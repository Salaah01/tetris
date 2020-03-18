/**An abstract class object which contain core functions for a shape. */

import React, { Component } from "react";

class BaseShape extends Component {
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

  bottomBlockUnits = () => {
    /**Abstract method */
    throw ReferenceError(
      "Implement bottomBlockUnits method in inheriting class."
    );
  };

  shouldBlockDrop = () => {
    /**Abstract method */
    throw ReferenceError(
      "Implement shouldBlockDrop method in the inheriting class"
    );
  };

  updateGridHandler = () => {
    /**Abstract method */
    throw ReferenceError(
      "Implement updateGridHandler method in the inheriting class with a call to deleteRows() to handle row deletions."
    );
  };

  rotationHandler = () => {
    /**Method by default will not do anything, for components that need
     * rotation to handled, this module needs to be overwritten.
     */
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

  gridPositionsFree = (shape, gridLocation) => {
    /**Using a list of objects containing x and y co-ordinates, find if those
     * positions are all available in the grid.
     *
     * Args:
     *    shape: (list) containing objects with x an y positions representing
     *      row and column numbers on a grid.
     *    gridLocation (string ['local state', redux store']) Indicate where
     *      the grid is stored to be compared against.
     */
    let grid;
    // let subGrid;
    if (gridLocation === "local state") {
      grid = this.state.grid
    } else if (gridLocation === "redux store") {
      grid = this.props.grid
    } else {
      throw TypeError("gridLocation must equal 'local state' or 'redux store'");
    }

    const subGrid = shape.map(elem => grid[`row${elem.y}`][elem.x - 1]);
    return subGrid
      .map(elem => !elem && elem !== undefined)
      .reduce((andTotal, currentElem) => andTotal && currentElem, true);
  };

  getShapeRightSide = () => {
    /**Finds the far right side of the shape (x value.) */
    return Math.max.apply(
      null,
      this.state.shape.map(elem => elem.x)
    );
  };

  getShapeLeftSide = () => {
    /**Finds the far right side of the shape (x value.) */
    return Math.min.apply(
      null,
      this.state.shape.map(elem => elem.x)
    );
  };

  getCurrentRow = () => {
    /**Returns the current row (closest to bottom) of the shape. */
    return Math.max.apply(
      null,
      this.state.shape.map(elem => elem.y)
    );
  };

  dropBlock = () => {
    /**Drops the block another level by updating the local state. */
    this.setState(prevState => ({
      shape: prevState.shape.map(blockUnit => ({
        x: blockUnit.x,
        y: blockUnit.y + 1
      }))
    }));
  };

  updateGridHandler = () => {
    /**Updates the grid in the redux store and local state. */

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
      (this.getShapeRightSide() < this.props.xMax && direction === "right") ||
      (this.getShapeLeftSide() > 1 && direction === "left")
    ) {
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
}

export default BaseShape;
