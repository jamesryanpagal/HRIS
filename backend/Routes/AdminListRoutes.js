const router = require("express").Router();

// Controller
const { adminListController } = require("../Controller/AdminListController");

router.route("/").get(adminListController);

module.exports = router;
