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
import Header from "./Header/Header";

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
      // Employees container
      let employeesArr = [];

      // get employees from Employees database table
      const employees = await axiosConfig.get("Employee/employeeList");

      // insert employees to employeesArr
      employeesArr = [...employeesArr, ...employees.data];

      // if employeeArr has no data
      if (employeesArr.length === 0) {
        dispatch(employeesActions("no data", employeesArr));
        return;
      }

      // if employeeArr has a data
      employeesArr.map((e) => dispatch(employeesActions(e, employeesArr)));
    };

    getEmployeeList();
  }, [dispatch]);

  // update employee details
  useEffect(() => {
    socket.on("updateEmployeeDetails", (data) => {
      dispatch(updateEmployeeActions(data));
    });
  }, [dispatch]);

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
      <Header
        searchSource={employeesContainer}
        toggleSearch={toggleSearch}
        searchedValue={searchedValue}
        setSearchedValue={setSearchedValue}
        handleToggleSearch={handleToggleSearch}
        handleFilterEmployeeContainer={handleFilterEmployeeContainer}
      />
      {/* EMPLOYEE LIST */}
      <section className="employee_List">
        {employeesContainer.length > 0
          ? employeesContainer.map((e) => {
              // get department
              const departmentArr = e.position.split("");
              const departmentIndex = departmentArr.findIndex((c) => c === "(");
              const getDepartment = e.position.substring(
                departmentIndex + 1,
                departmentArr.length - 1
              );

              // get position
              const getPosition = e.position.substring(0, departmentIndex);
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
                    <section className="position">{getPosition}</section>
                  </section>
                  {/* DEPARTMENT AND DATE HIRED */}
                  <section className="employee_info">
                    {/* DEPARTMENT */}
                    <section className="department">
                      {/* TITLE */}
                      <section className="title">Department</section>
                      {/* DESCRIPTION */}
                      <section className="description">{getDepartment}</section>
                    </section>
                    {/* DATE HIRED */}
                    <section className="date_hired">
                      {/* TITLE */}
                      <section className="title">Date hired</section>
                      {/* DESCRIPTION */}
                      <section className="description">{e.datehired}</section>
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
              // get department
              const departmentArr = e.position.split("");
              const departmentIndex = departmentArr.findIndex((c) => c === "(");
              const getDepartment = e.position.substring(
                departmentIndex + 1,
                departmentArr.length - 1
              );

              // get position
              const getPosition = e.position.substring(0, departmentIndex);
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
                    <section className="position">{getPosition}</section>
                  </section>
                  {/* DEPARTMENT AND DATE HIRED */}
                  <section className="employee_info">
                    {/* DEPARTMENT */}
                    <section className="department">
                      {/* TITLE */}
                      <section className="title">Department</section>
                      {/* DESCRIPTION */}
                      <section className="description">{getDepartment}</section>
                    </section>
                    {/* DATE HIRED */}
                    <section className="date_hired">
                      {/* TITLE */}
                      <section className="title">Date hired</section>
                      {/* DESCRIPTION */}
                      <section className="description">{e.datehired}</section>
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
