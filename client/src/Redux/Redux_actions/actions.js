// --------------------------------- USERTOKEN ACTIONS -----------------------------
// create user token
export const userTokenActions = (token) => (dispatch) => {
  dispatch({
    type: "USER_TOKEN",
    payload: {
      token,
    },
  });
};

// add admin username
export const adminUsernameActions = (adminUsername) => (dispatch) => {
  dispatch({
    type: "ADMIN_USERNAME",
    payload: {
      adminUsername,
    },
  });
};

// remove user token
export const removeUsertokenActions = () => (dispatch) => {
  dispatch({
    type: "REMOVE_USER_TOKEN",
  });
};

// ------------------------------------- APPLICANTS ACTIONS -----------------------------------

// ----------------------- FORM APPLICATIONS -----------------------
// add applicant
export const applicantsActions = (newApplicants) => (dispatch) => {
  dispatch({
    type: "NEW_APPLICANTS",
    payload: {
      newApplicants,
    },
  });
};

// assign application applicant
export const assignApplicationApplicantActions =
  (assignApplicantApplicationsAdmin, assignApplicantApplicationsId) =>
  (dispatch) => {
    dispatch({
      type: "ASSIGN_APPLICANT_APPLICATIONS",
      payload: {
        assignApplicantApplicationsAdmin,
        assignApplicantApplicationsId,
      },
    });
  };

// unassign application applicant
export const unassignApplicationApplicantActions =
  (unassignApplicantApplicationsId) => (dispatch) => {
    dispatch({
      type: "UNASSIGN_APPLICANT_APPLICATIONS",
      payload: {
        unassignApplicantApplicationsId,
      },
    });
  };

// remove applicant from applications
export const removeApplicantActions = (applicantId) => (dispatch) => {
  dispatch({
    type: "REMOVE_APPLICANT",
    payload: {
      applicantId,
    },
  });
};

// ----------------------- FORM SCREENING -----------------------
// move applicant from applicantions to screening
export const moveToScreening = (applicantData) => (dispatch) => {
  dispatch({
    type: "MOVE_TO_SCREENING",
    payload: {
      applicantData,
    },
  });
};

// assign screening applicant
export const assignScreeningApplicantActions =
  (assignApplicantScreeningAdmin, assignApplicantScreeningId) => (dispatch) => {
    dispatch({
      type: "ASSIGN_APPLICANT_SCREENING",
      payload: {
        assignApplicantScreeningAdmin,
        assignApplicantScreeningId,
      },
    });
  };

// unassign screening applicant
export const unassignScreeningApplicantActions =
  (unassignApplicantScreeningId) => (dispatch) => {
    dispatch({
      type: "UNASSIGN_APPLICANT_SCREENING",
      payload: {
        unassignApplicantScreeningId,
      },
    });
  };

// remove applicant from screening
export const removeApplicantScreeningActions =
  (applicantScreeningId) => (dispatch) => {
    dispatch({
      type: "REMOVE_APPLICANT_SCREENING",
      payload: {
        applicantScreeningId,
      },
    });
  };

// ----------------------- FORM INTERVIEW -----------------------
// move applicant from screening to interview
export const moveToInterviewActions =
  (applicantInterViewData) => (dispatch) => {
    dispatch({
      type: "MOVE_TO_INTERVIEW",
      payload: {
        applicantInterViewData,
      },
    });
  };

// assign interview applicant
export const assignInterviewApplicantActions =
  (assignApplicantInterviewAdmin, assignApplicantInterviewId) => (dispatch) => {
    dispatch({
      type: "ASSIGN_APPLICANT_INTERVIEW",
      payload: {
        assignApplicantInterviewAdmin,
        assignApplicantInterviewId,
      },
    });
  };

// unassign interview applicant
export const unassignInterviewApplicantActions =
  (unassignApplicantInterviewId) => (dispatch) => {
    dispatch({
      type: "UNASSIGN_APPLICANT_INTERVIEW",
      payload: {
        unassignApplicantInterviewId,
      },
    });
  };

// remove applicant from interview
export const removeApplicantInterviewActions =
  (applicantInterviewId) => (dispatch) => {
    dispatch({
      type: "REMOVE_APPLICANT_INTERVIEW",
      payload: {
        applicantInterviewId,
      },
    });
  };

// ----------------------- FORM HIRED -----------------------
// move applicant from interview to hired
export const moveToHiredActions = (applicantHiredData) => (dispatch) => {
  dispatch({
    type: "MOVE_TO_HIRED",
    payload: {
      applicantHiredData,
    },
  });
};

// ----------------------- FORM REJECTED -----------------------
// move applicant to rejected
export const rejectedApplicantActions = (rejectedApplicant) => (dispatch) => {
  dispatch({
    type: "REJECTED_APPLICANT",
    payload: {
      rejectedApplicant,
    },
  });
};

// ------------------------------------- EMPLOYEE ACTIONS -----------------------------------
// add employee
export const employeesActions = (employee) => (dispatch) => {
  dispatch({
    type: "EMPLOYEES",
    payload: {
      employee,
    },
  });
};

// update employee status
export const updateEmployeeActions = (employeeUpdates) => (dispatch) => {
  dispatch({
    type: "UPDATE_EMPLOYEE_DETAILS",
    payload: {
      employeeUpdates,
    },
  });
};

// ------------------------------ NEW ADMIN ACTIONS -------------------------
// add new admin
export const newAdminActions = (newadmin) => (dispatch) => {
  dispatch({
    type: "NEW_ADMIN",
    payload: {
      newadmin,
    },
  });
};

// remove new admin
export const removeNewAdminActions = (removeNewAdminId) => (dispatch) => {
  dispatch({
    type: "REMOVE_NEW_ADMIN",
    payload: {
      removeNewAdminId,
    },
  });
};
