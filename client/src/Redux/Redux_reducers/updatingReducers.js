export const updatingReducers = (state = { updating: false }, action) => {
  switch (action.type) {
    case "UPDATING":
      return {
        ...state,
        updating: true,
      };

    case "NO_UPDATES":
      return {
        ...state,
        updating: false,
      };

    default:
      return state;
  }
};
