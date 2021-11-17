const sendingEmailMiddleware = async (req, res, next) => {
  const { name, gender, email, meetingLink, interviewDate } = req.body;
  const error = { isError: true, errorMessage: "" };
  try {
    if (!name || !gender || !email || !meetingLink || !interviewDate) {
      error.errorMessage = "Please fill out all the input fields";
      res.json(error);
      return;
    }
    next();
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { sendingEmailMiddleware };
