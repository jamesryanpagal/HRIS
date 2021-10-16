import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";

// ------------------------- ACTION REDUCER ----------------------------
import {
  employeesActions,
  updateEmployeeActions,
} from "../../../Redux/Redux_actions/actions";

// COMPONENTS
import EmployeeDetails from "../../../ReusableFunctions/ViewEmployeeDetails/EmployeeDetails";
import ProfileImage from "../../../ReusableFunctions/ProfileImage/ProfileImage";

//css
import "./Employee.css";

// SOCKET CONNECTION
const socket = io.connect("https://grandspan.herokuapp.com/");

const Employee = () => {
  // -------------------- STATE ------------------------
  // employees container
  const [employeesContainer, setEmployeesContainer] = useState([]);

  // Search toggle state
  const [toggleSearch, setToggleSearch] = useState(false);

  // Search value
  const [searchedValue, setSearchedValue] = useState("");

  // View Details toggle state
  const [toggleViewDetails, setToggleViewDetails] = useState(false);

  // employee id state
  const [emp_id, setEmp_id] = useState("");

  // Dispatch
  const dispatch = useDispatch();
  // Selector
  const { employees } = useSelector((state) => state.Employee);

  // get all employee from Database
  useEffect(() => {
    const getEmployeeList = async () => {
      const { data } = await axiosConfig.get("Employee/employeeList");
      data.map((e) => dispatch(employeesActions(e)));
    };

    getEmployeeList();
  }, [dispatch]);

  // update employee details
  useEffect(() => {
    socket.on("updateEmployeeDetails", (data) => {
      dispatch(updateEmployeeActions(data));
    });
  }, [dispatch]);

  // store to employees to local state
  // useEffect(() => {
  //   setEmployeesContainer(employees);
  // }, [employees]);

  // handle filter employee container
  const handleFilterEmployeeContainer = (e) => {
    const empId = e.target.parentElement;
    const filtered = employeesContainer.filter(
      (e) => e.employee_id === empId.children[1].innerText
    );
    setEmployeesContainer(filtered);
    setToggleSearch((prev) => !prev);
  };

  // handleViewDetails
  const handleViewDetails = (e) => {
    const id = e.target.value;
    setEmp_id(id);
    setToggleViewDetails(true);
  };

  // handleToggleSearch
  const handleToggleSearch = () => {
    setToggleSearch((prev) => !prev);
    setEmployeesContainer(employees);
  };

  return (
    <div className="employee_Container">
      {/* VIEW DETAILS */}
      <EmployeeDetails
        toggleViewDetails={toggleViewDetails}
        setToggleViewDetails={setToggleViewDetails}
        id={emp_id}
      />
      {/* HEADER */}
      <section className="employee_Header">
        {/* SEARCH */}
        <section
          className={
            toggleSearch ? "toggle_Search_Employee" : "search_Employee"
          }
        >
          <section className="search_Icon" onClick={handleToggleSearch}>
            {toggleSearch ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-search"></i>
            )}
          </section>
          <input
            type="text"
            name="search"
            onChange={(e) => setSearchedValue(e.target.value)}
          />
          {/* SEARCHED RESULT */}
          <section className="searched_Results">
            {/* SEARCHED VALUE IS EMPTY */}
            {!searchedValue ? (
              <section className="no_Matching_Results">
                No matching results!
              </section>
            ) : // SEACHED VALUE HAS NO MATCHED
            employeesContainer.filter((e) =>
                e.lastname.toLowerCase().includes(searchedValue.toLowerCase())
              ).length < 1 ? (
              <section className="no_Matching_Results">
                No matching results!
              </section>
            ) : (
              // SEARCHED VALUE HAS A MATCH
              employeesContainer
                .filter((e) =>
                  e.lastname.toLowerCase().includes(searchedValue.toLowerCase())
                )
                .map((e) => {
                  return (
                    <section
                      key={e.employee_id}
                      className="results"
                      onClick={handleFilterEmployeeContainer}
                    >
                      <h4>{`${e.lastname}, ${e.firstname} ${e.middle}.`}</h4>
                      <span>{e.employee_id}</span>
                    </section>
                  );
                })
            )}
          </section>
        </section>
        {/* REFRESH */}
        <section className="refresh_Page">
          <button type="button" onClick={() => window.location.reload()}>
            <i className="fas fa-sync-alt"></i>
          </button>
        </section>
      </section>
      {/* EMPLOYEE LIST */}
      <section className="employee_List">
        {employeesContainer.length > 0
          ? employeesContainer.map((e) => {
              return (
                // EMPLOYEE CARD
                <section key={e._id} className="employee">
                  {/* IMAGE */}
                  <section className="employee_image">
                    <ProfileImage
                      image={e.employee_image}
                      lastname={e.lastname}
                      firstname={e.firstname}
                    />
                  </section>
                  {/* NAME AND POSITION */}
                  <section className="employee_name">
                    {/* NAME */}
                    <section className="name">{`${e.lastname}, ${e.firstname} ${e.middle}.`}</section>
                    {/* ID */}
                    <section className="id">{e.employee_id}</section>
                    {/* POSITION */}
                    <section className="position">{e.position}</section>
                  </section>
                  {/* DEPARTMENT AND DATE HIRED */}
                  <section className="employee_info">
                    {/* DEPARTMENT */}
                    <section className="department">
                      {/* TITLE */}
                      <section className="title">Department</section>
                      {/* DESCRIPTION */}
                      <section className="description">Description</section>
                    </section>
                    {/* DATE HIRED */}
                    <section className="date_hired">
                      {/* TITLE */}
                      <section className="title">Date hired</section>
                      {/* DESCRIPTION */}
                      <section className="description">{e.date_hired}</section>
                    </section>
                  </section>
                  {/* VIEW DETAILS BUTTON */}
                  <section className="view_Details_Btn">
                    <button
                      type="button"
                      value={e.employee_id}
                      onClick={handleViewDetails}
                    >
                      View details
                    </button>
                  </section>
                </section>
              );
            })
          : employees.map((e) => {
              return (
                // EMPLOYEE CARD
                <section key={e._id} className="employee">
                  {/* IMAGE */}
                  <section className="employee_image">
                    <ProfileImage
                      image={e.employee_image}
                      lastname={e.lastname}
                      firstname={e.firstname}
                    />
                  </section>
                  {/* NAME AND POSITION */}
                  <section className="employee_name">
                    {/* NAME */}
                    <section className="name">{`${e.lastname}, ${e.firstname} ${e.middle}.`}</section>
                    {/* ID */}
                    <section className="id">{e.employee_id}</section>
                    {/* POSITION */}
                    <section className="position">{e.position}</section>
                  </section>
                  {/* DEPARTMENT AND DATE HIRED */}
                  <section className="employee_info">
                    {/* DEPARTMENT */}
                    <section className="department">
                      {/* TITLE */}
                      <section className="title">Department</section>
                      {/* DESCRIPTION */}
                      <section className="description">Description</section>
                    </section>
                    {/* DATE HIRED */}
                    <section className="date_hired">
                      {/* TITLE */}
                      <section className="title">Date hired</section>
                      {/* DESCRIPTION */}
                      <section className="description">{e.date_hired}</section>
                    </section>
                  </section>
                  {/* VIEW DETAILS BUTTON */}
                  <section className="view_Details_Btn">
                    <button
                      type="button"
                      value={e.employee_id}
                      onClick={handleViewDetails}
                    >
                      View details
                    </button>
                  </section>
                </section>
              );
            })}
      </section>
    </div>
  );
};

export default Employee;
