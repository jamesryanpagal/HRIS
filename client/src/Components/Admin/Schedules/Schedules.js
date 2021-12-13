import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "moment/locale/nb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";

// components
import AddNewEvent from "./AddNewEvent/AddNewEvent";

// css
import "./Schedules.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Schedules = () => {
  // ----------------- STATES -----------------
  // toggle add new event state
  const [toggleNewEvent, setToggleNewEvent] = useState(false);

  // all events
  const [allEvents, setAllEvents] = useState([]);

  // get all events from database
  useEffect(() => {
    const getAllEvents = async () => {
      const { data } = await axiosConfig.get("Schedule/getAllSchedules");
      data.map((d) => {
        const formatData = {
          ...d,
          start: new Date(d.start),
          end: new Date(d.end),
        };
        setAllEvents((prev) => [...prev, formatData]);
        return d;
      });
    };

    getAllEvents();

    return () => {
      setAllEvents([]);
    };
  }, []);

  return (
    <div className="schedules_Container">
      {/* TOGGLE EVENT BUTTON */}
      <section className="addEvent_Button">
        <button type="button" onClick={() => setToggleNewEvent(true)}>
          <i className="fas fa-plus"></i>
        </button>
      </section>
      {/* ADD NEW EVENT CONTAINER */}
      {toggleNewEvent && <AddNewEvent setToggleNewEvent={setToggleNewEvent} />}
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default Schedules;
