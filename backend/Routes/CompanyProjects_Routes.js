const router = require("express").Router();

// controller
const {
  companyProjectController,
  getProjectList,
  findProject,
  updateProject,
} = require("../Controller/CompanyProjects_Controller");

router.route("/").post(companyProjectController);

router.route("/getProjectList").get(getProjectList);

router.route("/findProject/:id").get(findProject);

router.route("/updateProject/:id").patch(updateProject);

module.exports = router;
