// ---------------------- MODEL -------------------
const Applicants = require("../Model/Applicants_Model");

const getApplicants = async (req, res) => {
  try {
    const getAllApplicants = await Applicants.find();
    res.json(getAllApplicants);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { getApplicants };
