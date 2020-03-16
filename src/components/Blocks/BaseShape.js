/**An abstract class object which contain core functions for a shape. */

import React, { Component } from "react";

class BaseShape extends Component {

    componentDidMount() {
        /**Creates an interval where at iteration, a check to whether the block
         * can continue to drop further will take place, before dropping the block.
         * If this returns false, then stop the sshoetIntervalFunction and update the
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

  moveLeftHandler = () => {
    /**Moves the block left. */
    this._moveBlock("left");
  };

  moveRightHandler = () => {
    /**Moves the block right. */
    this._moveBlock("right");
  };
}

export default BaseShape;
