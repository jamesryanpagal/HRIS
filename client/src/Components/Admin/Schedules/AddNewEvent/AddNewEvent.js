import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";

// css
import "./AddNewEvent.css";

const AddNewEvent = ({ setToggleNewEvent }) => {
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

  // selector
  const { admin, adminEmpNum } = useSelector((state) => state.GS_Admin);

  // handleChange
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date();

    const { title, startTime, endTime, startDate } = eventDetails;

    if (!title || !startTime || !endTime || !startDate) {
      setErrorMessage("Please fill out all the input fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosConfig.post("Schedule", eventDetails);
      if (data.isError) {
        setErrorMessage(data.errorMessage);
        setLoading(false);
        return;
      }

      // for audit trail
      const audittrails = {
        actions: "Event created",
        subject: eventDetails.title,
        admin,
        adminId: adminEmpNum,
        date: `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getDate()}, ${date.getFullYear()}`,
        time: date.toLocaleTimeString(),
      };
      await axiosConfig.post("Audittrail", { audittrails });

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="addNewEvent_Container">
      <section className="addnewEventForm_Container">
        <h1>Add New Event</h1>
        {/* ERROR MESSAGE */}
        {errorMessage && (
          <section className="errorMessage">
            <i className="fas fa-exclamation-triangle"></i>
            {errorMessage}
          </section>
        )}
        <form onSubmit={handleSubmit}>
          {/* TITLE */}
          <section className="input_Container">
            <label htmlFor="title">Title</label>
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
            <button
              type="button"
              className="back"
              onClick={() => setToggleNewEvent(false)}
            >
              Back
            </button>
          </section>
        </form>
      </section>
    </div>
  );
};

export default AddNewEvent;
