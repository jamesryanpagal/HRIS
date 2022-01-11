const router = require("express").Router();

// Controller
const {
  addNewUsers_Controller,
  checkNewAdminAcc,
  getAllNewAdmin_Controller,
  deleteNewAdmin_Controller,
} = require("../Controller/NewUsers_Controller");

// add new admin
router.route("/").post(addNewUsers_Controller);

// check create admin acc
router.route("/checkNewAdmin").post(checkNewAdminAcc);

// get all new admin
router.route("/getNewAdmin").get(getAllNewAdmin_Controller);

// disable new admin
router.route("/deleteNewAdmin/:id").post(deleteNewAdmin_Controller);

module.exports = router;
