const mongoose = require("mongoose");
const schema = mongoose.Schema;

const scheduleSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("schedules", scheduleSchema);
module.exports = Schedule;
