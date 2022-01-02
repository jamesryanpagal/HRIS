const router = require("express").Router();

// Controller
const {
  uploadEmployeesController,
} = require("../Controller/UploadEmployees_Controller");

router.route("/").post(uploadEmployeesController);

module.exports = router;
