// --------- MODEL ----------
const GS_Users = require("../Model/Users_Model");

// sync admin
const syncAdminController = async (req, res) => {
  const { id } = req.body;
  const options = { new: true };
  try {
    // admin details
    const user = await GS_Users.findOne({ Employee_number: id });

    // remove to admin
    await GS_Users.findByIdAndDelete(user._id);

    // super admin details
    const superAdmin = await GS_Users.findOne({ Admin_type: "SuperAdmin" });

    // set super admin
    const setSuperAdmin = await GS_Users.findByIdAndUpdate(
      superAdmin._id,
      {
        Employee_number: user.Employee_number,
        Username: user.Username,
        Employee_image: user.Employee_image,
      },
      options
    );
    res.json(setSuperAdmin);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { syncAdminController };
