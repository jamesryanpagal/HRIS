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
  state = {
    applicants: [],
    screening: [],
    interview: [],
    rejected: [],
    hired: [],
    message: "",
  },
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

    case "REMOVE_APPLICANT_SCREENING":
      const { applicantScreeningId } = action.payload;

      return {
        ...state,
        screening: state.screening.filter(
          (a) => a._id !== applicantScreeningId
        ),
      };

    case "MOVE_TO_INTERVIEW":
      const { applicantInterViewData } = action.payload;

      const applicantInterviewDataExist = state.interview.find(
        (a) => a.applicant_id === applicantInterViewData.applicant_id
      );

      if (!applicantInterviewDataExist) {
        return {
          ...state,
          interview: [...state.interview, applicantInterViewData],
        };
      }

      return {
        ...state,
        interview: [...state.interview],
      };

    case "REMOVE_APPLICANT_INTERVIEW":
      const { applicantInterviewId } = action.payload;

      return {
        ...state,
        interview: state.interview.filter(
          (a) => a._id !== applicantInterviewId
        ),
      };

    case "MOVE_TO_HIRED":
      const { applicantHiredData } = action.payload;

      const applicantHiredDataExist = state.hired.find(
        (a) => a.applicant_id === applicantHiredData.applicant_id
      );

      if (!applicantHiredDataExist) {
        return {
          ...state,
          hired: [...state.hired, applicantHiredData],
        };
      }

      return {
        ...state,
        hired: [...state.hired],
      };

    case "REJECTED_APPLICANT":
      const { rejectedApplicant } = action.payload;

      const rejectedApplicantExist = state.rejected.find(
        (a) => a.applicant_id === rejectedApplicant.applicant_id
      );

      if (!rejectedApplicantExist) {
        return {
          ...state,
          rejected: [...state.rejected, rejectedApplicant],
        };
      }

      return {
        ...state,
        rejected: [...state.rejected],
      };

    default:
      return state;
  }
};
