// ------------------------------- MODEL ------------------------
const GS_Users = require("../Model/Users_Model");

const GSuser_Login_Controller = async (req, res) => {
  const { Employee_number } = req.user;
  try {
    const findUser = await GS_Users.findOne({ Employee_number });

    const createUserToken = await findUser.createToken();
    res.json(createUserToken);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { GSuser_Login_Controller };
