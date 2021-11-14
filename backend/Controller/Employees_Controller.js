// ------------------- MODEL -----------------
const Employees = require("../Model/Employees_Model");
const Hires = require("../Model/Hires_Model");

const date = new Date();

const employeeList = async (req, res) => {
  let hiredContainer = [];
  try {
    // get applicant from hires
    const getHired = await Hires.find();
    // move hires data inside hiredContainer array
    getHired.map((e) => {
      if (hiredContainer.find((a) => a._id === e._id)) {
        hiredContainer = [...hiredContainer];
      }

      hiredContainer = [...hiredContainer, e];
    });

    // move to Employees
    hiredContainer.map(async (e, i) => {
      try {
        await Employees.create({
          employee_id: `${date.getFullYear()}${date.getMonth() + 1}${i + 1}`,
          employee_image: "N/A",
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          contract: "N/A",
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });

    // get Employee list
    const getEmployeeList = await Employees.find();
    res.json(getEmployeeList);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { employeeList };
