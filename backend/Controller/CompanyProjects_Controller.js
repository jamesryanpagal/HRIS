// ------------------- MODEL ----------------
const CompanyProjects = require("../Model/CompanyProjects_Model");

// CREATE COMPANY PROJECT
const companyProjectController = async (req, res) => {
  const {
    projectImage,
    projectId,
    projectTitle,
    projectStartDate,
    projectEndDate,
    siteProjectManager,
    department,
    location,
    siteEmployees,
  } = req.body;
  try {
    const createCompanyProjects = await CompanyProjects.create({
      projectImage: !projectImage ? "N/A" : projectImage,
      projectId,
      projectTitle,
      projectStartDate,
      projectEndDate,
      siteProjectManager,
      department,
      location,
      siteEmployees: siteEmployees.map((se) => {
        return se;
      }),
    });
    res.json(createCompanyProjects);
  } catch (error) {
    res.json(error.message);
  }
};

// GET ALL COMPANY PROJECT
const getProjectList = async (req, res) => {
  try {
    const projectList = await CompanyProjects.find();
    res.json(projectList);
  } catch (error) {
    res.json(error.message);
  }
};

// FIND PROJECT
const findProject = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await CompanyProjects.findById(id);
    res.json(project);
  } catch (error) {
    res.json(error.message);
  }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const options = { new: true };
  try {
    const edit = await CompanyProjects.findByIdAndUpdate(id, update, options);
    res.json(edit);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  companyProjectController,
  getProjectList,
  findProject,
  updateProject,
};
