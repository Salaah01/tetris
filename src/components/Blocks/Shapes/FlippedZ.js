/**A Z shape block along with its controls. */

// Third Party Imports
import React, { Fragment } from "react";
import { connect } from "react-redux";

// Local Imports
import * as actions from "../../../store/actions/index";
import SingleUnit from "../singleUnit";
import BaseShape from "../BaseShape";

class FlippedZ extends BaseShape {
  state = {
    shape: [
      { x: Math.floor(this.props.xMax / 2) + 1, y: 1 },
      { x: Math.floor(this.props.xMax / 2) + 2, y: 1 },
      { x: Math.floor(this.props.xMax / 2) + 0, y: 2 },
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

  rotationHandler = () => {
    /**Rotates the block 90 degrees if possible. */
    const localShapeState = [];
    for (let elemIdx = 0; elemIdx < this.state.shape.length; elemIdx++) {
      localShapeState.push({ ...this.state.shape[elemIdx] });
    }
    switch (this.state.rotationDeg) {
      case 0:
        localShapeState[0].x += 1;
        localShapeState[0].y += 1;
        localShapeState[1].y += 2;
        localShapeState[2].x += 1;
        localShapeState[2].y -= 1;

        console.log(localShapeState);


        if (this.gridPositionsFree(localShapeState, "local state")) {
          this.setState({
            shape: localShapeState,
            rotationDeg: 90
          });
        }

        break;

      case 90:
        localShapeState[0].x -= 1;
        localShapeState[0].y -= 1;
        localShapeState[1].y -= 2;
        localShapeState[2].x -= 1;
        localShapeState[2].y += 1;
        console.log(localShapeState);


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

export default connect(mapStateToProps, mapDispatchToProps)(FlippedZ);
