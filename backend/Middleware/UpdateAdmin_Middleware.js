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

module.exports = { updatePasswordMiddleware };
