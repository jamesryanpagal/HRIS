// ---------- MODEL ------------
const Hires = require("../Model/Hires_Model");
const Employees = require("../Model/Employees_Model");

const uploadEmployeesController = async (req, res) => {
  const error = { isError: false, id: [] };

  const { uploads } = req.body;
  uploads.sort((a, b) => {
    if (a.Employee_id > b.Employee_id) return 1;
    if (a.Employee_id < b.Employee_id) return -1;
    return 0;
  });

  // hired employees container
  const getHires = await Hires.find();

  // search for already existed employees
  uploads.map((u) => {
    const exist = getHires.find(
      (h) => h.employee_id === u.Employee_id.toString()
    );
    if (exist) {
      error.isError = true;
      error.id.push(exist.employee_id);
    }
  });

  if (error.isError) {
    res.json(error);
    return;
  }

  // employees container
  const getEmployees = await Employees.find();

  // search for already existed employees
  uploads.map((u) => {
    const exist = getEmployees.find(
      (e) => e.employee_id === u.Employee_id.toString()
    );

    if (exist) {
      error.isError = true;
      error.id.push(exist.employee_id);
    }
  });

  if (error.isError) {
    res.json(error);
    return;
  }

  uploads.map(async (e, i) => {
    try {
      await Hires.create({
        applicant_id: `Excel ${i}`,
        employee_id: e.Employee_id,
        lastname: e.Lastname,
        firstname: e.Firstname,
        middle: e.Middle,
        phone: e.Phone,
        birthday: e.Birthday,
        gender: e.Gender,
        address: e.Address,
        email: e.Email,
        position: e.Position,
        civil_status: e.Civil_status,
        spouce_fullname: e.Spouse_fullname,
        spouce_birthday: e.Spouse_birthday,
        spouce_contact_number: e.Spouse_contact_number,
        religion: e.Religion,
        bloodtype: e.Bloodtype,
        height: e.Height,
        weight: e.Weight,
        guardian: e.Guardian,
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  res.json("Employee/s successfully added!");
};

module.exports = { uploadEmployeesController };
