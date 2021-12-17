const Schedule = require("../Model/Schedule_Model");

const createScheduleMiddleware = async (req, res, next) => {
  const { title } = req.body;
  const error = { isError: true, errorMessage: "" };
  try {
    const schedExist = await Schedule.findOne({ title });
    if (schedExist) {
      error.errorMessage = "Title already used";
      res.json(error);
      return;
    }
    next();
  } catch (error) {
    res.json(error.message);
  }
};

const editScheduleMiddleware = async (req, res, next) => {
  const { title } = req.body;
  const error = { isError: true, errorMessage: "" };
  try {
    const getSched = await Schedule.findOne({ title });
    if (!getSched) {
      error.errorMessage = "Event not found!";
      res.json(error);
      return;
    }
    next();
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { createScheduleMiddleware, editScheduleMiddleware };
