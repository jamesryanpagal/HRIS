// ----------------- model ----------------
const NewUsers = require("../Model/NewUsers_Model");
const Users = require("../Model/Users_Model");

// add new admin
const addNewUsers_Controller = async (req, res) => {
  const { Employee_number, Email, Username, Password } = req.body;
  try {
    await NewUsers.create({
      Employee_number,
      Email,
      Username,
      Password,
    });

    res.json("Signup success. Wait for your account to verify");
  } catch (error) {
    res.json(error.message);
  }
};

// get all new admin
const getAllNewAdmin_Controller = async (req, res) => {
  try {
    const newAdmin = await NewUsers.find();
    res.json(newAdmin);
  } catch (error) {
    res.json(error.message);
  }
};

// accept new admin
const acceptNewAdmin_Controller = async (req, res) => {
  const id = req.params.id;
  try {
    // get new admin from newadmin
    const getNewAdmin = await NewUsers.findById(id);

    // destructure data
    const { Employee_number, Username, Email, Password } = getNewAdmin;

    // add admin to users
    await Users.create({
      Employee_number,
      Username,
      Email,
      Password,
    });

    // delete new admin from newadmin
    await NewUsers.findByIdAndDelete(id);
    res.json("New admin has been added!");
  } catch (error) {
    res.json(error.message);
  }
};

// delete new admin
const deleteNewAdmin_Controller = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteNewAdmin = await NewUsers.findByIdAndDelete(id);
    res.json(deleteNewAdmin);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  addNewUsers_Controller,
  getAllNewAdmin_Controller,
  acceptNewAdmin_Controller,
  deleteNewAdmin_Controller,
};
