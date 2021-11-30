const router = require("express").Router();

// Controller
const {
  moveToBlacklistController,
  getBlacklistEmployeeController,
  moveToTerminatedController,
  getTerminatedEmployeeController,
  moveToResignedController,
  getResignedEmployeeController,
} = require("../Controller/Moveto_Controller");

// move to blacklist
router.route("/Blacklist").post(moveToBlacklistController);

// move to terminated
router.route("/Terminated").post(moveToTerminatedController);

// move to resigned
router.route("/Resigned").post(moveToResignedController);

// get blacklist employee
router.route("/GetBlacklist").get(getBlacklistEmployeeController);

// get terminated employee
router.route("/GetTerminated").get(getTerminatedEmployeeController);

// get resigned
router.route("/GetResigned").get(getResignedEmployeeController);

module.exports = router;
