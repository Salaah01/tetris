// Third Party Imports
import React, { Component } from "react";
import classes from "./GameGrid.module.scss";

// Local Imports
import * as actions from '../../store/actions/index'
import ShapeFactory from "../../components/Blocks/ShapesFactory";
import { connect } from "react-redux";

const newComponent = (props) => {
  return <ShapeFactory shape="Square"/>
}

const l = []

class GameGrid extends Component {

  newComponent = () => {
    return <ShapeFactory shape="Square"/>
  }

  render() {

    let shape = l
    if (this.props.dropBlock) {
      l.push(newComponent())

    }


    return (
      <div className={classes.GameGrid}>
        {shape}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dropBlock: state.gameGrid.dropBlock
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStopDropNewBlock: () => dispatch(actions.stopDropNewBlock())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameGrid);