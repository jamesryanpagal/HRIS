const mongoose = require("mongoose");
const schema = mongoose.Schema;

const audittrailSchema = new schema(
  {
    actions: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    adminId: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Audittrail = mongoose.model("audittrails", audittrailSchema);
module.exports = Audittrail;
