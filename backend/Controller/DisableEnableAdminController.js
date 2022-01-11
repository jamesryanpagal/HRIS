// ----------- MODEL ------------
const Users = require("../Model/Users_Model");

// disable admin
const disableAdmin = async (req, res) => {
  const { adminId } = req.body;
  const options = { new: true };
  try {
    const user = await Users.findOne({ Employee_number: adminId });
    const disable_Admin = await Users.findByIdAndUpdate(
      user._id,
      { IsDisabled: true },
      options
    );
    res.json(disable_Admin);
  } catch (error) {
    res.json(error.message);
  }
};

// enable admin
const enableAdmin = async (req, res) => {
  const { adminId } = req.body;
  const options = { new: true };
  try {
    const user = await Users.findOne({ Employee_number: adminId });
    const enable_Admin = await Users.findByIdAndUpdate(
      user._id,
      { IsDisabled: false },
      options
    );
    res.json(enable_Admin);
  } catch (error) {
    res.json(error.message);
  }
};

// remove admin
const removeAdmin = async (req, res) => {
  const { adminId } = req.body;
  try {
    const user = await Users.findOne({ Employee_number: adminId });
    if (user.Admin_type !== "SuperAdmin") {
      await Users.findByIdAndUpdate(user._id, { IsDisabled: true });
      res.json("logout");
      return;
    }
    res.json("login");
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { disableAdmin, enableAdmin, removeAdmin };
