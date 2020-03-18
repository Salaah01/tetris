import BaseShape from "./BaseShape";

class TestBaseShape extends BaseShape {
  /**BaseShape contains some abstract method which need to be defined.
   * Globally nullify these methods to individual tests can test against an
   * instance of this class instead.
   */

  componentDidMount() {
    return;
  }

  bottomBlockUnits = () => {
    return;
  };

  shouldDropBox = () => {
    return;
  };

  updateGridHandler = () => {
    return;
  };
}

describe("deleteRow method", () => {
  const testClass = new TestBaseShape();
  const grid = {
    row1: ["a", "b", false, "c"],
    row2: ["d", false, false, "e"],
    row3: ["f", "g", "h", "i"],
    row4: [false, "k", "j", false]
  };

  const gridAfterDeletion = testClass.deleteRows(grid);

  it("should fill row 1 will an array of false.", () => {
    expect(gridAfterDeletion.row1).toEqual([false, false, false, false]);
  });

  it("should drop down row 1 values to row 2.", () => {
    expect(gridAfterDeletion.row2).toEqual(grid.row1);
  });

  it("should remove row 3 values and replace with row 2.", () => {
    expect(gridAfterDeletion.row3).toEqual(grid.row2);
  });

  it("row 4 should remain unchanged.", () => {
    expect(gridAfterDeletion.row4).toEqual(grid.row4);
  });

  it("should not mutate the original grid", () => {
    const backupValue = gridAfterDeletion.row1[0];
    gridAfterDeletion.row1[0] = "ZZZ";
    expect(grid.row1[0]).toEqual("a");
    gridAfterDeletion.row1[0] = backupValue;
  });
});

describe("gridPositionsFree method", () => {
  let testClass;

  beforeEach(() => {
    testClass = new TestBaseShape();
  });

  it("should return true", () => {
    testClass.state = {
      grid: {
        row1: [false, false, false, false],
        row2: [false, false, false, false],
        row3: [false, false, false, false]
      }
    };
    const shape = [
      { x: 2, y: 1 },
      { x: 3, y: 2 },
      { x: 1, y: 2 },
      { x: 5, y: 1 }
    ];

    const gridFree = testClass.gridPositionFree(shape, "localState");
    expect(gridFree).toEqual(true);
  });
});

describe("getShapeRightSide", () => {
  it("should return the far right x-value (max x value),", () => {
    const testClass = new TestBaseShape();
    testClass.state = {
      shape: [
        { x: 2, y: 1 },
        { x: 3, y: 2 },
        { x: 1, y: 2 },
        { x: 5, y: 1 }
      ]
    };
    expect(testClass.getShapeRightSide()).toEqual(5);
  });
});

describe("getShapeLeftSide", () => {
  it("should return the far left x-value (min x value).", () => {
    const testClass = new TestBaseShape();
    testClass.state = {
      shape: [
        { x: 2, y: 1 },
        { x: 3, y: 2 },
        { x: 1, y: 2 },
        { x: 5, y: 1 }
      ]
    };
    expect(testClass.getShapeLeftSide()).toEqual(1);
  });
});

describe("getCurrentRow", () => {
  it("should return the current/lowest row (max y value).", () => {
    const testClass = new TestBaseShape();
    testClass.state = {
      shape: [
        { x: 2, y: 1 },
        { x: 3, y: 2 },
        { x: 1, y: 3 },
        { x: 5, y: 1 }
      ]
    };
    expect(testClass.getCurrentRow()).toEqual(3);
  });
});
