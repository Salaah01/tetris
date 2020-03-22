// Third Party Imports
import React, { Component, Fragment } from "react";

// Local imports
import GridGame from "./containers/GameGrid/GameGrid";
import StatusBar from "./containers/StatusBar/StatusBar";

class App extends Component {
  render() {
    return (
      <Fragment>
        <GridGame />
        <StatusBar />
      </Fragment>
    );
  }
}

export default App;
