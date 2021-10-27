const mongoose = require("mongoose");
const schema = mongoose.Schema;

const newUsersSchema = new schema(
  {
    Employee_number: {
      type: String,
      required: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NewUsers = mongoose.model("new_gs_users", newUsersSchema);
module.exports = NewUsers;
