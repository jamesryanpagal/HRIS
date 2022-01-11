const router = require("express").Router();

// Controller
const {
  sendAccDetailsController,
} = require("../Controller/SendAccDetailsController");

router.route("/").post(sendAccDetailsController);

module.exports = router;
