const router = require("express").Router();

// Middleware
const {
  updatePasswordMiddleware,
} = require("../Middleware/UpdateAdmin_Middleware");

// Controller
const {
  updateUsername,
  updatePassword,
  deleteAdmin,
} = require("../Controller/UpdateAdmin_Controller");

// update username
router.route("/:id").patch(updateUsername);

// update password
router
  .route("/updatePassword/:id")
  .patch(updatePasswordMiddleware, updatePassword);

// delete admin
router.route("/deleteAdmin/:name").delete(deleteAdmin);

module.exports = router;
