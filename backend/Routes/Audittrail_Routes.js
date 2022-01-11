const router = require("express").Router();

// Controller
const {
  createAuditTrail,
  getAuditTrail,
} = require("../Controller/AudittrailController");

// create audittrail
router.route("/").post(createAuditTrail);

// get audittrail
router.route("/getAudittrail").get(getAuditTrail);

module.exports = router;
