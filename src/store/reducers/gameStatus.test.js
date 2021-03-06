/**Unit tests for the gameStatus module. */

import gameStatusReducer, { gameStatuses } from "./gameStatus";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  gameOver: false,
  playing: true,
  score: 5,
  multiplier: 2,
  paused: false,
  level: 1,
  shapesDropped: 0,
  highScores: [0, 0, 0]
};

for (let gridRow = 1; gridRow <= initialState.yMax; gridRow++) {
  initialState.grid[`row${gridRow}`] = Array(initialState.yMax).fill(false);
}

describe("UPDATE_SCORE", () => {
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

describe("GAME_OVER", () => {
  const state = { ...initialState };
  const reducer = gameStatusReducer(state, { type: actionTypes.GAME_OVER });

  it("should set playing to false.", () => {
    expect(reducer.playing).toEqual(false);
  });

  it("should set gameOver to true.", () => {
    expect(reducer.gameOver).toEqual(true);
  });

  it("should set paused to true.", () => {
    expect(reducer.paused).toEqual(true);
  });

  it("should change status to GAME_OVER.", () => {
    expect(reducer.status).toEqual(gameStatuses.GAME_OVER);
  });

  it("should not mutate the original object", () => {
    expect(state).toEqual(initialState);
  });
});

describe("PAUSE_GAME", () => {
  it("should set paused to true.", () => {
    const state = { paused: false };
    const reducer = gameStatusReducer(state, { type: actionTypes.PAUSE_GAME });
    expect(reducer.paused).toEqual(true);
  });
});

describe("RESUME_GAME", () => {
  it("should set paused to false.", () => {
    const state = { paused: true };
    const reducer = gameStatusReducer(state, { type: actionTypes.RESUME_GAME });
    expect(reducer.paused).toEqual(false);
  });
});

describe("INCREMENT_SHAPES_DROPPED", () => {
  it("should increment the number of shapes dropped.", () => {
    const state = { shapesDropped: 0 };
    const reducer = gameStatusReducer(state, {
      type: actionTypes.INCREMENT_SHAPES_DROPPED
    });
    expect(reducer.shapesDropped).toEqual(1);
  });
});

describe("NEXT_LEVEL", () => {
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
    expect(reducer.speed).toEqual(449);
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

describe("INCREMENT_CLEARED_LINES", () => {
  it("should increment the clearedLine variable.", () => {
    const state = { linesCleared: 5 };
    const reducer = gameStatusReducer(state, {
      type: actionTypes.INCREMENT_CLEARED_LINES
    });
    expect(reducer.linesCleared).toEqual(6);
  });
});

describe("NEW_GAME", () => {
  const state = {
    shapesDropped: 20,
    level: 999
  };
  const reducer = gameStatusReducer(state, {
    type: actionTypes.NEW_GAME
  });

  it("should reset the state to the initial state.", () => {
    expect(reducer.level).toEqual(initialState.level);
    expect(reducer.shapesDropped).toEqual(initialState.shapesDropped);
  });

  it("should should set paused to false.", () => {
    expect(reducer.paused).toEqual(false);
  });

  it("should set playing to true.", () => {
    expect(reducer.playing).toEqual(true);
  });

  it("should update the status to GAME_STARTED", () => {
    expect(reducer.status).toEqual(gameStatuses.GAME_STARTED);
  });
});

describe("UPDATE_GAME_STATUS", () => {
  it("should update the game status with a new status.", () => {
    const state = { status: gameStatuses.GAME_NOT_STARTED };
    const reducer = gameStatusReducer(state, {
      type: actionTypes.UPDATE_GAME_STATUS,
      status: gameStatuses.GAME_OVER
    });
    expect(reducer.status).toEqual(gameStatuses.GAME_OVER);
  });
});

describe("UPDATE_HIGH_SCORES", () => {
  it("should replace the hold high scores with new high scores.", () => {
    const state = { highScores: [0, 1, 2] };
    const reducer = gameStatusReducer(state, {
      type: actionTypes.UPDATE_HIGH_SCORES,
      highScores: [10, 20, 30]
    });
    expect(reducer.highScores).toEqual([10, 20, 30]);
  });
});
