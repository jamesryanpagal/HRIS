const router = require("express").Router();

// ------------------------- MIDDLEWARE ------------------------------------
const {
  GSusers_Signin_Middleware,
} = require("../Middleware/GS_Users_Signin_Middleware");

// ------------------------- CONTROLLER ------------------------------------
const {
  GSusers_Signin_Controller,
} = require("../Controller/GS_Users_Signin_Controller");

router.route("/").post(GSusers_Signin_Middleware, GSusers_Signin_Controller);

module.exports = router;
