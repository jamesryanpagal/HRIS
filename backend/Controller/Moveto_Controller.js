// ----------------- MODEL ----------------
const Employees = require("../Model/Employees_Model");
const Blacklist = require("../Model/Blacklist_Model");
const Terminated = require("../Model/Terminated_Model");
const Resigned = require("../Model/Resigned_Model");

const moveToBlacklistController = async (req, res) => {
  const { employee_id, reason } = req.body;
  try {
    // get employee from Employees
    const employee = await Employees.findOne({ employee_id });
    // move to blacklist
    await Blacklist.create({
      hiredId: employee.hiredId,
      employee_id: employee.employee_id,
      employee_image: employee.employee_image,
      lastname: employee.lastname,
      firstname: employee.firstname,
      middle: employee.middle,
      phone: employee.phone,
      contract: employee.contract,
      birthday: employee.birthday,
      gender: employee.gender,
      address: employee.address,
      email: employee.email,
      position: employee.position,
      civil_status: employee.civil_status,
      spouce_fullname: employee.spouce_fullname,
      spouce_birthday: employee.spouce_birthday,
      spouce_contact_number: employee.spouce_contact_number,
      religion: employee.religion,
      bloodtype: employee.bloodtype,
      height: employee.height,
      weight: employee.weight,
      guardian: employee.guardian,
      datehired: employee.datehired,
      reason,
    });

    // remove employee to employees
    await Employees.findByIdAndDelete(employee._id);
    res.json("moved");
  } catch (error) {
    res.json(error.message);
  }
};

// get blacklist employee
const getBlacklistEmployeeController = async (req, res) => {
  try {
    const getBlacklist = await Blacklist.find();
    res.json(getBlacklist);
  } catch (error) {
    res.json(error.message);
  }
};

// const move to terminated
const moveToTerminatedController = async (req, res) => {
  const { employee_id, reason } = req.body;
  try {
    // get employee from Employees
    const employee = await Employees.findOne({ employee_id });
    // move to blacklist
    await Terminated.create({
      hiredId: employee.hiredId,
      employee_id: employee.employee_id,
      employee_image: employee.employee_image,
      lastname: employee.lastname,
      firstname: employee.firstname,
      middle: employee.middle,
      phone: employee.phone,
      contract: employee.contract,
      birthday: employee.birthday,
      gender: employee.gender,
      address: employee.address,
      email: employee.email,
      position: employee.position,
      civil_status: employee.civil_status,
      spouce_fullname: employee.spouce_fullname,
      spouce_birthday: employee.spouce_birthday,
      spouce_contact_number: employee.spouce_contact_number,
      religion: employee.religion,
      bloodtype: employee.bloodtype,
      height: employee.height,
      weight: employee.weight,
      guardian: employee.guardian,
      datehired: employee.datehired,
      reason,
    });

    // remove employee to employees
    await Employees.findByIdAndDelete(employee._id);
    res.json("moved");
  } catch (error) {
    res.json(error.message);
  }
};

// get terminated employee
const getTerminatedEmployeeController = async (req, res) => {
  try {
    const getTerminated = await Terminated.find();
    res.json(getTerminated);
  } catch (error) {
    res.json(error.message);
  }
};

// const move to resigned
const moveToResignedController = async (req, res) => {
  const { employee_id, reason } = req.body;
  try {
    // get employee from Employees
    const employee = await Employees.findOne({ employee_id });
    // move to blacklist
    await Resigned.create({
      hiredId: employee.hiredId,
      employee_id: employee.employee_id,
      employee_image: employee.employee_image,
      lastname: employee.lastname,
      firstname: employee.firstname,
      middle: employee.middle,
      phone: employee.phone,
      contract: employee.contract,
      birthday: employee.birthday,
      gender: employee.gender,
      address: employee.address,
      email: employee.email,
      position: employee.position,
      civil_status: employee.civil_status,
      spouce_fullname: employee.spouce_fullname,
      spouce_birthday: employee.spouce_birthday,
      spouce_contact_number: employee.spouce_contact_number,
      religion: employee.religion,
      bloodtype: employee.bloodtype,
      height: employee.height,
      weight: employee.weight,
      guardian: employee.guardian,
      datehired: employee.datehired,
      reason,
    });

    // remove employee to employees
    await Employees.findByIdAndDelete(employee._id);
    res.json("moved");
  } catch (error) {
    res.json(error.message);
  }
};

// get resigned employee
const getResignedEmployeeController = async (req, res) => {
  try {
    const getResigned = await Resigned.find();
    res.json(getResigned);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  moveToBlacklistController,
  getBlacklistEmployeeController,
  moveToTerminatedController,
  getTerminatedEmployeeController,
  moveToResignedController,
  getResignedEmployeeController,
};
