// ------------------------------ MODEL -------------------
const GS_Users = require("../Model/Users_Model");

const GSusers_Login_Middleware = async (req, res, next) => {
  const { Employee_number, Password } = req.body;

  try {
    const error = { error: true, errorMessage: "" };

    // ---------------------------- FIND USER -----------------------------
    const findUser = await GS_Users.findOne({ Employee_number });

    if (!findUser) {
      error.errorMessage = "Incorrect Employee number or Password";
      res.json(error);
      return;
    }

    if (findUser.IsDisabled) {
      error.errorMessage = "Your account has been disabled";
      res.json(error);
      return;
    }

    // --------------------------- VERIFY PASSWORD --------------------------
    const checkPassword = await findUser.verifyPassword(Password);
    if (!checkPassword) {
      error.errorMessage = "Incorrect Employee number or Password";
      res.json(error);
      return;
    }

    req.user = {
      Employee_number,
    };

    next();
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { GSusers_Login_Middleware };
