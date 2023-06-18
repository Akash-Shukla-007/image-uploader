export const setItem = (data) => {
  return {
    type: "ADD_ITEM",
    payload: data,
  };
};
