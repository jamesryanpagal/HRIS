// ------------------------------ MODEL --------------------------------
const GS_Users = require("../Model/Users_Model");

const GSusers_Signin_Middleware = async (req, res, next) => {
  const { Employee_number, Email, Username, Password, ConfirmPassword } =
    req.body;

  try {
    const error = { error: true, errorMessage: "" };

    // ---------------------------------- CHECK INPUT FIELDS --------------------------
    if (!Employee_number || !Email || !Username || !Password) {
      error.errorMessage = "Please fill out all the input fields";
      res.json(error);
      return;
    }

    // ---------------------------------- CHECK EMP NUMBER ----------------------------
    const empNumRegExp = /^[20]{2}[0-9]{2}-[0-9]{2}-[0-9]+$/;
    const testEmployeeNumber = empNumRegExp.test(Employee_number);

    if (!testEmployeeNumber) {
      error.errorMessage = "Invalid employee number";
      res.json(error);
      return;
    }

    const empNumExist = await GS_Users.findOne({ Employee_number });
    if (empNumExist) {
      error.errorMessage = "Employee number already been taken";
      res.json(error);
      return;
    }

    // ---------------------------------- CHECK EMAIL ----------------------------
    const emailExist = await GS_Users.findOne({ Email });
    if (emailExist) {
      error.errorMessage = "Email aldready been taken";
      res.json(error);
      return;
    }

    // ---------------------------------- CHECK USERNAME ----------------------------
    if (
      Username.includes(
        "1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0"
      )
    ) {
      error.errorMessage = "Invalid username";
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

module.exports = { GSusers_Signin_Middleware };
