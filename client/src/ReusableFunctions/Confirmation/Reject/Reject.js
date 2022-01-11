import React from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../../AxiosConfig/AxiosConfig";
import Spinner from "../../../Spinner/Spinner";

// css
import "./Reject.css";

const Reject = ({
  applicantId,
  rejectApi,
  socket,
  rejectSocket,
  current,
  applicantName,
  loading,
  setLoading,
  setIsRemove,
  setConfirmReject,
}) => {
  // selector
  const { admin, adminEmpNum } = useSelector((state) => state.GS_Admin);

  // reject applicant
  const handleRejectApplicant = async () => {
    // for audit trail
    const date = new Date();
    const audittrails = {
      actions: `Rejected from ${current}`,
      subject: applicantName,
      admin,
      adminId: adminEmpNum,
      date: `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getDate()}, ${date.getFullYear()}`,
      time: date.toLocaleTimeString(),
    };

    try {
      setLoading(true);
      await axiosConfig.post(rejectApi);
      await axiosConfig.post("Audittrail", { audittrails });
      socket.emit(rejectSocket, applicantId);
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
