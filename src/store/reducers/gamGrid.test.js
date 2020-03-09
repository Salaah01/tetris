import gameGridReducer from "./gameGrid";
import * as actionTypes from "../actions/actionTypes";

describe("gameGrid reducer", () => {
  let state;

  beforeEach(() => {
    state = {
      shapeUnitsCount: 0
    };
  });

  it("should increment the counter for UPDATE_SHAPE_ELEM_COUNT", () => {
    const reducer = gameGridReducer(state, {
      type: actionTypes.UPDATE_SHAPE_ELEM_COUNT,
      currentCount: 0,
      shapeSize: 3
    });
    expect(reducer).toEqual({ shapeUnitsCount: 3 });
  });
});
