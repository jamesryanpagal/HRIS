// ----------- MODEL -----------
const Users = require("../Model/Users_Model");

const confirmPassword = async (req, res) => {
  const { id, password } = req.body;
  const error = { isError: true, errorMessage: "" };
  try {
    const user = await Users.findById(id);
    const checkPassword = await user.verifyPassword(password);
    if (!checkPassword) {
      error.errorMessage = "Incorrect password";
      res.json(error);
      return;
    }

    res.json(checkPassword);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { confirmPassword };
