// --------------------------------- USERTOKEN ACTIONS -----------------------------
export const userTokenActions = (token) => (dispatch) => {
  dispatch({
    type: "USER_TOKEN",
    payload: {
      token,
    },
  });
};

export const removeUsertokenActions = () => (dispatch) => {
  dispatch({
    type: "REMOVE_USER_TOKEN",
  });
};

// ------------------------------------- APPLICANTS ACTIONS -----------------------------------
export const applicantsActions = (newApplicants) => (dispatch) => {
  dispatch({
    type: "NEW_APPLICANTS",
    payload: {
      newApplicants,
    },
  });
};

export const removeApplicantActions = (applicantId) => (dispatch) => {
  dispatch({
    type: "REMOVE_APPLICANT",
    payload: {
      applicantId,
    },
  });
};

// not yet use
export const rejectApplicantMessage = () => (dispatch) => {
  dispatch({
    type: "REJECT_MESSAGE",
    payload: {
      rejectMessage: "Applicant was remove from the list",
    },
  });
};

export const moveToScreening = (applicantData) => (dispatch) => {
  dispatch({
    type: "MOVE_TO_SCREENING",
    payload: {
      applicantData,
    },
  });
};

export const removeApplicantScreeningActions =
  (applicantScreeningId) => (dispatch) => {
    dispatch({
      type: "REMOVE_APPLICANT_SCREENING",
      payload: {
        applicantScreeningId,
      },
    });
  };

export const moveToInterviewActions =
  (applicantInterViewData) => (dispatch) => {
    dispatch({
      type: "MOVE_TO_INTERVIEW",
      payload: {
        applicantInterViewData,
      },
    });
  };

export const removeApplicantInterviewActions =
  (applicantInterviewId) => (dispatch) => {
    dispatch({
      type: "REMOVE_APPLICANT_INTERVIEW",
      payload: {
        applicantInterviewId,
      },
    });
  };

export const moveToHiredActions = (applicantHiredData) => (dispatch) => {
  dispatch({
    type: "MOVE_TO_HIRED",
    payload: {
      applicantHiredData,
    },
  });
};

export const rejectedApplicantActions = (rejectedApplicant) => (dispatch) => {
  dispatch({
    type: "REJECTED_APPLICANT",
    payload: {
      rejectedApplicant,
    },
  });
};

// ------------------------------------- EMPLOYEE ACTIONS -----------------------------------
export const employeesActions = (employee) => (dispatch) => {
  dispatch({
    type: "EMPLOYEES",
    payload: {
      employee,
    },
  });
};

export const updateEmployeeActions = (employeeUpdates) => (dispatch) => {
  dispatch({
    type: "UPDATE_EMPLOYEE_DETAILS",
    payload: {
      employeeUpdates,
    },
  });
};
