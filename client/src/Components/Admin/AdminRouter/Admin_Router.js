import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";

//components
import Navbar from "../Navbar/Navbar";
import Applicants from "../Applicants/Applicants";
import Employee_Router from "../Employee/Employee_Router/Employee_Router";
import Department from "../Department/Department";
import NewAdmin from "../NewAdmin/NewAdmin";
import PageNotFound from "../../PageNotFound/PageNotFound";

// redux actions
import {
  departmentsActions,
  updateEmployeeDepartmentActions,
  noUpdatesActions,
} from "../../../Redux/Redux_actions/actions";

//css
import "./Admin_Router.css";

const Admin_Router = () => {
  // --------------------- STATE ----------------
  const [removeFromDepartment, setRemoveFromDepartment] = useState({
    department: "",
    employee_id: "",
  });

  // dispatch
  const dispatch = useDispatch();

  // selector
  const { employees } = useSelector((state) => state.Employee);
  const { updating } = useSelector((state) => state.Updating);
  const departmentRedux = useSelector((state) => state.department);

  // if employee details updated
  useEffect(() => {
    const updateEmployeeDetails = async () => {
      try {
        employees.map(async (e) => {
          if (updating) {
            for (let key in departmentRedux) {
              const findEmployee = departmentRedux[key].find(
                (d) => d.employee_id === e.employee_id
              );

              if (findEmployee) {
                await axiosConfig.patch(
                  `/Department/updateDetails_${key.toUpperCase()}/${
                    findEmployee.employee_id
                  }`,
                  e
                );
              }
            }
            dispatch(noUpdatesActions());
          }
          return e;
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    updateEmployeeDetails();
  }, [employees, departmentRedux, dispatch, updating]);

  // if employee department updated
  useEffect(() => {
    employees.map(async (e) => {
      const employeePosition = e.position;
      const removeCloseParenthesis = employeePosition.replace(")", "");
      const employeeArr = employeePosition.split("");
      const departmentIndex = employeeArr.findIndex((p) => p === "(");
      const getDepartment = removeCloseParenthesis.substring(
        departmentIndex + 1
      );
      const employeeDepartment = getDepartment.toLowerCase().replace(" ", "");
      for (let key in departmentRedux) {
        if (key !== employeeDepartment) {
          const employeeExist = departmentRedux[key].find(
            (d) => d.employee_id === e.employee_id
          );
          if (employeeExist) {
            await axiosConfig.delete(
              `/Department/updateEmployeeDepartment_${key.toUpperCase()}/${
                employeeExist._id
              }`
            );
            dispatch(
              updateEmployeeDepartmentActions(
                key.toUpperCase(),
                employeeExist.employee_id
              )
            );
          }
        }
      }
      return e;
    });
  }, [employees, departmentRedux, dispatch]);

  // add employee to its dedicated department to database
  useEffect(() => {
    const addEmployeeToDepartment = async () => {
      // list of employee container
      let employeeList = [];
      employeeList = [...employeeList, ...employees];

      // ------------------------ blacklist employee -----------------------
      const blacklistEmployee = await axiosConfig.get("MoveTo/GetBlacklist");
      blacklistEmployee.data.map(async (be) => {
        const blacklistEmployeeExist = employeeList.find(
          (e) => e.employee_id === be.employee_id
        );
        if (blacklistEmployeeExist) {
          // get blacklist employee department
          const employeePosition = blacklistEmployeeExist.position;
          const employeePositionArr = employeePosition.split("");
          const employeePositionIndex = employeePositionArr.findIndex(
            (ep) => ep === "("
          );
          const department = employeePosition.substring(
            employeePositionIndex + 1,
            employeePosition.length - 1
          );

          // remove employee to its department to database
          await axiosConfig.post("RemoveFromDepartment", {
            departmentKey: department.replace(" ", ""),
            employee_id: be.employee_id,
          });

          // add department employee to removeFromDepartment
          setRemoveFromDepartment((prev) => ({
            ...prev,
            department: department.replace(" ", ""),
            employee_id: be.employee_id,
          }));

          const blacklistEmployeeListIndex = employeeList.findIndex(
            (el) => el.employee_id === be.employee_id
          );
          employeeList = employeeList.splice(blacklistEmployeeListIndex, 1);
        }
        return be;
      });

      // ------------------------ terminated employee -----------------------
      const terminatedEmployee = await axiosConfig.get("MoveTo/GetTerminated");
      terminatedEmployee.data.map(async (be) => {
        const terminatedEmployeeExist = employeeList.find(
          (e) => e.employee_id === be.employee_id
        );
        if (terminatedEmployeeExist) {
          // get terminated employee department
          const employeePosition = terminatedEmployeeExist.position;
          const employeePositionArr = employeePosition.split("");
          const employeePositionIndex = employeePositionArr.findIndex(
            (ep) => ep === "("
          );
          const department = employeePosition.substring(
            employeePositionIndex + 1,
            employeePosition.length - 1
          );

          // remove employee to its department to database
          await axiosConfig.post("RemoveFromDepartment", {
            departmentKey: department.replace(" ", ""),
            employee_id: be.employee_id,
          });

          // add department employee to removeFromDepartment
          setRemoveFromDepartment((prev) => ({
            ...prev,
            department: department.replace(" ", ""),
            employee_id: be.employee_id,
          }));
        }
        return be;
      });

      // ------------------------ resigned employee -----------------------
      const resignedEmployee = await axiosConfig.get("MoveTo/GetResigned");
      resignedEmployee.data.map(async (be) => {
        const resignedEmployeeExist = employeeList.find(
          (e) => e.employee_id === be.employee_id
        );
        if (resignedEmployeeExist) {
          // get resigned employee department
          const employeePosition = resignedEmployeeExist.position;
          const employeePositionArr = employeePosition.split("");
          const employeePositionIndex = employeePositionArr.findIndex(
            (ep) => ep === "("
          );
          const department = employeePosition.substring(
            employeePositionIndex + 1,
            employeePosition.length - 1
          );

          // remove employee to its department to database
          await axiosConfig.post("RemoveFromDepartment", {
            departmentKey: department.replace(" ", ""),
            employee_id: be.employee_id,
          });

          // add department employee to removeFromDepartment
          setRemoveFromDepartment((prev) => ({
            ...prev,
            department: department.replace(" ", ""),
            employee_id: be.employee_id,
          }));
        }
        return be;
      });

      console.log("employees: ", employeeList);
      await axiosConfig.post("/Department", employeeList);
    };

    addEmployeeToDepartment();
  }, [employees]);

  // add employee to its dedicated department to redux
  useEffect(() => {
    const getEmployee = async () => {
      const { data } = await axiosConfig.get("Department/departmentEmployee");

      data.map((e) => {
        const removeCloseParenthesis = e.position.replace(")", "");
        const arr = removeCloseParenthesis.split("");
        const getLastWordIndex = arr.findIndex((c) => c === "(");
        const getLastWord = removeCloseParenthesis.substring(
          getLastWordIndex + 1
        );
        dispatch(
          updateEmployeeDepartmentActions(
            removeFromDepartment.department,
            removeFromDepartment.employee_id
          )
        );
        dispatch(departmentsActions(getLastWord, e, data));
        return e;
      });
    };

    getEmployee();
  }, [dispatch, removeFromDepartment]);

  return (
    <div className="admin_Router">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Applicants} />
          <Route path="/Employee" component={Employee_Router} />
          <Route path="/NewAdmin" component={NewAdmin} />
          <Route path="/Department" component={Department} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default Admin_Router;
