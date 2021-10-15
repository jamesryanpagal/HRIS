const mongoose = require("mongoose");
const schema = mongoose.Schema;

const interviewSchema = new schema(
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
    resume: {
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
    education: {
      type: String,
      required: true,
    },
    hobbies: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("interviews", interviewSchema);
module.exports = Interview;
