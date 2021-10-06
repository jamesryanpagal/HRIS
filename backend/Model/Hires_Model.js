const mongoose = require("mongoose");
const schema = mongoose.Schema;

const hiresSchema = new schema(
  {
    applicant_id: {
      type: String,
      required: true,
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

const Hires = mongoose.model("hires", hiresSchema);
module.exports = Hires;
