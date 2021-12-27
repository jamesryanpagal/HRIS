// ------------------------------------------ USERS REDUCERS ----------------------------------
export const usersReducers = (
  state = { admin_token: "", admin: "", adminImage: "", adminId: "" },
  action
) => {
  switch (action.type) {
    // CREATE USER TOKEN
    case "USER_TOKEN":
      const { token } = action.payload;

      return {
        ...state,
        admin_token: token,
      };

    // ADMIN USERNAME
    case "ADMIN_DETAILS":
      const { Username, Employee_image, _id } = action.payload;

      return {
        ...state,
        admin: Username,
        adminImage: Employee_image,
        adminId: _id,
      };

    // REMOVE USER TOKEN
    case "REMOVE_USER_TOKEN":
      return {
        ...state,
        admin_token: "",
        admin: "",
        adminImage: "",
        adminId: "",
      };

    default:
      return state;
  }
}; // remove resume from employees database

// ------------------------------------------ APPLICANTS REDUCERS ----------------------------------
export const applicantsReducers = (
  state = {
    applicants: [],
    screening: [],
    interview: [],
    rejected: [],
    hired: [],
  },
  action
) => {
  switch (action.type) {
    // --------------------- FOR APPLICATIONS ---------------------
    // add applicant
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

      applicantsExist.assignedBy = newApplicants.assignedBy;

      return {
        ...state,
        applicants: [...state.applicants],
      };

    // assign application applicant
    case "ASSIGN_APPLICANT_APPLICATIONS":
      const {
        assignApplicantApplicationsAdmin,
        assignApplicantApplicationsId,
      } = action.payload;

      const applicationIdIndex = state.applicants.findIndex(
        (a) => a._id === assignApplicantApplicationsId
      );

      const applicationIdObj = state.applicants[applicationIdIndex];

      applicationIdObj.assignedBy = assignApplicantApplicationsAdmin;

      return { ...state, applicants: [...state.applicants] };

    // unassign application applicant
    case "UNASSIGN_APPLICANT_APPLICATIONS":
      const { unassignApplicantApplicationsId } = action.payload;

      const unassignApplicantApplicationsIdIndex = state.applicants.findIndex(
        (a) => a._id === unassignApplicantApplicationsId
      );

      const unassignApplicantApplicationsIdObj =
        state.applicants[unassignApplicantApplicationsIdIndex];

      unassignApplicantApplicationsIdObj.assignedBy = "N/A";

      return {
        ...state,
        applicants: [...state.applicants],
      };

    // remove applicant from applications
    case "REMOVE_APPLICANT":
      const { applicantId } = action.payload;

      return {
        ...state,
        applicants: state.applicants.filter((a) => a._id !== applicantId),
      };

    // --------------------- FOR SCREENING ---------------------
    // move applicant from applications to screening
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

      applicantDataExist.assignedBy = applicantData.assignedBy;

      return {
        ...state,
        screening: [...state.screening],
      };

    // assign screening applicant
    case "ASSIGN_APPLICANT_SCREENING":
      const { assignApplicantScreeningAdmin, assignApplicantScreeningId } =
        action.payload;

      const screeningIdIndex = state.screening.findIndex(
        (a) => a._id === assignApplicantScreeningId
      );

      const screeningIdObj = state.screening[screeningIdIndex];

      screeningIdObj.assignedBy = assignApplicantScreeningAdmin;

      return { ...state, screening: [...state.screening] };

    // unassign screening applicant
    case "UNASSIGN_APPLICANT_SCREENING":
      const { unassignApplicantScreeningId } = action.payload;

      const unassignApplicantScreeningIdIndex = state.screening.findIndex(
        (a) => a._id === unassignApplicantScreeningId
      );

      const unassignApplicantScreeningIdObj =
        state.screening[unassignApplicantScreeningIdIndex];

      unassignApplicantScreeningIdObj.assignedBy = "N/A";

      return {
        ...state,
        screening: [...state.screening],
      };

    // remove applicant from screening
    case "REMOVE_APPLICANT_SCREENING":
      const { applicantScreeningId } = action.payload;

      return {
        ...state,
        screening: state.screening.filter(
          (a) => a._id !== applicantScreeningId
        ),
      };

    // --------------------- FOR INTERVIEW ---------------------
    // move applicant from screening to interview
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

      applicantInterviewDataExist.assignedBy =
        applicantInterViewData.assignedBy;

      return {
        ...state,
        interview: [...state.interview],
      };

    // assign interview applicant
    case "ASSIGN_APPLICANT_INTERVIEW":
      const { assignApplicantInterviewAdmin, assignApplicantInterviewId } =
        action.payload;

      const interviewIdIndex = state.interview.findIndex(
        (a) => a._id === assignApplicantInterviewId
      );

      const interviewIdObj = state.interview[interviewIdIndex];

      interviewIdObj.assignedBy = assignApplicantInterviewAdmin;

      return { ...state, interview: [...state.interview] };

    // unassign interview applicant
    case "UNASSIGN_APPLICANT_INTERVIEW":
      const { unassignApplicantInterviewId } = action.payload;

      const unassignApplicantInterviewIdIndex = state.interview.findIndex(
        (a) => a._id === unassignApplicantInterviewId
      );

      const unassignApplicantInterviewIdObj =
        state.interview[unassignApplicantInterviewIdIndex];

      unassignApplicantInterviewIdObj.assignedBy = "N/A";

      return {
        ...state,
        interview: [...state.interview],
      };

    // remove applicant from interview
    case "REMOVE_APPLICANT_INTERVIEW":
      const { applicantInterviewId } = action.payload;

      return {
        ...state,
        interview: state.interview.filter(
          (a) => a._id !== applicantInterviewId
        ),
      };

    // move applicant from interview to hired
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

    // move applicant to rejected
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
