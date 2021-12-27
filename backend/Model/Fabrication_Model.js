const mongoose = require("mongoose");
const schema = mongoose.Schema;

const fabricationSchema = new schema(
  {
    employee_id: {
      type: String,
      required: true,
      unique: true,
    },
    employee_image: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    middle: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Fabrication = mongoose.model("fabrications", fabricationSchema);
module.exports = Fabrication;
