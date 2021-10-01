import React from "react";
import axiosConfig from "../../AxiosConfig/AxiosConfig";

// css
import "./Reject.css";

const Reject = ({
  apiUrl,
  applicantId,
  socket,
  loading,
  setLoading,
  setIsRemove,
  setConfirmReject,
}) => {
  // reject applicant
  const handleRejectApplicant = async () => {
    try {
      setLoading(true);
      await axiosConfig.delete(apiUrl);
      socket.emit("rejectapplicant", applicantId);
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
        <section className="confirm_Rejection">
          <button
            type="button"
            className="reject_Btn"
            onClick={handleRejectApplicant}
          >
            {loading ? "Loading..." : "Confirm reject"}
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
