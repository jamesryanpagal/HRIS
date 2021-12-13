// ------------------- MODEL -----------------
const PresidentsOffice = require("../Model/PresidentsOffice_Model");
const Administration = require("../Model/Administration_Model");
const Auditing = require("../Model/Auditing_Model");
const Cashier = require("../Model/Cashier_Model");
const Clinic = require("../Model/Clinic_Model");
const Communications = require("../Model/Communication_Model");
const Construction = require("../Model/Construction_Model");
const Engineering = require("../Model/Engineering_Model");
const Fabrication = require("../Model/Fabrication_Model");
const Gmsd = require("../Model/GMSD_Model");
const Motorpool = require("../Model/Motorpool_Model");
const Humanresource = require("../Model/HumanResource_Model");
const Marketing = require("../Model/Marketing_Model");
const It = require("../Model/IT_Model");
const Operation = require("../Model/Operations_Model");
const Ppc = require("../Model/PPC_Model");
const Purchasing = require("../Model/Purchasing_Model");
const Qaqc = require("../Model/QAQC_Model");
const Warehouse = require("../Model/Warehouse_Model");
const Finishing = require("../Model/Finishing_Model");
const Security = require("../Model/Security_model");
const Suites = require("../Model/Suites_Model");

const removeEmployeeFromDepartment = async (req, res) => {
  const { departmentKey, employee_id } = req.body;
  try {
    // ---------------- FOR PRESIDENTSOFFICE ------------------
    if (departmentKey === "PRESIDENTSOFFICE") {
      const employee = await PresidentsOffice.findOne({ employee_id });
      const removePresident = await PresidentsOffice.findByIdAndDelete(
        employee._id
      );
      res.json(removePresident);
    }
    // ---------------- FOR ADMINISTRATION ------------------
    if (departmentKey === "ADMINISTRATION") {
      const employee = await Administration.findOne({ employee_id });
      await Administration.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR AUDITING ------------------
    if (departmentKey === "AUDITING") {
      const employee = await Auditing.findOne({ employee_id });
      const remove = await Auditing.findByIdAndDelete(employee._id);
      res.json(remove);
    }
    // ---------------- FOR CASHIER ------------------
    if (departmentKey === "CASHIER") {
      const employee = await Cashier.findOne({ employee_id });
      await Cashier.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR CLINIC ------------------
    if (departmentKey === "CLINIC") {
      const employee = await Clinic.findOne({ employee_id });
      await Clinic.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR COMMUNICATIONS ------------------
    if (departmentKey === "COMMUNICATIONS") {
      const employee = await Communications.findOne({ employee_id });
      await Communications.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR CONSTRUCTION ------------------
    if (departmentKey === "CONSTRUCTION") {
      const employee = await Construction.findOne({ employee_id });
      await Construction.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR ENGINEERING ------------------
    if (departmentKey === "ENGINEERING") {
      const employee = await Engineering.findOne({ employee_id });
      await Engineering.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR FABRICATION ------------------
    if (departmentKey === "FABRICATION") {
      const employee = await Fabrication.findOne({ employee_id });
      await Fabrication.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR GMSD ------------------
    if (departmentKey === "GMSD") {
      const employee = await Gmsd.findOne({ employee_id });
      await Gmsd.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR MOTORPOOL ------------------
    if (departmentKey === "MOTORPOOL") {
      const employee = await Motorpool.findOne({ employee_id });
      await Motorpool.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR HUMANRESOURCE ------------------
    if (departmentKey === "HUMANRESOURCE") {
      const employee = await Humanresource.findOne({ employee_id });
      await Humanresource.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR MARKETING ------------------
    if (departmentKey === "MARKETING") {
      const employee = await Marketing.findOne({ employee_id });
      await Marketing.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR IT ------------------
    if (departmentKey === "IT") {
      const employee = await It.findOne({ employee_id });
      await It.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR OPERATIONS ------------------
    if (departmentKey === "OPERATIONS") {
      const employee = await Operation.findOne({ employee_id });
      await Operation.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR PPC ------------------
    if (departmentKey === "PPC") {
      const employee = await Ppc.findOne({ employee_id });
      await Ppc.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR PURCHASING ------------------
    if (departmentKey === "PURCHASING") {
      const employee = await Purchasing.findOne({ employee_id });
      await Purchasing.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR QAQC ------------------
    if (departmentKey === "QAQC") {
      const employee = await Qaqc.findOne({ employee_id });
      await Qaqc.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR WAREHOUSE ------------------
    if (departmentKey === "WAREHOUSE") {
      const employee = await Warehouse.findOne({ employee_id });
      await Warehouse.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR FINISHING ------------------
    if (departmentKey === "FINISHING") {
      const employee = await Finishing.findOne({ employee_id });
      await Finishing.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR SECURITY ------------------
    if (departmentKey === "SECURITY") {
      const employee = await Security.findOne({ employee_id });
      await Security.findByIdAndDelete(employee._id);
      res.json("removed");
    }
    // ---------------- FOR SUITES ------------------
    if (departmentKey === "SUITES") {
      const employee = await Suites.findOne({ employee_id });
      await Suites.findByIdAndDelete(employee._id);
      res.json("removed");
    }
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { removeEmployeeFromDepartment };
