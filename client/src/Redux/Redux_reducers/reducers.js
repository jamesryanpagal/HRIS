// ------------------------------------------ USERS REDUCERS ----------------------------------
export const usersReducers = (state = { admin_token: "" }, action) => {
  switch (action.type) {
    // CREATE USER TOKEN
    case "USER_TOKEN":
      const { token } = action.payload;

      return {
        ...state,
        admin_token: token,
      };

    // REMOVE USER TOKEN
    case "REMOVE_USER_TOKEN":
      return {
        ...state,
        admin_token: "",
      };

    default:
      return state;
  }
};

// ------------------------------------------ APPLICANTS REDUCERS ----------------------------------
export const applicantsReducers = (
  state = { applicants: [], screening: [] },
  action
) => {
  switch (action.type) {
    case "NEW_APPLICANTS":
      const { newApplicants } = action.payload;

      return {
        ...state,
        applicants: [...state.applicants, newApplicants],
      };

    default:
      return state;
  }
};
