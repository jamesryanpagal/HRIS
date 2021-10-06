const router = require("express").Router();

// CONTROLLER
const {
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
} = require("../Controller/Applicants_Controller");

// GET ALL APPLICANTS
router.route("/getApplicants").get(getApplicants);

// REMOVE APPLICANT
router.route("/removeApplicant/:id").post(removeApplicant);

// ACCEPT APPLICANT
router.route("/acceptApplicant").post(acceptApplicant);

// GET ALL APPLICANT FROM SCREENING
router.route("/getApplicantScreening").get(getApplicantScreening);

// REMOVE APPLICANT FROM SCREENING
router.route("/removeApplicantScreening/:id").post(removeApplicantScreening);

// ACCEPT APPLICANT FROM SCREENING
router.route("/acceptApplicantScreening").post(acceptApplicantScreening);

// GET ALL APPLICANT FROM INTERVIEW
router.route("/getApplicantInterview").get(getApplicantInterview);

// REMOVE APPLICANT FROM INTERVIEW
router.route("/removeApplicantInterview/:id").post(removeApplicantInterview);

// GET ALL APPLICANT FROM HIRED
router.route("/getApplicantHired").get(getApplicantHired);

// HIRED APPLICANT
router.route("/hiredApplicant").post(hiredApplicant);

// GET ALL APPLICANT REJECTED
router.route("/getApplicantRejected").get(getApplicantRejected);

module.exports = router;
