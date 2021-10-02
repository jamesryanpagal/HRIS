import React from "react";
import axiosConfig from "../../AxiosConfig/AxiosConfig";
import Spinner from "../../../Spinner/Spinner";

// css
import "./Reject.css";

const Reject = ({
  applicantId,
  rejectApi,
  socket,
  rejectSocket,
  loading,
  setLoading,
  setIsRemove,
  setConfirmReject,
}) => {
  // reject applicant
  const handleRejectApplicant = async () => {
    try {
      setLoading(true);
      await axiosConfig.delete(rejectApi);
      socket.emit(rejectSocket, applicantId);
      setLoading(false);
      setIsRemove(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reject_Container">
      <section className="reject">
        <p>Are you sure you want to reject this applicant?</p>
        <section
          className={
            loading ? "disable_Confirm_Rejection" : "confirm_Rejection"
          }
        >
          <button
            type="button"
            className="reject_Btn"
            onClick={handleRejectApplicant}
          >
            {loading ? <Spinner /> : "Reject"}
          </button>
          <button
            type="button"
            className="back_Btn"
            onClick={() => setConfirmReject(false)}
          >
            Back
          </button>
        </section>
      </section>
    </div>
  );
};

export default Reject;
