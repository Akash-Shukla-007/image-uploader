const initialState = [];

const addReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default addReducers;
