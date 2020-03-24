import gameStatusReducer from "./gameStatus";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  gameOver: false,
  playing: true,
  score: 5,
  multiplier: 2,
  paused: false,
  level: 1
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

describe("nextLevel", () => {
  let state;
  let reducer;
  beforeEach(() => {
    state = {
      level: 5,
      blocksForLevelCheckpoints: [5, 10, 15],
      shapesDropped: 5,
      speed: 500
    };

    reducer = gameStatusReducer(state, {
      type: actionTypes.NEXT_LEVEL,
      shapesDropped: 5
    });
  });

  it("should increment the level by on next shape drop", () => {
    expect(reducer.level).toEqual(6);
  });

  it("should remove the first element from blocksForLevelCheckpoints", () => {
    expect(reducer.blocksForLevelCheckpoints).toEqual([10, 15]);
  });

  it("should update the speed", () => {
    expect(reducer.speed).toEqual(476);
  });

  it("should not mutate the original state", () => {
    expect(state).toEqual({
      level: 5,
      blocksForLevelCheckpoints: [5, 10, 15],
      shapesDropped: 5,
      speed: 500
    });
  });

  it("should not update the level if the shapesBlocked isn't equal to the first element in blocksForLevelCheckpoints.", () => {
    state = { ...state, shapesDropped: 10 };
    reducer = gameStatusReducer(state, { type: actionTypes.NEXT_LEVEL });
    expect(reducer.level).toEqual(5);
  });

  it("should not update blocksForLevelCheckpoints if the shapesBlocked variable isn't equal to the first element in blocksForLevelCheckpoints.", () => {
    state = { ...state, shapesDropped: 10 };
    reducer = gameStatusReducer(state, { type: actionTypes.NEXT_LEVEL });
    expect(reducer.blocksForLevelCheckpoints).toEqual([5, 10, 15]);
  });

  it("should not update spreed if the shapesBlocked variable isn't equal to the first element in blocksForLevelCheckpoints.", () => {
    state = { ...state, shapesDropped: 10 };
    reducer = gameStatusReducer(state, { type: actionTypes.NEXT_LEVEL });
    expect(reducer.speed).toEqual(500);
  });
});
