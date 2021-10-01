const router = require("express").Router();

// CONTROLLER
const {
  getApplicants,
  removeApplicant,
} = require("../Controller/Applicants_Controller");

// GET ALL APPLICANTS
router.route("/getApplicants").get(getApplicants);

// REMOVE APPLICANT
router.route("/removeApplicant/:id").delete(removeApplicant);

module.exports = router;
