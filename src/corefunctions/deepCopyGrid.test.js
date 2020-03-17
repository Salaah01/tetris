import { deepCopyGrid } from "./deepCopyGrid";

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
