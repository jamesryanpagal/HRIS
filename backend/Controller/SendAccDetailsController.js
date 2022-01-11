// ----------- MODEL --------------
const Employees = require("../Model/Employees_Model");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendAccDetailsController = async (req, res) => {
  const { employee_number, username, password } = req.body.newAdminDetails;
  const error = { isError: true, errorMessage: "" };
  try {
    // get user
    const user = await Employees.findOne({ employee_id: employee_number });

    // send email
    const message = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Admin account",
      text: "",
      html: `<p>Good day you are now an admin of GDC HRIS here is your account details. Your employee number is <strong>${employee_number}</strong>, your username <strong>${username}</strong> and your password is <strong>${password}</strong> </p>`,
    };

    // send email
    transporter.sendMail(message, (err, info) => {
      if (err) {
        error.errorMessage = "Something went wrong!";
        res.json(error);
        return;
      }
      res.json("Email sent!");
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { sendAccDetailsController };
