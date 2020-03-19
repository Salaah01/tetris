/**A Z shape block along with its controls. */

// Third Party Imports
import { connect } from "react-redux";

// Local Imports
import BaseShape, { mapStateToProps, mapDispatchToProps } from "../BaseShape";

class JShape extends BaseShape {
  state = {
    shape: [
      { x: Math.floor(this.props.xMax / 2), y: 1 },
      { x: Math.floor(this.props.xMax / 2), y: 2 },
      { x: Math.floor(this.props.xMax / 2), y: 3 },
      { x: Math.floor(this.props.xMax / 2) - 1, y: 3 }
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

  rotationHandler = () => {
    /**Rotates the block 90 degrees if possible. */
    const localShapeState = [];
    for (let elemIdx = 0; elemIdx < this.state.shape.length; elemIdx++) {
      localShapeState.push({ ...this.state.shape[elemIdx] });
    }

    switch (this.state.rotationDeg) {
      case 0:
        localShapeState[0].x += 1;
        localShapeState[0].y += 2;
        localShapeState[1].y += 1;
        localShapeState[2].x -= 1;
        localShapeState[3].y -= 1;

        if (this.gridPositionsFree(localShapeState, "local state")) {
          this.setState({
            shape: localShapeState,
            rotationDeg: 90
          });
        }

        break;

      case 90:
        localShapeState[0].x -= 1;
        localShapeState[1].y -= 1;
        localShapeState[2].x += 1;
        localShapeState[2].y -= 2;
        localShapeState[3].x += 2;
        localShapeState[3].y -= 1;

        if (this.gridPositionsFree(localShapeState, "local state")) {
          this.setState({
            shape: localShapeState,
            rotationDeg: 180
          });
        }
        break;

      case 180:
        localShapeState[0].x -= 1;
        localShapeState[0].y -= 1;
        localShapeState[2].x += 1;
        localShapeState[2].y += 1;
        localShapeState[3].y += 2;

        if (this.gridPositionsFree(localShapeState, "local state")) {
          this.setState({
            shape: localShapeState,
            rotationDeg: 270
          });
        }
        break;

      case 270:
        localShapeState[0].x += 1;
        localShapeState[0].y -= 1;
        localShapeState[2].x -= 1;
        localShapeState[2].y += 1;
        localShapeState[3].x -= 2;

        if (this.gridPositionsFree(localShapeState, "local state")) {
          this.setState({
            shape: localShapeState,
            rotationDeg: 0
          });
        }
        break;

      default:
        break;
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JShape);
