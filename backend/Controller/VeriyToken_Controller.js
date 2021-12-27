// --------------------------- model -----------------
const Users = require("../Model/Users_Model");
const Employees = require("../Model/Employees_Model");

const verifyTokenController = async (req, res) => {
  const { id } = req.user;
  try {
    const getAdminDetails = await Users.findById(id);

    let adminDetails = { _id: "", Employee_image: "", Username: "" };
    const employeeDetails = await Employees.findOne({
      employee_id: getAdminDetails.Employee_number,
    });

    if (employeeDetails) {
      adminDetails._id = id;
      adminDetails.Employee_image = employeeDetails.employee_image;
      adminDetails.Username = getAdminDetails.Username;
    } else {
      adminDetails._id = id;
      adminDetails.Employee_image = getAdminDetails.Employee_image;
      adminDetails.Username = getAdminDetails.Username;
    }
    res.json(adminDetails);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { verifyTokenController };
