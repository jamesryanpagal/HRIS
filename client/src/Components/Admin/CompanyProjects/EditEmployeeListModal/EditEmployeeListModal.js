import React, { useState } from "react";

const EditEmployeeListModal = ({
  setEditEmployeeListModal,
  employees,
  setProjectDetailsContainer,
  projectDetailsContainer,
}) => {
  // ------------------- STATE ----------------
  const [selectedEmployee, setSelectedEmployee] = useState([]);

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
    let selectedEmployeeArr = [];

    selectedEmployee.map((se) => {
      const employeeExist = projectDetailsContainer.siteEmployees.find(
        (e) => e === se
      );
      if (!employeeExist) {
        selectedEmployeeArr.push(se);
      }
      return se;
    });

    setProjectDetailsContainer((prev) => ({
      ...prev,
      siteEmployees: [
        ...projectDetailsContainer.siteEmployees,
        ...selectedEmployeeArr,
      ],
    }));
    setEditEmployeeListModal(false);
  };

  return (
    <div className="employeeListModal_Container">
      {/* CLOSE */}
      <button
        type="button"
        className="close"
        onClick={() => setEditEmployeeListModal(false)}
      >
        <i className="fas fa-times"></i>
      </button>
      {/* EMPLOYEELIST CONTAINER */}
      <section className="employeeList_Container">
        {employees.map((e) => {
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

export default EditEmployeeListModal;
