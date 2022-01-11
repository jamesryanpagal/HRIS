const router = require("express").Router();

// Controller
const {
  disableAdmin,
  enableAdmin,
  removeAdmin,
} = require("../Controller/DisableEnableAdminController");

// disable admin
router.route("/disable").post(disableAdmin);

// enable admin
router.route("/enable").post(enableAdmin);

// remove admin
router.route("/remove").post(removeAdmin);

module.exports = router;
