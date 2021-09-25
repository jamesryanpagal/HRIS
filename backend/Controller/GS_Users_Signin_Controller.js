// -------------------------- MODEL ---------------------
const GS_Users = require("../Model/Users_Model");

const GSusers_Signin_Controller = async (req, res) => {
  const { Employee_number, Email, Username, Password } = req.body;

  try {
    // ----------------------- CREATE USER ------------------------
    const createUser = await GS_Users.create({
      Employee_number,
      Email,
      Username,
      Password,
    });

    // ----------------------- CREATE USER TOKEN -------------------
    const createUserToken = await createUser.createToken();
    res.json(createUserToken);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { GSusers_Signin_Controller };
