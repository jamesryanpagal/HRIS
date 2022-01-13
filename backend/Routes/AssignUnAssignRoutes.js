const router = require("express").Router();

// Controller
const {
  assignAdmin,
  unassignAdmin,
} = require("../Controller/AssignUnAssignController");

// assign
router.route("/assign").post(assignAdmin);

// unassign
router.route("/unassign").post(unassignAdmin);

module.exports = router;
