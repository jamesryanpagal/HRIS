const router = require("express").Router();

// Controller
const {
  removeEmployeeFromDepartment,
} = require("../Controller/RemoveFromDepartment_Controller");

router.route("/").post(removeEmployeeFromDepartment);

module.exports = router;
