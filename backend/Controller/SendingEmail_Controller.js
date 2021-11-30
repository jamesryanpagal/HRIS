const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendingEmailController = async (req, res) => {
  const {
    name,
    gender,
    email,
    meetingLink,
    interviewDate,
    hour,
    minutes,
    meridiem,
  } = req.body;
  try {
    // compose email
    const emailMsg = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "For passing screening",
      text: "",
      html: `<div style=" margin: auto; width: 40%; padding: 20px; height: 50vh; background: #ececec; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <h3 style=" color: #5f5f5f; ">Good Day ${gender}. ${name},</h3>
      <p>Congratulation for passing in our screening, here are the details for your upcoming interview.</p>
      <p>Meeting link: <span>${meetingLink}</span></p>
      <p>Interview date: <span style=" color: #5f5f5f; font-size: 15px; font-weight: bold; ">${interviewDate}</span></p>
      <p>Interview time: <span style=" color: #5f5f5f; font-size: 15px; font-weight: bold; ">${hour}:${minutes} ${meridiem}</span></p>
    </div>`,
    };

    // send email
    transporter.sendMail(emailMsg, (err, info) => {
      if (err) {
        res.json("Something went wrong!");
        return;
      }
      res.json("Email sent!");
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { sendingEmailController };
