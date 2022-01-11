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

// create super acc
const createSuperAcc = async (req, res) => {
  const { Employee_number, Admin_type, Username, Password } = req.body;
  try {
    const create = await GS_Users.create({
      Employee_image: "N/A",
      Employee_number,
      Admin_type,
      IsDisabled: false,
      Username,
      Password,
    });

    res.json(create);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { GSuser_Login_Controller, createSuperAcc };
