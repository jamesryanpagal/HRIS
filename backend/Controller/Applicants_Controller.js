// ---------------------- MODEL -------------------
const Applicants = require("../Model/Applicants_Model");
const Screening = require("../Model/Screening_Model");

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

module.exports = {
  getApplicants,
  removeApplicant,
  acceptApplicant,
  getApplicantScreening,
};
