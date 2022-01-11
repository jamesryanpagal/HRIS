const router = require("express").Router();

// --------------------------- MIDDLEWARE ----------------------
const {
  GSusers_Login_Middleware,
} = require("../Middleware/GS_Users_Login_Middleware");

// --------------------------- CONTROLLER ----------------------
const {
  GSuser_Login_Controller,
  // createSuperAcc,
} = require("../Controller/GS_Users_Login_Controller");

router.route("/").post(GSusers_Login_Middleware, GSuser_Login_Controller);

// create super admin acc
// router.route("/CreateSuperAdmin").post(createSuperAcc);

module.exports = router;
