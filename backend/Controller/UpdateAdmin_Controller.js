// --------- MODEL --------------
const GS_Users = require("../Model/Users_Model");

// Update user name
const updateUsername = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const options = { new: true };

  try {
    const update = await GS_Users.findByIdAndUpdate(id, updates, options);
    res.json(update);
  } catch (error) {
    res.json(error.message);
  }
};

// Update password
const updatePassword = async (req, res) => {
  const id = req.params.id;
  const { newpassword } = req.body;
  const options = { new: true };
  try {
    GS_Users.findById(id).then((user) => {
      user._id = user._id;
      user.Employee_image = user.Employee_image;
      user.Employee_number = user.Employee_number;
      user.Email = user.Email;
      user.Username = user.Username;
      user.Password = newpassword;

      user.save();
    });

    res.json("Added");
  } catch (error) {
    res.json(error.message);
  }
};

// delete admin
const deleteAdmin = async (req, res) => {
  const name = req.params.name;
  try {
    const user = await GS_Users.findOne({ Username: name });
    const remove = await GS_Users.findByIdAndDelete(user._id);
    res.json(remove);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { updateUsername, updatePassword, deleteAdmin };
