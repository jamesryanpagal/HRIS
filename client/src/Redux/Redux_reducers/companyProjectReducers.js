export const companyProjectReducers = (
  state = {
    projectId: "",
    projectTitle: "",
    projectStartDate: "",
    projectEndDate: "",
    siteProjectManager: "",
    department: "",
    location: "",
    siteEmployees: [],
  },
  action
) => {
  switch (action.type) {
    case "COMPANY_PROJECT":
      const { companyProjectData } = action.payload;

      return {
        ...state,
        projectId: companyProjectData.projectId,
        projectTitle: companyProjectData.projectTitle,
        projectStartDate: companyProjectData.projectStartDate,
        projectEndDate: companyProjectData.projectEndDate,
        siteProjectManager: companyProjectData.siteProjectManager,
        department: companyProjectData.department,
        location: companyProjectData.location,
      };

    case "SITE_EMPLOYEES":
      const { siteEmployeesData } = action.payload;

      const siteEmployeesDataExist = state.siteEmployees.find(
        (se) => se === siteEmployeesData
      );

      if (!siteEmployeesDataExist) {
        return {
          ...state,
          siteEmployees: [...state.siteEmployees, siteEmployeesData],
        };
      }

      return {
        ...state,
        siteEmployees: [...state.siteEmployees],
      };

    case "CLEAR_COMPANY_PROJECTS":
      return {
        ...state,
        projectId: "",
        projectTitle: "",
        projectStartDate: "",
        projectEndDate: "",
        siteProjectManager: "",
        department: "",
        location: "",
        siteEmployees: [],
      };

    case "REMOVE_SITE_EMPLOYEE":
      const { removeSiteEmployeeData } = action.payload;

      return {
        ...state,
        siteEmployees: state.siteEmployees.filter(
          (se) => se !== removeSiteEmployeeData
        ),
      };

    default:
      return state;
  }
};
