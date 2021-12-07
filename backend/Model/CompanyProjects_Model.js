const mongoose = require("mongoose");
const schema = mongoose.Schema;

const companyProjectSchema = new schema(
  {
    projectImage: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectStartDate: {
      type: String,
      required: true,
    },
    projectEndDate: {
      type: String,
      required: true,
    },
    siteProjectManager: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    siteEmployees: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CompanyProjects = mongoose.model("companyprojects", companyProjectSchema);
module.exports = CompanyProjects;
