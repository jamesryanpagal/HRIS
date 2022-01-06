const mongoose = require("mongoose");
const schema = mongoose.Schema;

const hiresSchema = new schema(
  {
    applicant_id: {
      type: String,
      required: true,
      unique: true,
    },
    employee_id: {
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
    datehired: {
      type: String,
      required: true,
    },
    sssno: {
      type: String,
      required: true,
    },
    tin: {
      type: String,
      required: true,
    },
    pagibig: {
      type: String,
      required: true,
    },
    philhealth: {
      type: String,
      required: true,
    },
    biometricIdno: {
      type: String,
      required: true,
    },
    infotrackIdno: {
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
