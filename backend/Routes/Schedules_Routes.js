const routes = require("express").Router();

// Middleware
const {
  createScheduleMiddleware,
  editScheduleMiddleware,
} = require("../Middleware/Schedule_Middleware");

// Controller
const {
  createSchedule,
  getSchedule,
  editSchedule,
} = require("../Controller/Schedule_Controller");

// Create schedule
routes.route("/").post(createScheduleMiddleware, createSchedule);

// Edit schedule
routes.route("/editSchedule/:id").post(editScheduleMiddleware, editSchedule);

// Get all schedules
routes.route("/getAllSchedules").get(getSchedule);

module.exports = routes;
