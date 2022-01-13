// --------- MODEL ----------
const GS_Users = require("../Model/Users_Model");

// assign admin
const assignAdmin = async (req, res) => {
  const { id } = req.body;
  const options = { new: true };
  try {
    const existingTempAdmin = await GS_Users.findOne({
      Admin_type: "TempAdmin",
    });
    if (existingTempAdmin) {
      await GS_Users.findByIdAndUpdate(existingTempAdmin._id, {
        Admin_type: "Admin",
      });
    }

    // get admin details
    const admin = await GS_Users.findOne({ Employee_number: id });

    // set admin to temp admin
    const setTemp = await GS_Users.findByIdAndUpdate(
      admin._id,
      { Admin_type: "TempAdmin" },
      options
    );
    res.json(setTemp);
  } catch (error) {
    res.json(error.message);
  }
};

// unassign admin
const unassignAdmin = async (req, res) => {
  const { id } = req.body;
  const options = { new: true };
  try {
    // get admin
    const admin = await GS_Users.findOne({ Employee_number: id });

    // unset admin to temp admin
    const unSetTemp = await GS_Users.findByIdAndUpdate(
      admin._id,
      { Admin_type: "Admin" },
      options
    );
    res.json(unSetTemp);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { assignAdmin, unassignAdmin };
