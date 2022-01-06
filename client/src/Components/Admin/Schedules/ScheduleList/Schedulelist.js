import React, { useState, useEffect } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import EditEvent from "../EditEvent/EditEvent";

// css
import "./Schedulelist.css";

const Schedulelist = ({ setToggleEditEvent }) => {
  // -------- STATE ---------
  const [scheduleList, setScheduleList] = useState([]);

  // event id
  const [eventId, setEventId] = useState("");

  // get all schedule
  useEffect(() => {
    const getAllSchedule = async () => {
      const { data } = await axiosConfig.get("Schedule/getAllSchedules");
      setScheduleList([...data]);
    };

    getAllSchedule();
  }, []);

  return (
    <div className="schedulelist_Container">
      {/* EDIT EVENT MODAL */}
      {eventId && <EditEvent id={eventId} close={setEventId} />}
      {/* SCHEDULE LIST CONTAINER */}
      <section className="scheduleslist">
        {/* HEADER */}
        <section className="scheduleHeader">
          <h1>Schedules</h1>
          <button type="button" onClick={() => setToggleEditEvent(false)}>
            <i className="fas fa-times"></i>
          </button>
        </section>
        {/* SCHEDULES */}
        <section className="schedules">
          {scheduleList.map((s) => {
            // DATE SCHEDULE
            const scheduleDate = new Date(s.start.substring(0, 10));

            // START TIME
            const startTime = new Date(s.start);

            // END TIME
            const endTime = new Date(s.end);

            return (
              //   SCHEDULE
              <section className="schedule" key={s._id}>
                {/* TITLE */}
                <section className="details_Group">
                  <h4>Title</h4>
                  <span>{s.title}</span>
                </section>
                {/* DATE */}
                <section className="details_Group">
                  <h4>Date</h4>
                  <span>{scheduleDate.toDateString()}</span>
                </section>
                {/* START TIME */}
                <section className="details_Group">
                  <h4>Start</h4>
                  <span>
                    {startTime.toLocaleTimeString().replaceAll(":", ": ")}
                  </span>
                </section>
                {/* END TIME */}
                <section className="details_Group">
                  <h4>End</h4>
                  <span>
                    {endTime.toLocaleTimeString().replaceAll(":", ": ")}
                  </span>
                </section>
                {/* ACTIONS */}
                <section className="actions">
                  <button
                    type="button"
                    className="edit"
                    onClick={() => setEventId(s._id)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </section>
              </section>
            );
          })}
        </section>
      </section>
    </div>
  );
};

export default Schedulelist;
