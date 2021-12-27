// ------------------------------ MODEL --------------------------------
const GS_Users = require("../Model/Users_Model");
const Employees = require("../Model/Employees_Model");

const newUsers_Middleware = async (req, res, next) => {
  const { Employee_number, Username, Password, ConfirmPassword } = req.body;

  try {
    const error = { error: true, errorMessage: "" };

    // ---------------------------------- CHECK INPUT FIELDS --------------------------
    if (!Employee_number || !Username || !Password) {
      error.errorMessage = "Please fill out all the input fields";
      res.json(error);
      return;
    }

    // ---------------------------------- CHECK EMP NUMBER ----------------------------
    // const empNumRegExp = /^[20]{2}[0-9]{2}[0-9]{2}[0-9]+$/;
    // const testEmployeeNumber = empNumRegExp.test(Employee_number);

    // if (!testEmployeeNumber) {
    //   error.errorMessage = "Invalid employee number";
    //   res.json(error);
    //   return;
    // }

    const empNumExist = await Employees.findOne({
      employee_id: Employee_number,
    });
    if (!empNumExist) {
      error.errorMessage = "Employee number not found!";
      res.json(error);
      return;
    }

    // ---------------------------------- CHECK USERNAME ----------------------------
    const regexForUsername = /[0-9]/g;
    const checkUsername = regexForUsername.test(Username);

    if (checkUsername) {
      error.errorMessage = "Invalid Username";
      res.json(error);
      return;
    }

    const userNameExist = await GS_Users.findOne({ Username });
    if (userNameExist) {
      error.errorMessage = "Username already been taken";
      res.json(error);
      return;
    }

    // ---------------------------------- CHECK PASSWORD ----------------------------

    if (Password.length <= 5) {
      error.errorMessage = "Password to short!";
      res.json(error);
      return;
    }

    if (Password !== ConfirmPassword) {
      error.errorMessage = "Password don't matched";
      res.json(error);
      return;
    }

    next();
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { newUsers_Middleware };
