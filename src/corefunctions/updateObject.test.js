import { updateObject } from "./updateObject";

describe("updateObject", () => {
  let currentObject = { a: 1, b: 2 };

  it("should not mutate the current object but create new object.", () => {
    const newObject = updateObject(currentObject, { a: 2 });
    expect(currentObject).toEqual({ a: 1, b: 2 });
    expect(newObject).toEqual({ a: 2, b: 2 });
  });
});
