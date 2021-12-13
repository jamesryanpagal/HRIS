// --------------------- MODEL -----------------
const Schedule = require("../Model/Schedule_Model");

// Create Schedule
const createSchedule = async (req, res) => {
  const { title, startTime, endTime, startDate } = req.body;
  try {
    const newEvent = await Schedule.create({
      title,
      start: `${startDate} ${startTime}`,
      end: `${startDate} ${endTime}`,
    });
    res.json(newEvent);
  } catch (error) {
    res.json(error.message);
  }
};

// Get All Schedule
const getSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { createSchedule, getSchedule };
