// Third Party Imports
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

// Local Imports
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import App from "./App";
import gameGridReducer from "./store/reducers/gameGrid";
import gameStatusReducer from './store/reducers/gameStatus'

const rootReducer = combineReducers({
  gameGrid: gameGridReducer,
  gameStatus: gameStatusReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
