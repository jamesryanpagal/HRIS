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
  state = { applicants: [], screening: [], message: "" },
  action
) => {
  switch (action.type) {
    case "NEW_APPLICANTS":
      const { newApplicants } = action.payload;

      const applicantsExist = state.applicants.find(
        (a) => a._id === newApplicants._id
      );

      if (!applicantsExist) {
        return {
          ...state,
          applicants: [...state.applicants, newApplicants],
        };
      }

      return {
        ...state,
        applicants: [...state.applicants],
      };

    case "REMOVE_APPLICANT":
      const { applicantId } = action.payload;

      return {
        ...state,
        applicants: state.applicants.filter((a) => a._id !== applicantId),
      };

    case "REJECT_MESSAGE":
      const { rejectMessage } = action.payload;

      return {
        ...state,
        message: rejectMessage,
      };

    case "MOVE_TO_SCREENING":
      const { applicantData } = action.payload;

      const applicantDataExist = state.screening.find(
        (a) => a.applicant_id === applicantData.applicant_id
      );

      if (!applicantDataExist) {
        return {
          ...state,
          screening: [...state.screening, applicantData],
        };
      }

      return {
        ...state,
        screening: [...state.screening],
      };

    default:
      return state;
  }
};
