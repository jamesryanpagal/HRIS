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
}; // remove resume from employees database

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

// ------------------------------------------ EMPLOYEE REDUCERS ----------------------------------
export const employeeReducers = (state = { employees: [] }, action) => {
  switch (action.type) {
    case "EMPLOYEES":
      const { employee } = action.payload;

      const employeeIndex = state.employees.findIndex(
        (e) => e.employee_id === employee.employee_id
      );
      const employeeExist = state.employees.find(
        (e) => e.employee_id === employee.employee_id
      );

      if (!employeeExist) {
        return {
          ...state,
          employees: [
            ...state.employees,
            { ...employee, date_hired: employee.date_hired.substring(4, 16) },
          ],
        };
      }

      const employeeObj = state.employees[employeeIndex];
      employeeObj.employee_image = employee.employee_image;
      employeeObj.height = employee.height;
      employeeObj.weight = employee.weight;
      employeeObj.Address = employee.Address;
      employeeObj.civil_status = employee.civil_status;
      employeeObj.spouce_fullname = employee.spouce_fullname;
      employeeObj.spouce_birthday = employee.spouce_birthday;
      employeeObj.spouce_contact_number = employee.spouce_contact_number;
      employeeObj.language = employee.language;
      employeeObj.hobbies = employee.hobbies;
      employeeObj.skills = employee.skills;
      return {
        ...state,
        employees: [...state.employees],
      };

    case "UPDATE_EMPLOYEE_DETAILS":
      const { employeeUpdates } = action.payload;

      const employeeUpdatesIndex = state.employees.findIndex(
        (e) => e.employee_id === employeeUpdates.employee_id
      );

      const employeeUpdatesObj = state.employees[employeeUpdatesIndex];

      employeeUpdatesObj.employee_image = employeeUpdates.employee_image;
      employeeUpdatesObj.height = employeeUpdates.height;
      employeeUpdatesObj.weight = employeeUpdates.weight;
      employeeUpdatesObj.Address = employeeUpdates.Address;
      employeeUpdatesObj.civil_status = employeeUpdates.civil_status;
      employeeUpdatesObj.spouce_fullname = employeeUpdates.spouce_fullname;
      employeeUpdatesObj.spouce_birthday = employeeUpdates.spouce_birthday;
      employeeUpdatesObj.spouce_contact_number =
        employeeUpdates.spouce_contact_number;
      employeeUpdatesObj.language = employeeUpdates.language;
      employeeUpdatesObj.hobbies = employeeUpdates.hobbies;
      employeeUpdatesObj.skills = employeeUpdates.skills;

      return {
        ...state,
        employees: [...state.employees],
      };

    default:
      return state;
  }
};
