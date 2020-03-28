import gameGridReducer from "./gameGrid";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  shapeUnitsCount: 0,
  xMax: 20,
  yMax: 20,
  dropBlock: true,
  grid: {}
};

for (let gridRow = 1; gridRow <= initialState.yMax; gridRow++) {
  initialState.grid[`row${gridRow}`] = Array(initialState.yMax).fill(false);
}

describe("UPDATE_SHAPE_UNITS_COUNT", () => {
  let state;
  let reducer;

  beforeEach(() => {
    state = {
      ...initialState,
      grid: { ...initialState.grid }
    };

    reducer = gameGridReducer(state, {
      type: actionTypes.UPDATE_SHAPE_UNITS_COUNT,
      currentCount: 0,
      shapeSize: 3
    });
  });

  it("should increment the counter", () => {
    expect(reducer.shapeUnitsCount).toEqual(3);
  });

  it("should not mutate the state", () => {
    expect(state).toEqual(initialState);
  });
});

describe("UPDATE_GRID", () => {
  let state;
  let reducer;

  beforeEach(() => {
    state = {
      ...initialState,
      grid: { ...initialState.grid }
    };

    reducer = gameGridReducer(state, {
      type: actionTypes.UPDATE_GRID,
      newSubGrid: {
        row19: Array(state.yMax).fill(true)
      }
    });
  });

  it("should return a new grid", () => {
    expect(reducer.grid.row19[0]).toEqual(true);
  });

  it("should not mutate the state", () => {
    expect(state).toEqual(initialState);
  });
});

describe("START_DROP_NEW_BLOCK", () => {
  let state;
  let reducer;

  beforeEach(() => {
    state = {
      dropBlock: false
    };

    reducer = gameGridReducer(state, {
      type: actionTypes.START_DROP_NEW_BLOCK
    });
  });

  it("should set dropBlock to true", () => {
    expect(reducer.dropBlock).toEqual(true);
  });

  it("should not mutate the original state", () => {
    expect(state.dropBlock).toEqual(false);
  });
});

describe("STOP_DROP_NEW_BLOCK", () => {
  let state;
  let reducer;

  beforeEach(() => {
    state = {
      dropBlock: true
    };

    reducer = gameGridReducer(state, {
      type: actionTypes.STOP_DROP_NEW_BLOCK
    });
  });

  it("should set dropBlock to false", () => {
    expect(reducer.dropBlock).toEqual(false);
  });

  it("should not mutate the original state", () => {
    expect(state.dropBlock).toEqual(true);
  });
});

describe("NEW_GAME", () => {
  it("should update the state to the initial state.", () => {
    const state = { shapeUnitsCount: 100 }
    const reducer = gameGridReducer(state, { type: actionTypes.NEW_GAME })
    expect(reducer.shapeUnitsCount).toEqual(initialState.shapeUnitsCount)
  })
})
