const router = require("express").Router();

// Middleware
const {
  updatePasswordMiddleware,
  updateUsernameMiddleware,
} = require("../Middleware/UpdateAdmin_Middleware");

// Controller
const {
  updateUsername,
  updatePassword,
} = require("../Controller/UpdateAdmin_Controller");

// update username
router.route("/:id").patch(updateUsernameMiddleware, updateUsername);

// update password
router
  .route("/updatePassword/:id")
  .patch(updatePasswordMiddleware, updatePassword);

module.exports = router;
