export const updateObject = (oldObject, updatedProperties) => {
  /**Helper function to update state. */
  return {
    ...oldObject,
    ...updatedProperties
  };
};
