require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const cors = require("cors");
const mongoose = require("mongoose");

// IMPORT ROUTES
const GSUsersLoginRoutes = require("./Routes/GS_Users_Login_Routes");
const ApplicantsRoutes = require("./Routes/Applicants_Routes");
const EmployeeRoutes = require("./Routes/Employee_Routes");
const VerifyTokenRoutes = require("./Routes/VerifyToken_Routes");
const AssignApplicantRoutes = require("./Routes/AssignApplicant_Routes");
const NewUsersRoutes = require("./Routes/NewUsers_Routes");
const DepartmentRoutes = require("./Routes/Department_Routes");
const SendingEmailRoutes = require("./Routes/SendingEmail_Routes");
const MoveToRoutes = require("./Routes/Moveto_Routes");
const RemoveFromDepartment = require("./Routes/RemoveFromDepartment_Routes");
const CompanyProjects = require("./Routes/CompanyProjects_Routes");
const SchedulesRoutes = require("./Routes/Schedules_Routes");
const AdminListRoutes = require("./Routes/AdminListRoutes");
const UpdateAdminRoutes = require("./Routes/UpdateAdmin_Routes");

// PORT NUMBER
const PORT = process.env.PORT || 8080;
// PATH
const path = require("path");

// server middleware
app.use(cors());
app.use(express.json());

// --------------------------- CONNECT TO MONGGODB ----------------------
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => console.log("connected to mongodb"));

// ----------------------------- ROUTES -----------------------------------
app.use("/GSUserLogin", GSUsersLoginRoutes);
app.use("/Applicants", ApplicantsRoutes);
app.use("/Employee", EmployeeRoutes);
app.use("/VerifyToken", VerifyTokenRoutes);
app.use("/AssignApplicant", AssignApplicantRoutes);
app.use("/NewUsers", NewUsersRoutes);
app.use("/Department", DepartmentRoutes);
app.use("/SendingEmail", SendingEmailRoutes);
app.use("/MoveTo", MoveToRoutes);
app.use("/RemoveFromDepartment", RemoveFromDepartment);
app.use("/CompanyProjects", CompanyProjects);
app.use("/Schedule", SchedulesRoutes);
app.use("/AdminList", AdminListRoutes);
app.use("/UpdateAdmin", UpdateAdminRoutes);

// -------------------------------- DEPLOYMENT ------------------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Running");
  });
}

// -------------------------------- SOCKET IO ---------------------------
// MODEL
const Applicants = require("./Model/Applicants_Model");
const Screening = require("./Model/Screening_Model");
const Interview = require("./Model/Interview_Model");
const Hires = require("./Model/Hires_Model");
const Rejects = require("./Model/Rejects_Model");
const Employees = require("./Model/Employees_Model");

