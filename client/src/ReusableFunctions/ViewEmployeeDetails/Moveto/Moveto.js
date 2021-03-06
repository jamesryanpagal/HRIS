import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../../AxiosConfig/AxiosConfig";
import io from "socket.io-client";

// component
import Spinner from "../../../Spinner/Spinner";

// css
import "./Moveto.css";

// SOCKET CONNECTION
const socket = io.connect("https://grandspan.herokuapp.com/");

const Moveto = ({ setMoveto, destination, movetoDetails }) => {
  // --------------------- STATE ------------------
  // reason state
  const [movingDetails, setMovingDetails] = useState({
    employee_id: movetoDetails.id,
    destination: destination,
    reason: "",
  });

  // loading state
  const [loading, setLoading] = useState(false);

  // employee moved
  const [isMoved, setIsMoved] = useState(false);

  // selector
  const { adminEmpNum, admin } = useSelector((state) => state.GS_Admin);

  // handle move to
  const handleMoveTo = async () => {
    const date = new Date();
    try {
      setLoading(true);
      await axiosConfig.post(`/MoveTo/${destination}`, movingDetails);
      const { data } = await axiosConfig.post("/DisableEnableAdmin/remove", {
        adminId: movingDetails.employee_id,
      });
      if (data === "logout") {
        socket.emit("removeAdmin", movingDetails.employee_id);
      }
      // for audit trail
      const audittrails = {
        actions: `Moved to ${destination}`,
        subject: movetoDetails.name,
        admin,
        adminId: adminEmpNum,
        date: `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getDate()}, ${date.getFullYear()}`,
        time: date.toLocaleTimeString(),
      };
      await axiosConfig.post("Audittrail", { audittrails });
      setLoading(false);
      setIsMoved(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="moveto_Modal_Container">
      {/* WARNING */}
      {isMoved ? (
        <section className="employee_Moved">
          <i className="fas fa-check-circle"></i>{" "}
          <p>
            Employee <strong>{movetoDetails.name}</strong> has been moved to{" "}
            <strong>{destination}</strong>
          </p>
        </section>
      ) : (
        <section className="warning">
          <i className="fas fa-exclamation-triangle"></i>
          <p>
            Warning! You are about to move{" "}
            <strong>{movetoDetails.name} </strong>
            to
            <strong> {destination}</strong>
          </p>
        </section>
      )}
      {/* CONFIRMATION */}
      <section className="moveto_Confirmation">
        {/* NAME */}
        <h4>Employee name:</h4>
        <section className="moveto_Details">{movetoDetails.name}</section>
        {/* DESTINATION */}
        <h4>Destination:</h4>
        <section className="moveto_Details">{destination}</section>
        {/* REASON */}
        <h4>Reason for moving</h4>
        <textarea
          name="reason"
          onChange={(e) =>
            setMovingDetails((prev) => ({ ...prev, reason: e.target.value }))
          }
        />
        {/* ACTIONS */}
        <section
          className={loading ? "moveto_Actions_Disable" : "moveto_Actions"}
        >
          {isMoved ? (
            <button
              type="button"
              className="back"
              onClick={() => window.location.reload()}
            >
              Back
            </button>
          ) : (
            <>
              <button
                type="button"
                className={!movingDetails.reason ? "move_Disable" : "move"}
                onClick={handleMoveTo}
              >
                {loading ? <Spinner /> : "Move"}
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => setMoveto(false)}
              >
                Cancel
              </button>
            </>
          )}
        </section>
      </section>
    </div>
  );
};

export default Moveto;
