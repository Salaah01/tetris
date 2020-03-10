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
    dropping: true
  };

  componentDidMount() {
    const dropBlockInterval = setInterval(() => {
      if (this.shouldBlockDrop()) {
        this.dropBlock();
      } else {
        clearInterval(dropBlockInterval);
        this.updateGridHandler();
      this.props.onStopDropNewBlock();

        this.props.onStartDropNewBlock();
      }
    }, 500);
  }

  shouldBlockDrop = () => {
    const nextRow = this.state.currentRow + 1;
    if (nextRow > this.props.yMax) {
      return false;
    } else {
      const nextGridRow = this.props.grid[`row${nextRow}`];
      const nextGridColumns = nextGridRow.slice(
        this.state.xLeft - 1,
        this.state.xRight
      );
      console.log('row'+nextRow)
        console.log(nextGridColumns)
      return nextGridColumns.every(elem => !elem);
    }
  };

  updateGridHandler = () => {
    const currentRow = this.state.currentRow;
    const row1 = `row${currentRow - 1}`;
    const row2 = `row${currentRow}`;

    const newSubGrid = {
      [row1]: [...this.props.grid[row1]],
      [row2]: [...this.props.grid[row2]]
    };
    newSubGrid[row1].splice(this.state.topLeft.x - 1, 2, true, true);
    newSubGrid[row2].splice(this.state.topLeft.x - 1, 2, true, true);

    this.props.onUpdateGrid(newSubGrid);
    console.log(this.props.grid)
  };

  dropBlock = () => {
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

  render() {
    return (
      <Fragment>
        <SingleUnit
          col={this.state.topRight.x}
          row={this.state.topRight.y}
          unit="topLeft"
        />
        <SingleUnit
          col={this.state.topLeft.x}
          row={this.state.topRight.y}
          unit="topRight"
        />
        <SingleUnit
          col={this.state.bottomLeft.x}
          row={this.state.bottomLeft.y}
          unit="bottomLeft"
        />
        <SingleUnit
          col={this.state.bottomRight.x}
          row={this.state.bottomRight.y}
          unit="bottomRight"
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
    onStopDropNewBlock: () => dispatch(actions.stopDropNewBlock())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SquareBlock);
