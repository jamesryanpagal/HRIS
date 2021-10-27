const router = require("express").Router();

// Middleware
const { newUsers_Middleware } = require("../Middleware/NewUsers_Middleware");

// Controller
const {
  addNewUsers_Controller,
  getAllNewAdmin_Controller,
  acceptNewAdmin_Controller,
  deleteNewAdmin_Controller,
} = require("../Controller/NewUsers_Controller");

// add new admin
router.route("/").post(newUsers_Middleware, addNewUsers_Controller);

// get all new admin
router.route("/getNewAdmin").get(getAllNewAdmin_Controller);

// accept new admin
router.route("/acceptNewAdmin/:id").post(acceptNewAdmin_Controller);

// delete new admin
router.route("/deleteNewAdmin/:id").post(deleteNewAdmin_Controller);

module.exports = router;
