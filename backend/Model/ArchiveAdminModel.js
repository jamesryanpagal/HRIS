const mongoose = require("mongoose");
const schema = mongoose.Schema;

const archiveAdminSchema = new schema(
  {
    Employee_image: {
      type: String,
      required: true,
    },
    Employee_number: {
      type: String,
      required: true,
    },
    Admin_type: {
      type: String,
      required: true,
    },
    Username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ArchiveAdmin = mongoose.model("archiveadmins", archiveAdminSchema);
module.exports = ArchiveAdmin;
