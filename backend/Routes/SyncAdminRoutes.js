const router = require("express").Router();

// Controller
const { syncAdminController } = require("../Controller/SyncAdminController");

router.route("/").post(syncAdminController);

module.exports = router;
