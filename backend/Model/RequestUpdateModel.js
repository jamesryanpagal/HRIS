const mongoose = require("mongoose");
const schema = mongoose.Schema;

const requestUpdateSchema = new schema(
  {
    Employee_number: {
      type: String,
      required: true,
    },
    Employee_image: {
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

const RequestUpdate = mongoose.model("requestupdates", requestUpdateSchema);
module.exports = RequestUpdate;
