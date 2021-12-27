// ------------ MODEL --------
const GS_Users = require("../Model/Users_Model");

const adminListController = async (req, res) => {
  try {
    const adminList = await GS_Users.find();
    res.json(adminList);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { adminListController };
