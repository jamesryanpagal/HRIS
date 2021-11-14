const router = require("express").Router();

// controller
const {
  addToDepartment,
  getDepartmentEmployee,
  updateEmployeeDepartment_PresidentsOffice,
  updateEmployeeDepartment_Administration,
  updateEmployeeDepartment_Auditing,
  updateEmployeeDepartment_Cashier,
  updateEmployeeDepartment_Clinic,
  updateEmployeeDepartment_Communications,
  updateEmployeeDepartment_Construction,
  updateEmployeeDepartment_Engineering,
  updateEmployeeDepartment_Fabrication,
  updateEmployeeDepartment_GMSD,
  updateEmployeeDepartment_Motorpool,
  updateEmployeeDepartment_HumanResource,
  updateEmployeeDepartment_Marketing,
  updateEmployeeDepartment_it,
  updateEmployeeDepartment_Operations,
  updateEmployeeDepartment_PPC,
  updateEmployeeDepartment_Purchasing,
  updateEmployeeDepartment_QAQC,
  updateEmployeeDepartment_Warehouse,
  updateEmployeeDepartment_Finishing,
  updateEmployeeDepartment_Security,
  updateEmployeeDepartment_Suites,
  updateEmployeeDetails_PRESIDENTSOFFICE,
  updateEmployeeDetails_ADMINISTRATION,
  updateEmployeeDetails_AUDITING,
  updateEmployeeDetails_CASHIER,
  updateEmployeeDetails_CLINIC,
  updateEmployeeDetails_COMMUNICATIONS,
  updateEmployeeDetails_CONSTRUCTION,
  updateEmployeeDetails_ENGINEERING,
  updateEmployeeDetails_FABRICATION,
  updateEmployeeDetails_GMSD,
  updateEmployeeDetails_MOTORPOOL,
  updateEmployeeDetails_HUMANRESOURCE,
  updateEmployeeDetails_MARKETING,
  updateEmployeeDetails_IT,
  updateEmployeeDetails_OPERATIONS,
  updateEmployeeDetails_PPC,
  updateEmployeeDetails_PURCHASING,
  updateEmployeeDetails_QAQC,
  updateEmployeeDetails_WAREHOUSE,
  updateEmployeeDetails_FINISHING,
  updateEmployeeDetails_SECURITY,
  updateEmployeeDetails_SUITES,
} = require("../Controller/Department_Controller");

// add employee to its department
router.route("/").post(addToDepartment);

// get department employee
router.route("/departmentEmployee").get(getDepartmentEmployee);

// update employee department PresidentsOffice
router
  .route("/updateEmployeeDepartment_PRESIDENTSOFFICE/:id")
  .delete(updateEmployeeDepartment_PresidentsOffice);

// update employee department Administration
router
  .route("/updateEmployeeDepartment_ADMINISTRATION/:id")
  .delete(updateEmployeeDepartment_Administration);

// update employee department Auditing
router
  .route("/updateEmployeeDepartment_AUDITING/:id")
  .delete(updateEmployeeDepartment_Auditing);

// update employee department Cashier
router
  .route("/updateEmployeeDepartment_CASHIER/:id")
  .delete(updateEmployeeDepartment_Cashier);

// update employee department Clinic
router
  .route("/updateEmployeeDepartment_CLINIC/:id")
  .delete(updateEmployeeDepartment_Clinic);

// update employee department Communications
router
  .route("/updateEmployeeDepartment_COMMUNICATIONS/:id")
  .delete(updateEmployeeDepartment_Communications);

// update employee department Construction
router
  .route("/updateEmployeeDepartment_CONSTRUCTION/:id")
  .delete(updateEmployeeDepartment_Construction);

// update employee department Engineering
router
  .route("/updateEmployeeDepartment_ENGINEERING/:id")
  .delete(updateEmployeeDepartment_Engineering);

// update employee department Fabrication
router
  .route("/updateEmployeeDepartment_FABRICATION/:id")
  .delete(updateEmployeeDepartment_Fabrication);

// update employee department GMSD
router
  .route("/updateEmployeeDepartment_GMSD/:id")
  .delete(updateEmployeeDepartment_GMSD);

// update employee department Motorpool
router
  .route("/updateEmployeeDepartment_MOTORPOOL/:id")
  .delete(updateEmployeeDepartment_Motorpool);

