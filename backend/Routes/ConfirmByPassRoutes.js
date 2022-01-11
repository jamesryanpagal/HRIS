const router = require("express").Router();

// CONTROLLER
const { confirmPassword } = require("../Controller/ConfirmByPassController");

router.route("/").post(confirmPassword);

module.exports = router;
