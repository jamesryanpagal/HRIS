// ------------------- MODEL -----------------
const Employees = require("../Model/Employees_Model");
const Hires = require("../Model/Hires_Model");
const Blacklist = require("../Model/Blacklist_Model");
const Terminate = require("../Model/Terminated_Model");
const Resigned = require("../Model/Resigned_Model");

const date = new Date();

const monthName = date.toLocaleString("default", { month: "short" });

const employeeList = async (req, res) => {
  let hiredContainer = [];
  try {
    // get applicant from hires
    const getHired = await Hires.find();

    // move hires data inside hiredContainer array
    getHired.map((e) => {
      if (hiredContainer.find((a) => a._id === e._id)) {
        hiredContainer = [...hiredContainer];
      }

      hiredContainer = [...hiredContainer, e];
    });

    // ---------------------- FOR BLACKLIST ----------------

    // get blacklist employee
    const getBlacklist = await Blacklist.find();

    // remove blacklist employee to Employees table
    getBlacklist.map(async (b) => {
      // check if blacklist employee exist in hiredContainer
      const blacklistEmployee = hiredContainer.find(
        (h) => h.applicant_id === b.hiredId
      );

      if (blacklistEmployee) {
        // find hired employee who exist in blacklist to employees table
        const getEmployee = await Employees.findOne({
          hiredId: blacklistEmployee.applicant_id,
        });

        // remove employee from Employees table
        if (getEmployee) {
          await Employees.findByIdAndDelete(getEmployee._id);
        }
      }
    });

    // remove blacklist employee to hiredContainer
    getBlacklist.map((b) => {
      const blacklistEmployee = hiredContainer.findIndex(
        (h) => h.applicant_id === b.hiredId
      );
      hiredContainer.splice(blacklistEmployee, 1);
    });

    // ---------------------- FOR TERMINATE ----------------

    // get terminate employee
    const getTerminate = await Terminate.find();

    // remove terminate employee to Employees table
    getTerminate.map(async (b) => {
      // check if terminate employee exist in hiredContainer
      const terminateEmployee = hiredContainer.find(
        (h) => h.applicant_id === b.hiredId
      );

      if (terminateEmployee) {
        // find hired employee who exist in terminate to employees table
        const getEmployee = await Employees.findOne({
          hiredId: terminateEmployee.applicant_id,
        });

        // remove employee from Employees table
        if (getEmployee) {
          await Employees.findByIdAndDelete(getEmployee._id);
        }
      }
    });

    // remove terminate employee to hiredContainer
    getTerminate.map((b) => {
      const terminateEmployee = hiredContainer.findIndex(
        (h) => h.applicant_id === b.hiredId
      );
      hiredContainer.splice(terminateEmployee, 1);
    });

    // ---------------------- FOR RESIGNED ----------------

    // get resigned employee
    const getResigned = await Resigned.find();

    // remove resigned employee to Employees table
    getResigned.map(async (b) => {
      // check if resigned employee exist in hiredContainer
      const resignedEmployee = hiredContainer.find(
        (h) => h.applicant_id === b.hiredId
      );

      if (resignedEmployee) {
        // find hired employee who exist in resigned to employees table
        const getEmployee = await Employees.findOne({
          hiredId: resignedEmployee.applicant_id,
        });

        // remove employee from Employees table
        if (getEmployee) {
          await Employees.findByIdAndDelete(getEmployee._id);
        }
      }
    });

    // remove resigned employee to hiredContainer
    getResigned.map((b) => {
      const resignedEmployee = hiredContainer.findIndex(
        (h) => h.applicant_id === b.hiredId
      );
      hiredContainer.splice(resignedEmployee, 1);
    });

    // move to Employees
    hiredContainer.map(async (e) => {
      const index = getHired.findIndex(
        (gh) => gh.applicant_id === e.applicant_id
      );
      try {
        await Employees.create({
          hiredId: e.applicant_id,
          employee_id:
            e.employee_id !== "N/A"
              ? e.employee_id
              : `${date.getFullYear()}${date.getMonth() + 1}${index + 1}`,
          employee_image: "N/A",
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          contract: "N/A",
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          datehired:
            e.datehired === "N/A"
              ? `${monthName} ${date.getDate()}, ${date.getFullYear()}`
              : e.datehired,
          sssno: e.sssno,
          tin: e.tin,
          pagibig: e.pagibig,
          philhealth: e.philhealth,
          biometricIdno: e.biometricIdno,
          infotrackIdno: e.infotrackIdno,
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });

    // get Employee list
    const getEmployeeList = await Employees.find();
    res.json(getEmployeeList);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { employeeList };
