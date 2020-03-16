import { updateObject, deepCopyGrid } from "./utility";

describe("updateObject", () => {
  let currentObject = { a: 1, b: 2 };

  it("should not mutate the current object but create new object.", () => {
    const newObject = updateObject(currentObject, { a: 2 });
    expect(currentObject).toEqual({ a: 1, b: 2 });
    expect(newObject).toEqual({ a: 2, b: 2 });
  });
});

describe("deepCopyGrid", () => {
  const grid = { a: [1], b: [2] };
  const gridCopy = deepCopyGrid(grid);

  it("should return a copy of the grid.", () => {
    expect(gridCopy).toEqual(grid);
  });

  it("should not mutate the grid with changes to the gridCopy.", () => {
    gridCopy["b"].push(22);
    gridCopy["c"] = [5, 99];
    delete gridCopy.a;

    expect(grid).toEqual({ a: [1], b: [2] });
  });
});
