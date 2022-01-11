// -------------- MODEL ------------
const Audittrail = require("../Model/Audittrail_Model");

const createAuditTrail = async (req, res) => {
  const { actions, subject, adminId, admin, date, time } = req.body.audittrails;
  try {
    const create_Audittrails = await Audittrail.create({
      actions,
      subject,
      adminId,
      admin,
      date,
      time,
    });
    res.json(create_Audittrails);
  } catch (error) {
    res.json(error.message);
  }
};

const getAuditTrail = async (req, res) => {
  try {
    const audittrail = await Audittrail.find();
    res.json(audittrail);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { createAuditTrail, getAuditTrail };