// update employee department HumanResource
router
  .route("/updateEmployeeDepartment_HUMANRESOURCE/:id")
  .delete(updateEmployeeDepartment_HumanResource);

// update employee department Marketing
router
  .route("/updateEmployeeDepartment_MARKETING/:id")
  .delete(updateEmployeeDepartment_Marketing);

// update employee department it
router
  .route("/updateEmployeeDepartment_IT/:id")
  .delete(updateEmployeeDepartment_it);

// update employee department Operations
router
  .route("/updateEmployeeDepartment_OPERATIONS/:id")
  .delete(updateEmployeeDepartment_Operations);

// update employee department PPC
router
  .route("/updateEmployeeDepartment_PPC/:id")
  .delete(updateEmployeeDepartment_PPC);

// update employee department Purchasing
router
  .route("/updateEmployeeDepartment_PURCHASING/:id")
  .delete(updateEmployeeDepartment_Purchasing);

// update employee department QAQC
router
  .route("/updateEmployeeDepartment_QAQC/:id")
  .delete(updateEmployeeDepartment_QAQC);

// update employee department Warehouse
router
  .route("/updateEmployeeDepartment_WAREHOUSE/:id")
  .delete(updateEmployeeDepartment_Warehouse);

// update employee department Finishing
router
  .route("/updateEmployeeDepartment_FINISHING/:id")
  .delete(updateEmployeeDepartment_Finishing);

// update employee department Security
router
  .route("/updateEmployeeDepartment_SECURITY/:id")
  .delete(updateEmployeeDepartment_Security);

// update employee department Suites
router
  .route("/updateEmployeeDepartment_SUITES/:id")
  .delete(updateEmployeeDepartment_Suites);

// ------------------ update details ------------------
router
  .route("/updateDetails_PRESIDENTSOFFICE/:id")
  .patch(updateEmployeeDetails_PRESIDENTSOFFICE);

router
  .route("/updateDetails_ADMINISTRATION/:id")
  .patch(updateEmployeeDetails_ADMINISTRATION);

router
  .route("/updateDetails_AUDITING/:id")
  .patch(updateEmployeeDetails_AUDITING);

router.route("/updateDetails_CASHIER/:id").patch(updateEmployeeDetails_CASHIER);

router.route("/updateDetails_CLINIC/:id").patch(updateEmployeeDetails_CLINIC);

router
  .route("/updateDetails_COMMUNICATIONS/:id")
  .patch(updateEmployeeDetails_COMMUNICATIONS);

router
  .route("/updateDetails_CONSTRUCTION/:id")
  .patch(updateEmployeeDetails_CONSTRUCTION);

router
  .route("/updateDetails_ENGINEERING/:id")
  .patch(updateEmployeeDetails_ENGINEERING);

router
  .route("/updateDetails_FABRICATION/:id")
  .patch(updateEmployeeDetails_FABRICATION);

router.route("/updateDetails_GMSD/:id").patch(updateEmployeeDetails_GMSD);

router
  .route("/updateDetails_MOTORPOOL/:id")
  .patch(updateEmployeeDetails_MOTORPOOL);

router
  .route("/updateDetails_HUMANRESOURCE/:id")
  .patch(updateEmployeeDetails_HUMANRESOURCE);

router
  .route("/updateDetails_MARKETING/:id")
  .patch(updateEmployeeDetails_MARKETING);

router.route("/updateDetails_IT/:id").patch(updateEmployeeDetails_IT);

router
  .route("/updateDetails_OPERATIONS/:id")
  .patch(updateEmployeeDetails_OPERATIONS);

router.route("/updateDetails_PPC/:id").patch(updateEmployeeDetails_PPC);

router
  .route("/updateDetails_PURCHASING/:id")
  .patch(updateEmployeeDetails_PURCHASING);

router.route("/updateDetails_QAQC/:id").patch(updateEmployeeDetails_QAQC);

router
  .route("/updateDetails_WAREHOUSE/:id")
  .patch(updateEmployeeDetails_WAREHOUSE);

router
  .route("/updateDetails_FINISHING/:id")
  .patch(updateEmployeeDetails_FINISHING);

router
  .route("/updateDetails_SECURITY/:id")
  .patch(updateEmployeeDetails_SECURITY);

router.route("/updateDetails_SUITES/:id").patch(updateEmployeeDetails_SUITES);

module.exports = router;
