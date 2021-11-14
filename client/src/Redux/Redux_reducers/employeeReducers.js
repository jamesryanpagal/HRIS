// ------------------------------------------ EMPLOYEE REDUCERS ----------------------------------
export const employeeReducers = (state = { employees: [] }, action) => {
  switch (action.type) {
    // add employee
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
      employeeObj.email = employee.email;
      employeeObj.position = employee.position;
      employeeObj.phone = employee.phone;
      employeeObj.contract = employee.contract;
      employeeObj.height = employee.height;
      employeeObj.weight = employee.weight;
      employeeObj.address = employee.address;
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

    // update employee details
    case "UPDATE_EMPLOYEE_DETAILS":
      const { employeeUpdates } = action.payload;

      const employeeUpdatesIndex = state.employees.findIndex(
        (e) => e.employee_id === employeeUpdates.employee_id
      );

      const employeeUpdatesObj = state.employees[employeeUpdatesIndex];

      employeeUpdatesObj.email = employeeUpdates.email;
      employeeUpdatesObj.position = employeeUpdates.position;
      employeeUpdatesObj.phone = employeeUpdates.phone;
      employeeUpdatesObj.contract = employeeUpdates.contract;
      employeeUpdatesObj.employee_image = employeeUpdates.employee_image;
      employeeUpdatesObj.height = employeeUpdates.height;
      employeeUpdatesObj.weight = employeeUpdates.weight;
      employeeUpdatesObj.address = employeeUpdates.address;
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