io.on("connection", (socket) => {
  // APPLICANTS
  socket.on("applicants", async (data) => {
    const {
      assignedBy,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname,
      spouce_birthday,
      spouce_contact_number,
      religion,
      bloodtype,
      height,
      weight,
      guardian,
    } = data;
    const newApplicants = await Applicants.create({
      assignedBy,
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      spouce_fullname: !spouce_fullname ? "N/A" : spouce_fullname,
      spouce_birthday: !spouce_birthday ? "N/A" : spouce_birthday,
      spouce_contact_number: !spouce_contact_number
        ? "N/A"
        : spouce_contact_number,
      religion,
      bloodtype: !bloodtype ? "N/A" : bloodtype,
      height,
      weight,
      guardian,
    });
    io.emit("getApplicants", newApplicants);
  });

  // REJECT APPLICANT
  socket.on("rejectapplicant", async (id) => {
    const applicantData = await Rejects.findOne({ applicant_id: id });
    io.emit("removeApplicant", {
      id,
      applicantData: {
        _id: applicantData._id,
        assignedBy: applicantData.assignedBy,
        firstname: applicantData.firstname,
        lastname: applicantData.lastname,
        middle: applicantData.middle,
        employee_id: applicantData.employee_id,
        position: applicantData.position,
        applicant_id: applicantData.applicant_id,
      },
    });
  });

  // ACCEPT APPLICANT
  socket.on("acceptApplicant", async (id) => {
    const getApplicantData = await Screening.findOne({ applicant_id: id });
    io.emit("moveToScreening", getApplicantData);
  });

  // REJECT APPLICANT FROM SCREENING
  socket.on("rejectApplicantScreening", async (id) => {
    const applicantData = await Rejects.findOne({ applicant_id: id });
    io.emit("removeApplicantScreening", {
      id,
      applicantData: {
        _id: applicantData._id,
        assignedBy: applicantData.assignedBy,
        firstname: applicantData.firstname,
        lastname: applicantData.lastname,
        middle: applicantData.middle,
        employee_id: applicantData.employee_id,
        position: applicantData.position,
        applicant_id: applicantData.applicant_id,
      },
    });
  });

  // ACCEPT APPLICANTSCREENING
  socket.on("acceptApplicantScreening", async (id) => {
    const getApplicantData = await Interview.findOne({ applicant_id: id });
    io.emit("moveToInterview", getApplicantData);
  });

  // REJECT APPLICANTINTERVIEW
  socket.on("rejectApplicantInterview", async (id) => {
    const applicantData = await Rejects.findOne({ applicant_id: id });
    io.emit("removeApplicantInterview", {
      id,
      applicantData: {
        _id: applicantData._id,
        assignedBy: applicantData.assignedBy,
        firstname: applicantData.firstname,
        lastname: applicantData.lastname,
        middle: applicantData.middle,
        employee_id: applicantData.employee_id,
        position: applicantData.position,
        applicant_id: applicantData.applicant_id,
      },
    });
  });

  // ACCEPT APPLICANTINTERVIEW
  socket.on("acceptApplicantInterview", async (id) => {
    const getApplicantData = await Hires.findOne({ applicant_id: id });
    io.emit("moveToHired", getApplicantData);
  });

  // UPDATE EMPLOYEE DETAILS
  socket.on("editEmployeeDetails", async ({ id, data }) => {
    const option = { new: true };
    try {
      const updateEmployeeDetails = await Employees.findByIdAndUpdate(
        id,
        data,
        option
      );
      io.emit("updateEmployeeDetails", updateEmployeeDetails);
    } catch (error) {
      console.log(error.message);
    }
  });

  // ASSIGN APPLICATION APPLICANT
  socket.on("assignApplicationApplicant", ({ adminName, applicantId }) => {
    io.emit("assignedApplicationApplicant", { adminName, applicantId });
  });

  // UNASSIGN APPLICATION APPLICANT
  socket.on("unassignApplicationApplicant", ({ applicantId }) => {
    io.emit("unassignedApplicationApplicant", { applicantId });
  });

  // ASSIGN SCREENING APPLICANT
  socket.on("assignScreeningApplicant", ({ adminName, applicantId }) => {
    io.emit("assignedScreeningApplicant", { adminName, applicantId });
  });

  // UNASSIGN SCREENING APPLICANT
  socket.on("unassignScreeningApplicant", ({ applicantId }) => {
    io.emit("unassignedScreeningApplicant", { applicantId });
  });

  // ASSIGN INTERVIEW APPLICANT
  socket.on("assignInterviewApplicant", ({ adminName, applicantId }) => {
    io.emit("assignedInterviewApplicant", { adminName, applicantId });
  });

  // UNASSIGN INTERVIEW APPLICANT
  socket.on("unassignInterviewApplicant", ({ applicantId }) => {
    io.emit("unassignedInterviewApplicant", { applicantId });
  });

  // REMOVE NEW ADMIN
  socket.on("removeNewAdmin", (id) => {
    io.emit("remove_NewAdmin", id);
  });
});

// --------------------------- LISTEN TO PORT ----------------------------
http.listen(PORT, () => console.log(`running on port ${PORT}`));
