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
