const router = require("express").Router();

// CONTROLLER
const { getApplicants } = require("../Controller/Applicants_Controller");

router.route("/getApplicants").get(getApplicants);

module.exports = router;
