// --------- MODEL ----------
const ArchiveAdmin = require("../Model/ArchiveAdminModel");

// get archive admin
const archiveAdmins = async (req, res) => {
  try {
    const admins = await ArchiveAdmin.find();
    res.json(admins);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { archiveAdmins };
