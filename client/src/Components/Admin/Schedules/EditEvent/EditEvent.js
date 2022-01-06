import React, { useState } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";

// css
import "./EditEvent.css";

const EditEvent = ({ id, close }) => {
  // ------------------- STATE ------------------
  // event details state
  const [eventDetails, setEventDetails] = useState({
    title: "",
    startTime: "",
    endTime: "",
    startDate: "",
  });

  // loading state
  const [loading, setLoading] = useState(false);

  // error message
  const [errorMessage, setErrorMessage] = useState("");

  // handleChange
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axiosConfig.post(
        "Schedule/editSchedule/" + id,
        eventDetails
      );
      if (data.isError) {
        setErrorMessage(data.errorMessage);
        setLoading(false);
        return;
      }
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="editEvent_Container">
      <section className="editEventForm_Container">
        <h1>Edit Event</h1>
        {/* ERROR MESSAGE */}
        {errorMessage && (
          <section className="errorMessage">
            <i className="fas fa-exclamation-triangle"></i>
            {errorMessage}
          </section>
        )}
        <form onSubmit={handleSubmit}>
          {/* EVENT TITLE */}
          <section className="input_Container">
            <label htmlFor="title">Event Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
            />
          </section>
          {/* START DATE */}
          <section className="input_Container">
            <label htmlFor="startDate">Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleChange}
            />
          </section>
          {/* START TIME */}
          <section className="input_Container">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              name="startTime"
              id="startTime"
              onChange={handleChange}
            />
          </section>
          {/* END TIME */}
          <section className="input_Container">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              name="endTime"
              id="endTime"
              onChange={handleChange}
            />
          </section>

          {/* FORM ACTIONS */}
          <section
            className={
              loading
                ? "formActions_Container_Disable"
                : "formActions_Container"
            }
          >
            <button type="submit" className="add">
              {loading ? <Spinner /> : "Add"}
            </button>
            <button type="button" className="back" onClick={() => close("")}>
              Back
            </button>
          </section>
        </form>
      </section>
    </div>
  );
};

export default EditEvent;
