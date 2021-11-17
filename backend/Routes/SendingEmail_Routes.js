const router = require("express").Router();

// Middleware
const {
  sendingEmailMiddleware,
} = require("../Middleware/SendingEmail_Middleware");

// Controller
const {
  sendingEmailController,
} = require("../Controller/SendingEmail_Controller");

router.route("/").post(sendingEmailMiddleware, sendingEmailController);

module.exports = router;
