const routes = require("express").Router();

// Controller
const {
  createSchedule,
  getSchedule,
} = require("../Controller/Schedule_Controller");

// Create schedule
routes.route("/").post(createSchedule);

// Get all schedules
routes.route("/getAllSchedules").get(getSchedule);

module.exports = routes;
