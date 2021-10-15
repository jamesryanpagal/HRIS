// ---------------------- MODEL -------------------
const Applicants = require("../Model/Applicants_Model");
const Screening = require("../Model/Screening_Model");
const Interview = require("../Model/Interview_Model");
const Hires = require("../Model/Hires_Model");
const Rejects = require("../Model/Rejects_Model");

// -------------------- GET ALL APPLICANTS ------------------------
const getApplicants = async (req, res) => {
  try {
    const getAllApplicants = await Applicants.find();
    res.json(getAllApplicants);
  } catch (error) {
    res.json(error.message);
  }
};

// -------------------- REMOVE APPLICANT --------------------
const removeApplicant = async (req, res) => {
  const applicantId = req.params;
  try {
    // get applicant from Applicants
    const getApplicant = await Applicants.findById(applicantId.id);
    // destructure the data
    const {
      _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    } = getApplicant;
    // move to Rejects
    await Rejects.create({
      applicant_id: _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    });
    // remove applicant from Applicants
    const removeApplicant = await Applicants.findByIdAndDelete(applicantId.id);
    res.json(removeApplicant);
  } catch (error) {
    res.json(error.message);
  }
};

// -------------------- MOVE APPLICANT TO SCREENING --------------------
const acceptApplicant = async (req, res) => {
  const { applicantId } = req.body;

  try {
    // get applicant from Applicants table
    const getApplicant = await Applicants.findById(applicantId);
    // desctructure applicant data
    const {
      _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    } = getApplicant;

    // move to screening
    await Screening.create({
      applicant_id: _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    });

    // remove applicant from Applicants table
    const removeApplicant = await Applicants.findByIdAndDelete(applicantId);
    res.json(removeApplicant);
  } catch (error) {
    res.json(error.message);
  }
};

// ----------------- GET ALL APPLICANT FROM SCREENING ----------------
const getApplicantScreening = async (req, res) => {
  try {
    const getAllApplicantScreening = await Screening.find();
    res.json(getAllApplicantScreening);
  } catch (error) {
    res.json(error.message);
  }
};

// --------------------- REMOVE APPLICANT SCREENING -----------------
const removeApplicantScreening = async (req, res) => {
  const { id } = req.params;
  try {
    // get applicant from Screening
    const getApplicant = await Screening.findById(id);
    // destructure the data
    const {
      _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    } = getApplicant;
    // move to Rejects
    await Rejects.create({
      applicant_id: _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    });
    // remove from Screening
    const removeApplicant_Screening = await Screening.findByIdAndDelete(id);
    res.json(removeApplicant_Screening);
  } catch (error) {
    res.json(error.message);
  }
};

// ---------------------- MOVE APPLICANT TO INTERVIEW ------------------
const acceptApplicantScreening = async (req, res) => {
  const { applicantId } = req.body;
  try {
    // get applicant from applicant screening
    const getApplicantScreening = await Screening.findById(applicantId);
    // desctructure applicant data
    const {
      _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    } = getApplicantScreening;

    // move to interview
    await Interview.create({
      applicant_id: _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    });

    // remove applicant from Screening
    const removeApplicant = await Screening.findByIdAndDelete(applicantId);
    res.json(removeApplicant);
  } catch (error) {
    res.json(error.message);
  }
};

// GET ALL APLICANT FROM INTERVIEW
const getApplicantInterview = async (req, res) => {
  try {
    const getAllApplicantInterview = await Interview.find();
    res.json(getAllApplicantInterview);
  } catch (error) {
    res.json(error.message);
  }
};

// ------------------------ REMOVE APPLICANT INTERVIEW ---------------------
const removeApplicantInterview = async (req, res) => {
  const { id } = req.params;
  try {
    // get applicant from Interview
    const getApplicant = await Interview.findById(id);
    // destructure the data
    const {
      _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    } = getApplicant;
    // move to Rejects
    await Rejects.create({
      applicant_id: _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    });
    // remove from Interview
    const removeApplicant_Interview = await Interview.findByIdAndDelete(id);
    res.json(removeApplicant_Interview);
  } catch (error) {
    res.json(error.message);
  }
};

// ---------------------- HIRED APPLICANT -------------------
const hiredApplicant = async (req, res) => {
  const { applicantId } = req.body;
  try {
    // get applicant from interview
    const getApplicantInterview = await Interview.findById(applicantId);
    // destructure data
    const {
      _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    } = getApplicantInterview;

    // move to hired
    await Hires.create({
      applicant_id: _id,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
    });
    // remove applicant from interview
    const removeApplicant = await Interview.findByIdAndDelete(applicantId);
    res.json(removeApplicant);
  } catch (error) {
    res.json(error.message);
  }
};

// --------------------- GET ALL APPLICANT FROM HIRED --------------------
const getApplicantHired = async (req, res) => {
  try {
    const getApplicant_Hired = await Hires.find();
    res.json(getApplicant_Hired);
  } catch (error) {
    res.json(error.message);
  }
};

// ----------------------- GET ALL APPLICANT FROM REJECTED ---------------
const getApplicantRejected = async (req, res) => {
  try {
    const getApplicant_Rejects = await Rejects.find();
    res.json(getApplicant_Rejects);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  getApplicants,
  removeApplicant,
  acceptApplicant,
  getApplicantScreening,
  removeApplicantScreening,
  acceptApplicantScreening,
  getApplicantInterview,
  removeApplicantInterview,
  hiredApplicant,
  getApplicantHired,
  getApplicantRejected,
};
