const mongoose = require("mongoose");
const schema = mongoose.Schema;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const GS_Users_Schema = new schema(
  {
    Employee_image: {
      type: String,
      required: true,
    },
    Employee_number: {
      type: String,
      required: true,
      unique: true,
    },
    Admin_type: {
      type: String,
      required: true,
    },
    IsDisabled: {
      type: Boolean,
      required: true,
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

GS_Users_Schema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  return (this.Password = await bcrypt.hash(this.Password, salt));
});

GS_Users_Schema.methods.createToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY);
};

GS_Users_Schema.methods.verifyPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.Password);
};

const GS_Users = mongoose.model("gs_users", GS_Users_Schema);
module.exports = GS_Users;
