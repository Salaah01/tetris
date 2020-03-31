// Third Party Imports
import React, { Component, Fragment } from "react";
import { StyleRoot } from "radium";

// Local imports
import BackDrop from "./components/UI/Backdrop/Backdrop";
import Menu from "./components/Menu/Menu";
import GridGame from "./containers/GameGrid/GameGrid";
import StatusBar from "./containers/StatusBar/StatusBar";
import Controls from "./containers/Controls/Controls";

class App extends Component {
  render() {
    return (
      <Fragment>
        <BackDrop />
        <Menu />
        <GridGame />
        <StatusBar />
        <Controls />
      </Fragment>
    );
  }
}

export default App;
