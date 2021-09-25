export const usersReducers = (state = { admin_token: "" }, action) => {
  switch (action.type) {
    // --------------------------------- CREATE USER TOKEN ---------------------------
    case "USER_TOKEN":
      const { token } = action.payload;

      return {
        ...state,
        admin_token: token,
      };

    // ----------------------------------- REMOVE USER TOKEN ------------------------------
    case "REMOVE_USER_TOKEN":
      return {
        ...state,
        admin_token: "",
      };

    default:
      return state;
  }
};
