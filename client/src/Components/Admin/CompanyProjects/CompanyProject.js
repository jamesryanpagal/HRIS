import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../Spinner/Spinner";

// redux actions
import {
  companyProjectActions,
  removeSiteEmployee,
} from "../../../Redux/Redux_actions/actions";

// component
import Confirmation from "./Confirmation/Confirmation";
import EmployeeListModal from "./EmployeeListModal/EmployeeListModal";
import EditEmployeeListModal from "./EditEmployeeListModal/EditEmployeeListModal";
import CloseProjectConfirmation from "./CloseProjectConfirmation/CloseProjectConfirmation";

// css
import "./CompanyProject.css";

const CompanyProject = () => {
  // SELECTOR
  const { employees } = useSelector((state) => state.Employee);
  const {
    projectId,
    projectTitle,
    projectStartDate,
    projectEndDate,
    siteProjectManager,
    department,
    location,
    siteEmployees,
  } = useSelector((state) => state.CompanyProjects);

  // DISPATCH
  const dispatch = useDispatch();

  // --------------------- STATE -----------------
  // NEW PROJECT TOGGLE STATE
  const [newProject, setNewProject] = useState(false);

  // CONFIRMATION TOGGLE STATE
  const [projectConfirmation, setProjectConfirmation] = useState(false);

  // EMPLOYEE LIST MODAL TOGGLE STATE
  const [employeeListModal, setEmployeeListModal] = useState(false);

  // EDIT EMPLOYE LIST MODAL TOGGLE STATE
  const [editEmployeeListModal, setEditEmployeeListModal] = useState(false);

  // CLOSE PROJECT CONFIRMATION STATE
  const [closeProjectConfirmation, setCloseProjectConfirmation] =
    useState(false);

  // COMPANY PROJECT IMAGE PREVIEW
  const [companyProjectImagePreview, setCompanyProjectImagePreview] =
    useState("");

  // COMPANY EDIT PROJECT IMAGE PREVIEW
  const [companyEditProjectImagePreview, setCompanyEditProjectImagePreview] =
    useState("");

  // INCOMPLETE PROJECT DETAILS MESSAGE STATE
  const [projectDetailsMessage, setProjectDetailsMessage] = useState("");

  // PROJECT CREATED MESSAGE STATE
  const [projectCreated, setProjectCreated] = useState(false);

  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // PROJECT DETAILS LOADING STATE
  const [projectDetailsLoading, setProjectDetailsLoading] = useState(false);

  // SAVE CHANGES LOADING
  const [saveChangesLoading, setSaveChangesLoading] = useState(false);

  // PROJECT DETAILS STATE
  const [projectDetails, setProjectDetails] = useState({
    projectImage: "",
    projectId: projectId,
    projectTitle: projectTitle,
    projectStartDate: projectStartDate,
    projectEndDate: projectEndDate,
    siteProjectManager: siteProjectManager,
    department: department,
    location: location,
  });

  // PROJECT LIST
  const [projectList, setProjectList] = useState([]);

  // VIEW PROJECT DETAILS
  const [projectDetailsId, setProjectDetailsId] = useState("");

  // EDIT PROJECT STATE
  const [editProject, setEditProject] = useState(false);

  // PROJECT DETAILS CONTAINER
  const [projectDetailsContainer, setProjectDetailsContainer] = useState({
    _id: "",
    projectImage: "",
    projectId: "",
    projectTitle: "",
    projectStartDate: "",
    projectEndDate: "",
    siteProjectManager: "",
    department: "",
    location: "",
    siteEmployees: [],
  });

  // GET PROJECT LIST FROM DATABASE
  useEffect(() => {
    const getProjectList = async () => {
      try {
        setLoading(true);
        const { data } = await axiosConfig.get(
          "CompanyProjects/getProjectList"
        );
        setProjectList([...data]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProjectList();
  }, []);

  // GET PROJECT DETAILS FROM DATABASE
  useEffect(() => {
    const getProjectDetails = async () => {
      if (projectDetailsId) {
        setProjectDetailsLoading(true);
        const { data } = await axiosConfig.get(
          "CompanyProjects/findProject/" + projectDetailsId
        );
        setProjectDetailsContainer((prev) => ({
          ...prev,
          _id: data._id,
          projectImage: data.projectImage,
          projectId: data.projectId,
          projectTitle: data.projectTitle,
          projectStartDate: data.projectStartDate,
          projectEndDate: data.projectEndDate,
          siteProjectManager: data.siteProjectManager,
          department: data.department,
          location: data.location,
          siteEmployees: [...data.siteEmployees],
        }));
        setProjectDetailsLoading(false);
      }
    };

    getProjectDetails();
  }, [projectDetailsId]);

  // REMOVE PROJECT CREATED MESSAGE
  useEffect(() => {
    if (projectCreated) {
      setTimeout(() => {
        setProjectCreated(false);
      }, 5000);
    }
  }, [projectCreated]);

  // handleChange
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  // handleSaveToRedux
  const handleSaveToRedux = () => {
    dispatch(companyProjectActions(projectDetails));
  };

  // handleUpdateCompanyProjectImage
  const handleUpdateCompanyProjectImage = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    reader.onload = () => {
      if (reader.readyState === 2) {
        setCompanyProjectImagePreview(reader.result);
        setProjectDetails((prev) => ({ ...prev, projectImage: selectedFile }));
      }
    };
  };

  // handleRemoveSiteEmployee
  const handleRemoveSiteEmployee = (e) => {
    const target = e.target.value;
    dispatch(removeSiteEmployee(target));
  };

  // handleCloseProject
  const handleCloseProject = () => {
    const {
      projectId,
      projectTitle,
      projectStartDate,
      projectEndDate,
      siteProjectManager,
      department,
      location,
    } = projectDetails;
    if (
      projectId ||
      projectTitle ||
      projectStartDate ||
      projectEndDate ||
      siteProjectManager ||
      department ||
      location
    ) {
      setCloseProjectConfirmation(true);
      return;
    }

    setNewProject(false);
  };

  // handleNewProject
  const handleNewProject = () => {
    setProjectDetailsId("");
    setNewProject(true);
  };

  // handleShowProjectConfirmation
  const handleShowProjectConfirmation = () => {
    for (let details in projectDetails) {
      if (!projectDetails[details] || siteEmployees.length === 0) {
        setProjectDetailsMessage(
          "Please fill out all the company project details"
        );
        setTimeout(() => {
          setProjectDetailsMessage("");
        }, 5000);
        return;
      }
    }
    setProjectConfirmation(true);
  };

  // handleEditCompanyProjectImage
  const handleEditCompanyProjectImage = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    reader.onload = () => {
      if (reader.readyState === 2) {
        setCompanyEditProjectImagePreview(reader.result);
        setProjectDetailsContainer((prev) => ({
          ...prev,
          projectImage: selectedFile,
        }));
      }
    };
  };

  // handleEdit
  const handleEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProjectDetailsContainer((prev) => ({ ...prev, [name]: value }));
  };

  // handleEditRemoveSiteEmployees
  const handleEditRemoveSiteEmployees = (e) => {
    const target = e.target.value;
    setProjectDetailsContainer((prev) => ({
      ...prev,
      siteEmployees: projectDetailsContainer.siteEmployees.filter(
        (se) => se !== target
      ),
    }));
  };

  // handleSaveChanges
  const handleSaveChanges = async () => {
    try {
      let uploadedImage = "";
      setSaveChangesLoading(true);
      if (projectDetailsContainer.projectImage.name) {
        const formData = new FormData();
        formData.append("file", projectDetailsContainer.projectImage);
        formData.append("upload_preset", "company_projects");
        const uploadProjectImage = await axiosConfig.post(
          "https://api.cloudinary.com/v1_1/dfwa3kop9/image/upload",
          formData
        );

        uploadedImage = uploadProjectImage.data.url;
      }
      await axiosConfig.patch(
        "CompanyProjects/updateProject/" + projectDetailsContainer._id,
        {
          ...projectDetailsContainer,
          projectImage: uploadedImage && uploadedImage,
        }
      );
      setSaveChangesLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="company_Project_Container">
      {/* INCOMPLETE PROJECT DETAILS MESSAGE */}
      {projectDetailsMessage && (
        <section className="projectDetailsMessage">
          <i className="fas fa-exclamation-triangle"></i>
          {projectDetailsMessage}
        </section>
      )}
      {/* // PROJECT CREATED MESSAGE */}
      {projectCreated && (
        <section className="projectCreatedMessage">
          <i className="fas fa-check-circle"></i> Project created!
        </section>
      )}
      {/* CONFIRMATION MODAL */}
      {projectConfirmation && (
        <Confirmation
          projectDetails={{ ...projectDetails, siteEmployees }}
          setProjectConfirmation={setProjectConfirmation}
          setProjectCreated={setProjectCreated}
        />
      )}
      {/* CLOSE PROJECT CONFIRMATION */}
      {closeProjectConfirmation && (
        <CloseProjectConfirmation
          setNewProject={setNewProject}
          setCloseProjectConfirmation={setCloseProjectConfirmation}
        />
      )}
      {/* EMPLOYEELIST MODAL */}
      {employeeListModal && (
        <EmployeeListModal
          setEmployeeListModal={setEmployeeListModal}
          employees={employees}
        />
      )}
      {/* EMPLOYEELIST MODAL EDIT */}
      {editEmployeeListModal && (
        <EditEmployeeListModal
          setEditEmployeeListModal={setEditEmployeeListModal}
          employees={employees}
          setProjectDetailsContainer={setProjectDetailsContainer}
          projectDetailsContainer={projectDetailsContainer}
        />
      )}
      {/* LIST OF PROJECTS */}
      <section className="projectlist_Container">
        {/* HEADER */}
        <section className="projectlist_Header">
          List of Company Projects
        </section>
        {/* PROJECTS */}
        <section className="projectslist">
          {loading ? (
            <section className="loadingProjectList">
              <section className="projectListSpinner"></section>Getting company
              projects, please wait!
            </section>
          ) : (
            projectList.map((p) => {
              return (
                <section
                  key={p._id}
                  className="companyProject_Container"
                  onClick={() => setProjectDetailsId(p._id)}
                >
                  <section className="title">
                    <p>
                      <strong>Title: </strong> {p.projectTitle}
                    </p>
                  </section>
                  <section className="id">
                    <p>
                      <strong>Id: </strong> {p.projectId}
                    </p>
                  </section>
                </section>
              );
            })
          )}
        </section>
        {/* NEW PROJECT BUTTON */}
        <section className="projectslistbutton_Container">
          <button type="button" onClick={handleNewProject}>
            <i className="fas fa-plus"></i> New project
          </button>
        </section>
      </section>
      {/* PROJECT DETAILS CONTAINER */}
      <section className="projectdetails_Container">
        {/* ------------------- NEW PROJECT ------------------------- */}
        {newProject && !projectDetailsId ? (
          <section className="newProject_Container">
            {/* HEADER */}
            <section className="newProject_Header">
              <h3>New Project</h3>
              <button
                type="button"
                className="close"
                onClick={handleCloseProject}
              >
                <i className="fas fa-times"></i>
              </button>
            </section>
            {/* PROJECT DETAILS */}
            <section className="projectDetails">
              {/* FIRST GROUP */}
              <section className="projectDetails_Group">
                {/* IMAGE */}
                <section className="projectDetails_Image">
                  <img src={companyProjectImagePreview} alt="" />
                  {/* ADD IMAGE BUTTON */}
                  <label htmlFor="projectImage">
                    <i className="fas fa-plus"></i>
                    <input
                      type="file"
                      name="projectImage"
                      id="projectImage"
                      onChange={handleUpdateCompanyProjectImage}
                    />
                  </label>
                </section>
                {/* DETAILS */}
                <section className="details">
                  {/* HEADER */}
                  <section className="details_Header">
                    <h4>Company Project Details</h4>
                  </section>
                  {/* BODY */}
                  {/* PROJECT ID */}
                  <section className="details_Container">
                    <h5>Project ID: </h5>
                    <input
                      type="text"
                      name="projectId"
                      value={projectDetails.projectId}
                      onBlur={handleSaveToRedux}
                      onChange={handleChange}
                    />
                  </section>
                  {/* PROJECT TITLE */}
                  <section className="details_Container">
                    <h5>Project Title: </h5>
                    <input
                      type="text"
                      name="projectTitle"
                      value={projectDetails.projectTitle}
                      onBlur={handleSaveToRedux}
                      onChange={handleChange}
                    />
                  </section>
                  {/* PROJECT START DATE */}
                  <section className="details_Container">
                    <h5>Project Start Date: </h5>
                    <input
                      type="date"
                      name="projectStartDate"
                      value={projectDetails.projectStartDate}
                      onBlur={handleSaveToRedux}
                      onChange={handleChange}
                    />
                  </section>
                  {/* PROJECT END DATE */}
                  <section className="details_Container">
                    <h5>Project End Date: </h5>
                    <input
                      type="date"
                      name="projectEndDate"
                      value={projectDetails.projectEndDate}
                      onBlur={handleSaveToRedux}
                      onChange={handleChange}
                    />
                  </section>
                </section>
              </section>
              {/* SECOND GROUP */}
              <section className="projectDetails_Group">
                {/* SITE PERSONNEL */}
                <section className="sitePersonnel_Container">
                  {/* HEADER */}
                  <section className="sitePersonnel_Header">
                    <h4>Site Personnel</h4>
                  </section>
                  {/* BODY */}
                  <section className="sitePersonnel">
                    {/* SITE PROJECT MANAGER */}
                    <section className="sitePersonnel_Group">
                      <h5>Site Project Manager: </h5>
                      <input
                        type="text"
                        name="siteProjectManager"
                        value={projectDetails.siteProjectManager}
                        onBlur={handleSaveToRedux}
                        onChange={handleChange}
                      />
                    </section>
                    {/* DEPARTMENT */}
                    <section className="sitePersonnel_Group">
                      <h5>Department: </h5>
                      <input
                        type="text"
                        name="department"
                        value={projectDetails.department}
                        onBlur={handleSaveToRedux}
                        onChange={handleChange}
                      />
                    </section>
                    {/* LOCATION */}
                    <section className="sitePersonnel_Group">
                      <h5>Location: </h5>
                      <input
                        type="text"
                        name="location"
                        value={projectDetails.location}
                        onBlur={handleSaveToRedux}
                        onChange={handleChange}
                      />
                    </section>
                  </section>
                </section>
              </section>
              {/* THIRD GROUP */}
              <section className="projectDetails_Group">
                {/* SITE EMPLOYEES */}
                <section className="siteEmployees_Container">
                  {/* HEADER */}
                  <section className="siteEmployees_Header">
                    <h4>Site Employees </h4>
                    <button
                      type="button"
                      onClick={() => setEmployeeListModal(true)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </section>
                  {/* BODY */}
                  <section className="siteEmployees_List">
                    {siteEmployees.map((se) => {
                      // GET EMPLOYEE
                      const employee = employees.find(
                        (e) => e.employee_id === se
                      );

                      // GET POSITION AND DEPARTMENT
                      const positionArr = employee.position.split("");
                      const departmentIndex = positionArr.findIndex(
                        (c) => c === "("
                      );
                      const department = employee.position.substring(
                        departmentIndex + 1,
                        employee.position.length - 1
                      );

                      const position = employee.position.substring(
                        0,
                        departmentIndex
                      );

                      return (
                        <section key={employee._id} className="siteEmployee">
                          {/* NAME */}
                          <h4>{`${employee.lastname}, ${employee.firstname} ${employee.middle}`}</h4>
                          {/* POSITION AND DEPARTMENT */}
                          <section className="position_department">
                            <p>{position}</p> <h5>{department}</h5>
                          </section>
                          {/* ACTIONS */}
                          <button
                            type="button"
                            value={employee.employee_id}
                            onClick={handleRemoveSiteEmployee}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </section>
                      );
                    })}
                  </section>
                </section>
              </section>
              {/* FOURTH GROUP */}
              <section className="projectDetails_Group">
                <button
                  type="button"
                  className="projectDone"
                  onClick={handleShowProjectConfirmation}
                >
                  Done
                </button>
              </section>
            </section>
          </section>
        ) : (
          <section className="project_Details_Container">
            {projectDetailsLoading ? (
              <section className="projectDetailsLoading">
                Loading project details...
              </section>
            ) : (
              // ------------------------- PROJECT DETAILS -----------------
              projectDetailsContainer.projectTitle && (
                <section className="newProject_Container">
                  {/* HEADER */}
                  <section className="newProject_Header">
                    <h3>{projectDetailsContainer.projectTitle}</h3>
                    <button
                      className={
                        editProject ? "editProject_Active" : "editProject"
                      }
                      onClick={() => setEditProject((prev) => !prev)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </section>
                  {/* PROJECT DETAILS */}
                  <section className="projectDetails">
                    {/* FIRST GROUP */}
                    <section className="projectDetails_Group">
                      {/* IMAGE */}
                      <section className="projectDetails_Image">
                        {companyEditProjectImagePreview ? (
                          <img src={companyEditProjectImagePreview} alt="" />
                        ) : projectDetailsContainer.projectImage === "N/A" ? (
                          <h3>{projectDetailsContainer.projectImage}</h3>
                        ) : (
                          <img
                            src={projectDetailsContainer.projectImage}
                            alt=""
                          />
                        )}
                        {/* ADD IMAGE BUTTON */}
                        {editProject && (
                          <label htmlFor="projectImage">
                            <i className="fas fa-plus"></i>
                            <input
                              type="file"
                              name="projectImage"
                              id="projectImage"
                              onChange={handleEditCompanyProjectImage}
                            />
                          </label>
                        )}
                      </section>
                      {/* DETAILS */}
                      <section className="details">
                        {/* HEADER */}
                        <section className="details_Header">
                          <h4>Company Project Details</h4>
                        </section>
                        {/* BODY */}
                        {/* PROJECT ID */}
                        <section
                          className={
                            !editProject
                              ? "disableDetails_Container"
                              : "details_Container"
                          }
                        >
                          <h5>Project ID: </h5>
                          <input
                            type="text"
                            name="projectId"
                            value={projectDetailsContainer.projectId}
                            onChange={handleEdit}
                          />
                        </section>
                        {/* PROJECT TITLE */}
                        <section
                          className={
                            !editProject
                              ? "disableDetails_Container"
                              : "details_Container"
                          }
                        >
                          <h5>Project Title: </h5>
                          <input
                            type="text"
                            name="projectTitle"
                            value={projectDetailsContainer.projectTitle}
                            onChange={handleEdit}
                          />
                        </section>
                        {/* PROJECT START DATE */}
                        <section
                          className={
                            !editProject
                              ? "disableDetails_Container"
                              : "details_Container"
                          }
                        >
                          <h5>Project Start Date: </h5>
                          <input
                            type="date"
                            name="projectStartDate"
                            value={projectDetailsContainer.projectStartDate}
                            onChange={handleEdit}
                          />
                        </section>
                        {/* PROJECT END DATE */}
                        <section
                          className={
                            !editProject
                              ? "disableDetails_Container"
                              : "details_Container"
                          }
                        >
                          <h5>Project End Date: </h5>
                          <input
                            type="date"
                            name="projectEndDate"
                            value={projectDetailsContainer.projectEndDate}
                            onChange={handleEdit}
                          />
                        </section>
                      </section>
                    </section>
                    {/* SECOND GROUP */}
                    <section className="projectDetails_Group">
                      {/* SITE PERSONNEL */}
                      <section className="sitePersonnel_Container">
                        {/* HEADER */}
                        <section className="sitePersonnel_Header">
                          <h4>Site Personnel</h4>
                        </section>
                        {/* BODY */}
                        <section className="sitePersonnel">
                          {/* SITE PROJECT MANAGER */}
                          <section
                            className={
                              !editProject
                                ? "disableSitePersonnel_Group"
                                : "sitePersonnel_Group"
                            }
                          >
                            <h5>Site Project Manager: </h5>
                            <input
                              type="text"
                              name="siteProjectManager"
                              value={projectDetailsContainer.siteProjectManager}
                              onChange={handleEdit}
                            />
                          </section>
                          {/* DEPARTMENT */}
                          <section
                            className={
                              !editProject
                                ? "disableSitePersonnel_Group"
                                : "sitePersonnel_Group"
                            }
                          >
                            <h5>Department: </h5>
                            <input
                              type="text"
                              name="department"
                              value={projectDetailsContainer.department}
                              onChange={handleEdit}
                            />
                          </section>
                          {/* LOCATION */}
                          <section
                            className={
                              !editProject
                                ? "disableSitePersonnel_Group"
                                : "sitePersonnel_Group"
                            }
                          >
                            <h5>Location: </h5>
                            <input
                              type="text"
                              name="location"
                              value={projectDetailsContainer.location}
                              onChange={handleEdit}
                            />
                          </section>
                        </section>
                      </section>
                    </section>
                    {/* THIRD GROUP */}
                    <section className="projectDetails_Group">
                      {/* SITE EMPLOYEES */}
                      <section className="siteEmployees_Container">
                        {/* HEADER */}
                        <section
                          className={
                            !editProject
                              ? "disableSiteEmployees_Header"
                              : "siteEmployees_Header"
                          }
                        >
                          <h4>Site Employees </h4>
                          <button
                            type="button"
                            onClick={() => setEditEmployeeListModal(true)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </section>
                        {/* BODY */}
                        <section className="siteEmployees_List">
                          {projectDetailsContainer.siteEmployees.map((se) => {
                            // GET EMPLOYEE
                            const employee = employees.find(
                              (e) => e.employee_id === se
                            );

                            // GET POSITION AND DEPARTMENT
                            const positionArr = employee.position.split("");
                            const departmentIndex = positionArr.findIndex(
                              (c) => c === "("
                            );
                            const department = employee.position.substring(
                              departmentIndex + 1,
                              employee.position.length - 1
                            );

                            const position = employee.position.substring(
                              0,
                              departmentIndex
                            );

                            return (
                              <section
                                key={employee._id}
                                className="siteEmployee"
                              >
                                {/* NAME */}
                                <h4>{`${employee.lastname}, ${employee.firstname} ${employee.middle}`}</h4>
                                {/* POSITION AND DEPARTMENT */}
                                <section className="position_department">
                                  <p>{position}</p> <h5>{department}</h5>
                                </section>
                                {/* ACTIONS */}
                                {editProject && (
                                  <button
                                    type="button"
                                    value={employee.employee_id}
                                    onClick={handleEditRemoveSiteEmployees}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                )}
                              </section>
                            );
                          })}
                        </section>
                      </section>
                    </section>
                    {/* FOURTH GROUP */}
                    <section className="projectDetails_Group">
                      {editProject && (
                        <button
                          type="button"
                          className="saveChanges"
                          onClick={handleSaveChanges}
                        >
                          {saveChangesLoading ? <Spinner /> : "Save changes"}
                        </button>
                      )}
                    </section>
                  </section>
                </section>
              )
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default CompanyProject;
