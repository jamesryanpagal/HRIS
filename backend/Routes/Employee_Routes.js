const router = require("express").Router();

// ------------------- CONTROLLER -------------------
const { employeeList } = require("../Controller/Employees_Controller");

// GET EMPLOYEE LIST
router.route("/employeeList").get(employeeList);

module.exports = router;
