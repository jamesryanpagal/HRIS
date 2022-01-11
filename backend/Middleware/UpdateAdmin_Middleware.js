// ------------ MODAL -----------------
const GS_Users = require("../Model/Users_Model");

// update password middleware
const updatePasswordMiddleware = async (req, res, next) => {
  const id = req.params.id;
  const { oldpassword, newpassword, confirmpassword } = req.body;

  const error = { isError: true, errorMessage: "" };

  try {
    const admin = await GS_Users.findById(id);
    const checkPassword = await admin.verifyPassword(oldpassword);

    // check old password
    if (!checkPassword) {
      error.errorMessage = "Wrong password!";
      res.json(error);
      return;
    }

    if (newpassword.length < 8) {
      error.errorMessage = "Password too short!";
      res.json(error);
      return;
    }

    // match new and confirm password
    if (newpassword !== confirmpassword) {
      error.errorMessage = "Password don't matched!";
      res.json(error);
      return;
    }

    next();
  } catch (error) {
    res.json(error.message);
  }
};

// update username middleware
const updateUsernameMiddleware = async (req, res, next) => {
  const { Username } = req.body;
  const error = { isError: true, errorMessage: "" };
  try {
    // check username if it has number
    const regexForUsername = /[0-9]/g;
    if (regexForUsername.test(Username)) {
      error.errorMessage = "Invalid username";
      res.json(error);
      return;
    }

    // check if username already existed
    const checkUsername = await GS_Users.findOne({ Username });
    if (checkUsername) {
      error.errorMessage = "Username already been taken";
      res.json(error);
      return;
    }

    next();
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { updatePasswordMiddleware, updateUsernameMiddleware };
