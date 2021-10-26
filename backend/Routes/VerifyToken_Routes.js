const router = require("express").Router();

// Middleware
const {
  verifyTokenMiddleware,
} = require("../Middleware/VerifyToken_Middleware");

// Controller
const {
  verifyTokenController,
} = require("../Controller/VeriyToken_Controller");

router.route("/").get(verifyTokenMiddleware, verifyTokenController);

module.exports = router;
