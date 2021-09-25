const router = require("express").Router();

// --------------------------- MIDDLEWARE ----------------------
const {
  GSusers_Login_Middleware,
} = require("../Middleware/GS_Users_Login_Middleware");

// --------------------------- MIDDLEWARE ----------------------
const {
  GSuser_Login_Controller,
} = require("../Controller/GS_Users_Login_Controller");

router.route("/").post(GSusers_Login_Middleware, GSuser_Login_Controller);

module.exports = router;
