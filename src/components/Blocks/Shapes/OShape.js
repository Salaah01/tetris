/**A square block block along with its controls. */

// Third Party Imports
import { connect } from "react-redux";

// Local Imports
import BaseShape, { mapStateToProps, mapDispatchToProps } from "../BaseShape";

class OShape extends BaseShape {
  state = {
    shape: [
      { x: Math.floor(this.props.xMax / 2), y: 1 },
      { x: Math.floor(this.props.xMax / 2) + 1, y: 1 },
      { x: Math.floor(this.props.xMax / 2), y: 2 },
      { x: Math.floor(this.props.xMax / 2) + 1, y: 2 }
    ],
    dropping: this.props.dropBlock,
    grid: { ...this.props.grid },
    rotationDeg: 0
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
        this.state.grid[`row${this.getCurrentRow()}`],
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
}

export default connect(mapStateToProps, mapDispatchToProps)(OShape);
