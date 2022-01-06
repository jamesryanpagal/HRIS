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
  const { title, startTime, endTime, startDate } = req.body;
  const id = req.params.id;
  try {
    const option = { new: true };

    const event = await Schedule.findById(id);

    const update = await Schedule.findByIdAndUpdate(
      id,
      {
        title: !title ? event.title : title,
        start: `${!startDate ? event.start.substring(0, 10) : startDate} ${
          !startTime ? event.start.substring(11) : startTime
        }`,
        end: `${!startDate ? event.end.substring(0, 10) : startDate} ${
          !endTime ? event.end.substring(11) : endTime
        }`,
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
