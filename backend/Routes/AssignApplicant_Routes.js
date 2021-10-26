const router = require("express").Router();

// Controller
const {
  assignApplicationApplicantController,
  unassignApplicationApplicantController,
  assignScreeningApplicantController,
  unassignScreeningApplicantController,
  assignInterviewApplicantController,
  unassignInterviewApplicantController,
} = require("../Controller/AssignApplicant_Controller");

// assign application applicant
router
  .route("/assignApplicationApplicant/:id")
  .patch(assignApplicationApplicantController);

// unassign application applicant
router
  .route("/unassignApplicationApplicant/:id")
  .patch(unassignApplicationApplicantController);

// assign screening applicant
router
  .route("/assignScreeningApplicant/:id")
  .patch(assignScreeningApplicantController);

// unassign screening applicant
router
  .route("/unassignScreeningApplicant/:id")
  .patch(unassignScreeningApplicantController);

// assign interview applicant
router
  .route("/assignInterviewApplicant/:id")
  .patch(assignInterviewApplicantController);

// unassign interview applicant
router
  .route("/unassignInterviewApplicant/:id")
  .patch(unassignInterviewApplicantController);

module.exports = router;
