// ----------------- model ----------------
const Users = require("../Model/Users_Model");
const Employees = require("../Model/Employees_Model");

// add new admin
const addNewUsers_Controller = async (req, res) => {
  const { employee_number, username, password } = req.body.newAdminDetails;
  try {
    const createNewAdmin = await Users.create({
      Employee_image: "N/A",
      Employee_number: employee_number,
      Admin_type: "Admin",
      IsDisabled: false,
      Username: username,
      Password: password,
    });

    res.json(createNewAdmin);
  } catch (error) {
    res.json(error.message);
  }
};

// check new admin acc
const checkNewAdminAcc = async (req, res) => {
  const { employee_number, username } = req.body.newAdminDetails;
  const error = { isError: true, errorMessage: "" };
  try {
    // check employee it doesn't exist in employee list
    const checkEmpNum = await Employees.findOne({
      employee_id: employee_number,
    });
    if (!checkEmpNum) {
      error.errorMessage = "Employee number not found!";
      res.json(error);
      return;
    }

    // check employee number if its already exist in admin list
    const checkEmpNumAdmin = await Users.findOne({
      Employee_number: employee_number,
    });
    if (checkEmpNumAdmin) {
      error.errorMessage = "Employee is already an admin";
      res.json(error);
      return;
    }

    // check username if already exist
    const checkUsername = await Users.findOne({ Username: username });
    if (checkUsername) {
      error.errorMessage = "Username already been taken";
      res.json(error);
      return;
    }

    res.json(true);
  } catch (error) {
    res.json(error.message);
  }
};

// get all new admin
const getAllNewAdmin_Controller = async (req, res) => {
  try {
    const admins = await Users.find();
    res.json(admins);
  } catch (error) {
    res.json(error.message);
  }
};

// delete new admin
const deleteNewAdmin_Controller = async (req, res) => {
  const id = req.params.id;
  try {
    res.json(id);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  addNewUsers_Controller,
  checkNewAdminAcc,
  getAllNewAdmin_Controller,
  deleteNewAdmin_Controller,
};
