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

// Edit Schedule
const editSchedule = async (req, res) => {
  const { title, newTitle, startTime, endTime, startDate } = req.body;
  try {
    const option = { new: true };

    const getEvent = await Schedule.findOne({ title });
    const update = await Schedule.findByIdAndUpdate(
      getEvent._id,
      {
        title: newTitle,
        start: `${startDate} ${startTime}`,
        end: `${startDate} ${endTime}`,
      },
      option
    );
    res.json(update);
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

module.exports = { createSchedule, getSchedule, editSchedule };
