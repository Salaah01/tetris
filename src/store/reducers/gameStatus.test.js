import gameStatusReducer from "./gameStatus";
import * as actionTypes from "../actions/actionTypes";
import reducer from "./gameStatus";

const initialState = {
  gameOver: false,
  playing: true,
  score: 5,
  multiplier: 2,
  paused: false
};

for (let gridRow = 1; gridRow <= initialState.yMax; gridRow++) {
  initialState.grid[`row${gridRow}`] = Array(initialState.yMax).fill(false);
}

describe("updateScore", () => {
  let state;

  beforeEach(() => {
    state = { ...initialState };
  });

  it("should update the score correctly when a row is deleted", () => {
    const reducer = gameStatusReducer(state, {
      type: actionTypes.UPDATE_SCORE,
      triggerReason: "deleteRow",
      xMax: 20
    });
    expect(reducer.score).toEqual(45);
  });

  it("should update correctly when user manually drops the block a level", () => {
    const reducer = gameStatusReducer(state, {
      type: actionTypes.UPDATE_SCORE,
      triggerReason: "dropBlock"
    });
    expect(reducer.score).toEqual(7);
  });

  it("should not mutate the original state", () => {
    gameStatusReducer(state, {
      type: actionTypes.UPDATE_SCORE,
      triggerReason: "deleteRow"
    });
    gameStatusReducer(state, {
      type: actionTypes.UPDATE_SCORE,
      triggerReason: "dropBlock"
    });
    expect(state.score).toEqual(initialState.score);
  });
});

describe("gameOver", () => {
  const state = { ...initialState };
  const reducer = gameStatusReducer(state, { type: actionTypes.GAME_OVER });

  it("should set playing to false.", () => {
    expect(reducer.playing).toEqual(false);
  });

  it("should set gameOver to true.", () => {
    expect(reducer.gameOver).toEqual(true);
  });

  it("should not mutate the original object", () => {
    expect(state).toEqual(initialState);
  });
});

describe("pauseGame", () => {
  it("should set paused to true.", () => {
    const state = { paused: false };
    const reducer = gameStatusReducer(state, { type: actionTypes.PAUSE_GAME });
    expect(reducer.paused).toEqual(true);
  });
});

describe("resumeGame", () => {
  it("should set paused to false.", () => {
    const state = { paused: true };
    const reducer = gameStatusReducer(state, { type: actionTypes.RESUME_GAME });
    expect(reducer.paused).toEqual(false);
  });
});

describe("incrementShapesDropped", () => {
  it("should increment the number of shapes dropped.", () => {
    const state = { shapesDropped: 0 };
    const reducer = gameStatusReducer(state, {
      type: actionTypes.INCREMENT_SHAPES_DROPPED
    });
    expect(reducer.shapesDropped).toEqual(1);
  });
});
