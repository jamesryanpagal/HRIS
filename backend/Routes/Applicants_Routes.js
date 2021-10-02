const router = require("express").Router();

// CONTROLLER
const {
  getApplicants,
  removeApplicant,
  acceptApplicant,
  getApplicantScreening,
} = require("../Controller/Applicants_Controller");

// GET ALL APPLICANTS
router.route("/getApplicants").get(getApplicants);

// REMOVE APPLICANT
router.route("/removeApplicant/:id").delete(removeApplicant);

// ACCEPT APPLICANT
router.route("/acceptApplicant").post(acceptApplicant);

// GET ALL APPLICANT FROM SCREENING
router.route("/getApplicantScreening").get(getApplicantScreening);

module.exports = router;
