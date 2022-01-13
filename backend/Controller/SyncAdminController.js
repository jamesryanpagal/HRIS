// --------- MODEL ----------
const GS_Users = require("../Model/Users_Model");
const ArchiveAdmin = require("../Model/ArchiveAdminModel");

// sync admin
const syncAdminController = async (req, res) => {
  const {
    newAdmin_id,
    formerAdmin_id,
    formerAdmin_Name,
    formerAdmin_Image,
    formerAdmin_Type,
  } = req.body.syncDetails;
  const options = { new: true };
  try {
    // admin details
    const user = await GS_Users.findOne({ Employee_number: newAdmin_id });

    // add former admin to archive admin
    if (formerAdmin_id !== "000000") {
      await ArchiveAdmin.create({
        Employee_image: formerAdmin_Image,
        Employee_number: formerAdmin_id,
        Admin_type: formerAdmin_Type,
        Username: formerAdmin_Name,
      });
    }

    // add admin to archive admin
    await ArchiveAdmin.create({
      Employee_image: user.Employee_image,
      Employee_number: user.Employee_number,
      Admin_type: user.Admin_type,
      Username: user.Username,
    });

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
