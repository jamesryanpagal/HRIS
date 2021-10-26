// ------------------ model ---------------
const Applicants = require("../Model/Applicants_Model");
const Screening = require("../Model/Screening_Model");
const Interview = require("../Model/Interview_Model");

// assign application applicant
const assignApplicationApplicantController = async (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  const option = { new: true };
  try {
    const getApplicantData = await Applicants.findById(id);

    if (getApplicantData.assignedBy !== "N/A") {
      res.json("Already assigned");
      return;
    }

    const updateApplicant = await Applicants.findByIdAndUpdate(
      id,
      { assignedBy: updates.adminName },
      option
    );
    res.json(updateApplicant);
  } catch (error) {
    res.json(error.message);
  }
};

// unassign application applicant
const unassignApplicationApplicantController = async (req, res) => {
  const id = req.params.id;
  const option = { new: true };
  try {
    const unAssignApplicant = await Applicants.findByIdAndUpdate(
      id,
      { assignedBy: "N/A" },
      option
    );
    res.json(unAssignApplicant._id);
  } catch (error) {
    res.json(error.message);
  }
};

// assign screening applicant
const assignScreeningApplicantController = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const option = { new: true };
  try {
    const getApplicantData = await Screening.findById(id);

    if (getApplicantData.assignedBy !== "N/A") {
      res.json("Already assigned");
      return;
    }

    const updateApplicant = await Screening.findByIdAndUpdate(
      id,
      { assignedBy: updates.adminName },
      option
    );
    res.json(updateApplicant);
  } catch (error) {
    res.json(error.message);
  }
};

// unassign screening applicant
const unassignScreeningApplicantController = async (req, res) => {
  const id = req.params.id;
  const option = { new: true };
  try {
    const unAssignApplicant = await Screening.findByIdAndUpdate(
      id,
      { assignedBy: "N/A" },
      option
    );
    res.json(unAssignApplicant._id);
  } catch (error) {
    res.json(error.message);
  }
};

// assign interview applicant
const assignInterviewApplicantController = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const option = { new: true };
  try {
    const getApplicantData = await Interview.findById(id);

    if (getApplicantData.assignedBy !== "N/A") {
      res.json("Already assigned");
      return;
    }

    const updateApplicant = await Interview.findByIdAndUpdate(
      id,
      { assignedBy: updates.adminName },
      option
    );
    res.json(updateApplicant);
  } catch (error) {
    res.json(error.message);
  }
};

// unassign interview applicant
const unassignInterviewApplicantController = async (req, res) => {
  const id = req.params.id;
  const option = { new: true };
  try {
    const unAssignApplicant = await Interview.findByIdAndUpdate(
      id,
      { assignedBy: "N/A" },
      option
    );
    res.json(unAssignApplicant._id);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  assignApplicationApplicantController,
  unassignApplicationApplicantController,
  assignScreeningApplicantController,
  unassignScreeningApplicantController,
  assignInterviewApplicantController,
  unassignInterviewApplicantController,
};
