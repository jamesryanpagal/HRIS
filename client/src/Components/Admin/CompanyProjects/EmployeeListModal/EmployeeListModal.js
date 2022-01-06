import React, { useState } from "react";
import { useDispatch } from "react-redux";

// redux actions
import { companyProjectSiteEmployees } from "../../../../Redux/Redux_actions/actions";

// css
import "./EmployeeListModal.css";

const EmployeeListModal = ({ setEmployeeListModal, employees }) => {
  // ------------------- STATE ----------------
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  // employees container state
  const [employeesContainer, setEmployeesContainer] = useState([...employees]);

  // DISPATCH
  const dispatch = useDispatch();

  // handleSelectEmployee
  const handleSelectEmployee = (e) => {
    if (e.target.checked) {
      setSelectedEmployee((prev) => [...prev, e.target.value]);
    } else if (!e.target.checked) {
      const selectedEmployeeExist = selectedEmployee.findIndex(
        (se) => se === e.target.value
      );
      selectedEmployee.splice(selectedEmployeeExist, 1);
    }
  };

  // handleAddSelectedEmployee
  const handleAddSelectedEmployee = () => {
    selectedEmployee.map((e) => dispatch(companyProjectSiteEmployees(e)));
    setEmployeeListModal(false);
  };

  // search
  const handleSearch = (e) => {
    const value = e.target.value;
    // filter by lastname
    const filteredByLastname = employeesContainer.filter((e) =>
      e.lastname.toLowerCase().includes(value.toLowerCase())
    );
    // filter by firstname
    const filteredByFirstname = employeesContainer.filter((e) =>
      e.firstname.toLowerCase().includes(value.toLowerCase())
    );

    // filter by id
    const filteredById = employeesContainer.filter((e) =>
      e.employee_id.toLowerCase().includes(value.toLowerCase())
    );

    if (value.length === 0) {
      setEmployeesContainer([...employees]);
      return;
    }

    if (filteredByLastname.length > 0) {
      setEmployeesContainer([...filteredByLastname]);
      return;
    }

    if (filteredByFirstname.length > 0) {
      setEmployeesContainer([...filteredByFirstname]);
      return;
    }

    if (filteredById.length > 0) {
      setEmployeesContainer([...filteredById]);
      return;
    }

    setEmployeesContainer([]);
  };

  // filter
  const handleFilter = (e) => {
    const value = e.target.value;

    // filter department
    const filtered = employeesContainer.filter((e) => {
      const positionArr = e.position.split("");
      const departmentIndex = positionArr.findIndex((c) => c === "(");
      const department = e.position.substring(
        departmentIndex + 1,
        positionArr.length - 1
      );

      return department === value;
    });

    // show all employees
    if (value === "All") {
      setEmployeesContainer([...employees]);
      return;
    }

    setEmployeesContainer([...filtered]);
  };

  return (
    <div className="employeeListModal_Container">
      {/* CLOSE */}
      <button
        type="button"
        className="close"
        onClick={() => setEmployeeListModal(false)}
      >
        <i className="fas fa-times"></i>
      </button>
      {/* EMPLOYEELIST CONTAINER */}
      <section className="employeeList_Container">
        {/* HEADER */}
        <section className="employeeList_Header">
          {/* SEARCH */}
          <section className="search_Container">
            <i className="fas fa-search"></i>
            <input
              type="text"
              name="search"
              placeholder="Name or id"
              onChange={handleSearch}
            />
          </section>
          {/* FILTER */}
          <section className="filter_Container">
            <i className="fas fa-filter"></i>
            <select onChange={handleFilter}>
              <option value="All">All</option>
              <option value="PRESIDENTS OFFICE">PRESIDENTS OFFICE</option>
              <option value="ADMINISTRATION">ADMINISTRATION</option>
              <option value="AUDITING">AUDITING</option>
              <option value="CASHIER">CASHIER</option>
              <option value="CLINIC">CLINIC</option>
              <option value="COMMUNICATIONS">COMMUNICATIONS</option>
              <option value="CONSTRUCTION">CONSTRUCTION</option>
              <option value="ENGINEERING">ENGINEERING</option>
              <option value="FABRICATION">FABRICATION</option>
              <option value="GMSD">GMSD</option>
              <option value="MOTORPOOL">MOTORPOOL</option>
              <option value="HUMAN RESOURCE">HUMAN RESOURCE</option>
              <option value="MARKETING">MARKETING</option>
              <option value="I.T">I.T</option>
              <option value="OPERATIONS">OPERATIONS</option>
              <option value="PPC">PPC</option>
              <option value="PURCHASING">PURCHASING</option>
              <option value="QA/QC">QA/QC</option>
              <option value="WAREHOUSE">WAREHOUSE</option>
              <option value="FINISHING">FINISHING</option>
              <option value="SECURITY">SECURITY</option>
              <option value="SUITES">SUITES</option>
            </select>
          </section>
        </section>
        {employeesContainer.map((e) => {
          const positionArr = e.position.split("");
          const departmentIndex = positionArr.findIndex((c) => c === "(");
          const department = e.position.substring(
            departmentIndex + 1,
            positionArr.length - 1
          );
          const position = e.position.substring(0, departmentIndex);

          return (
            <section key={e._id} className="employee_Container">
              <label htmlFor={e._id}>
                <h4>{`${e.lastname}, ${e.firstname} ${e.middle}`}</h4>
              </label>
              <section className="position_department">
                <p>{position}</p> <h5>{department}</h5>
              </section>
              <input
                type="checkbox"
                id={e._id}
                value={e.employee_id}
                onChange={handleSelectEmployee}
              />
            </section>
          );
        })}
      </section>
      {/* EMPLOYEELIST CONTAINER ACTIONS */}
      <section className="add">
        <button type="button" onClick={handleAddSelectedEmployee}>
          Add
        </button>
      </section>
    </div>
  );
};

export default EmployeeListModal;
