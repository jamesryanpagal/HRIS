import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import IdleTimer from "react-idle-timer";

//components
import Navbar from "../Navbar/Navbar";
import AdminSettings from "../AdminSettings/AdminSettings";
import Applicants from "../Applicants/Applicants";
import Employee_Router from "../Employee/Employee_Router/Employee_Router";
import Department from "../Department/Department";
import CompanyProject from "../CompanyProjects/CompanyProject";
import Schedules from "../Schedules/Schedules";
import UploadCurrEmployee from "../UploadCurrentEmloyee/UploadCurrEmployee";
import AuditTrails from "../AuditTrails/AuditTrails";
import PageNotFound from "../../PageNotFound/PageNotFound";

// redux actions
import {
  departmentsActions,
  updateEmployeeDepartmentActions,
  noUpdatesActions,
  removeUsertokenActions,
} from "../../../Redux/Redux_actions/actions";

//css
import "./Admin_Router.css";

const Admin_Router = () => {
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
      const removeSpaces = getDepartment.toLowerCase().replace(" ", "");
      const removeDot = removeSpaces.toLowerCase().replace(".", "");
      const removeSpecialChar = removeDot.toLowerCase().replace("/", "");
      const employeeDepartment = removeSpecialChar;
      for (let key in departmentRedux) {
        if (key !== employeeDepartment) {
          const employeeExist = departmentRedux[key].find(
            (d) => d.employee_id === e.employee_id
          );
          if (employeeExist) {
            const { data } = await axiosConfig.delete(
              `/Department/updateEmployeeDepartment_${key.toUpperCase()}/${
                employeeExist._id
              }`
            );
            console.log(data);
            dispatch(
              updateEmployeeDepartmentActions(
                key === "qaqc"
                  ? "QA/QC"
                  : key === "it"
                  ? "I.T"
                  : key.toUpperCase(),
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
          const getDepartment = employeePosition.substring(
            employeePositionIndex + 1,
            employeePosition.length - 1
          );

          const removeSpace = getDepartment.replace(" ", "");
          const removeDot = removeSpace.replace(".", "");
          const removeSpecialChar = removeDot.replace("/", "");
          const department = removeSpecialChar;

          // remove employee to its department to database
          await axiosConfig.post("RemoveFromDepartment", {
            departmentKey: department,
            employee_id: be.employee_id,
          });

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
          const getDepartment = employeePosition.substring(
            employeePositionIndex + 1,
            employeePosition.length - 1
          );

          const removeSpace = getDepartment.replace(" ", "");
          const removeDot = removeSpace.replace(".", "");
          const removeSpecialChar = removeDot.replace("/", "");
          const department = removeSpecialChar;

          // remove employee to its department to database
          await axiosConfig.post("RemoveFromDepartment", {
            departmentKey: department,
            employee_id: be.employee_id,
          });

          const terminatedEmployeeListIndex = employeeList.findIndex(
            (el) => el.employee_id === be.employee_id
          );
          employeeList = employeeList.splice(terminatedEmployeeListIndex, 1);
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
          const getDepartment = employeePosition.substring(
            employeePositionIndex + 1,
            employeePosition.length - 1
          );

          const removeSpace = getDepartment.replace(" ", "");
          const removeDot = removeSpace.replace(".", "");
          const removeSpecialChar = removeDot.replace("/", "");
          const department = removeSpecialChar;

          // remove employee to its department to database
          await axiosConfig.post("RemoveFromDepartment", {
            departmentKey: department,
            employee_id: be.employee_id,
          });

          const resignedEmployeeListIndex = employeeList.findIndex(
            (el) => el.employee_id === be.employee_id
          );
          employeeList = employeeList.splice(resignedEmployeeListIndex, 1);
        }
        return be;
      });

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
          departmentsActions(
            getLastWord,
            {
              _id: e._id,
              employee_image: e.employee_image,
              lastname: e.lastname,
              firstname: e.firstname,
              middle: e.middle,
              employee_id: e.employee_id,
              position: e.position,
            },
            data
          )
        );
        return e;
      });
    };

    getEmployee();
  }, [dispatch]);

  // remove blacklist, terminated and resigned employee to its department
  useEffect(() => {
    const getBlacklisted = async () => {
      let removeEmployeeArr = [];
      try {
        const blacklistEmployee = await axiosConfig.get("MoveTo/GetBlacklist");
        const terminatedEmployee = await axiosConfig.get(
          "MoveTo/GetTerminated"
        );
        const resignedEmployee = await axiosConfig.get("MoveTo/GetResigned");
        removeEmployeeArr = [
          ...blacklistEmployee.data,
          ...terminatedEmployee.data,
          ...resignedEmployee.data,
        ];
        removeEmployeeArr.map((e) => {
          const departmentArr = e.position.split("");
          const getDepartment = departmentArr.findIndex((d) => d === "(");
          const department = e.position.substring(
            getDepartment + 1,
            e.position.length - 1
          );
          dispatch(
            updateEmployeeDepartmentActions(
              department.replace(" ", ""),
              e.employee_id
            )
          );
          return e;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getBlacklisted();
  }, [dispatch]);

  // idle logout
  const handleIdleLogOut = () => {
    dispatch(removeUsertokenActions());
  };

  return (
    <div className="admin_Router">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Applicants} />
          <Route path="/Employee" component={Employee_Router} />
          <Route path="/Department" component={Department} />
          <Route path="/Companyprojects" component={CompanyProject} />
          <Route path="/Schedules" component={Schedules} />
          <Route path="/Adminsettings/:id" component={AdminSettings} />
          <Route path="/UploadCurrentEmployee" component={UploadCurrEmployee} />
          <Route path="/Audittrail" component={AuditTrails} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
      <IdleTimer timeout={600000} onIdle={handleIdleLogOut}></IdleTimer>
    </div>
  );
};

export default Admin_Router;
