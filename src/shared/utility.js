export const updateObject = (oldObject, updatedProperties) => {
  /**Updates an oldObject using properties defined in a new object whilst
   * maintaining immutability by returning a copy of oldObject with the updated
   * properties.
   *
   * Args:
   *    oldObject: (obj) An object to be updated
   *    updatedProperties: (obj) An object consisting of properties to be
   *      added/updated onto the oldObject.
   */
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const deepCopyGrid = grid => {
  /**Creates and returns a deep copy of the grid.
   *
   * Args:
   *    grid: (obj) The grid object where each property is a list.
   */
  // const gridCopy = {
  //   ...grid
  // };
  const gridCopy = {};

  for (const row of Object.keys(grid)) {
    gridCopy[row] = [...grid[row]];
  }

  return gridCopy;
};
