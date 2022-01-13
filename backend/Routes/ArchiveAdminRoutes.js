const router = require("express").Router();

// Controller
const { archiveAdmins } = require("../Controller/ArchiveAdminController");

router.route("/").get(archiveAdmins);

module.exports = router;
