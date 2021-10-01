// ---------------------- MODEL -------------------
const Applicants = require("../Model/Applicants_Model");

// GET ALL APPLICANTS
const getApplicants = async (req, res) => {
  try {
    const getAllApplicants = await Applicants.find();
    res.json(getAllApplicants);
  } catch (error) {
    res.json(error.message);
  }
};

// REMOVE APPLICANT
const removeApplicant = async (req, res) => {
  const applicantId = req.params;
  try {
    const removeApplicant = await Applicants.findByIdAndDelete(applicantId.id);
    res.json(removeApplicant);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { getApplicants, removeApplicant };
