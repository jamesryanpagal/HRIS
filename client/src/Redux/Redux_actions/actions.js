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
