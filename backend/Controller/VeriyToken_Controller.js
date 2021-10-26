// --------------------------- model -----------------
const Users = require("../Model/Users_Model");

const verifyTokenController = async (req, res) => {
  const { id } = req.user;
  try {
    const getAdminDetails = await Users.findById(id);
    res.json(getAdminDetails);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { verifyTokenController };
