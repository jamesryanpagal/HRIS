const mongoose = require("mongoose");
const schema = mongoose.Schema;

const resignedSchema = new schema(
  {
    hiredId: {
      type: String,
      required: true,
      unique: true,
    },
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
    phone: {
      type: String,
      required: true,
    },
    contract: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    civil_status: {
      type: String,
      required: true,
    },
    spouce_fullname: {
      type: String,
      required: true,
    },
    spouce_birthday: {
      type: String,
      required: true,
    },
    spouce_contact_number: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    bloodtype: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    guardian: {
      type: String,
      required: true,
    },
    date_hired: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resigned = mongoose.model("Resigns", resignedSchema);
module.exports = Resigned;
