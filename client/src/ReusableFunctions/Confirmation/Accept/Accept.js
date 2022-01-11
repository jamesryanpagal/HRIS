import React from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../../AxiosConfig/AxiosConfig";
import Spinner from "../../../Spinner/Spinner";

// css
import "./Accept.css";

const Accept = ({
  applicantId,
  acceptApi,
  socket,
  acceptSocket,
  current,
  applicantName,
  loading,
  setLoading,
  setIsRemove,
  setConfirmAccept,
}) => {
  // selector
  const { adminEmpNum, admin } = useSelector((state) => state.GS_Admin);

  // handle accept applicant
  const handleAcceptApplicant = async () => {
    // for audit trail
    const date = new Date();
    const audittrails = {
      actions: `Accepted from ${current}`,
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
      await axiosConfig.post(acceptApi, { applicantId });
      await axiosConfig.post("Audittrail", { audittrails });
      socket.emit(acceptSocket, applicantId);
      setIsRemove(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="accept_Container">
      <section className="accept">
        <p>Are you sure you want to accept this applicant?</p>
        <section
          className={
            loading ? "disable_Confirm_Acception" : "confirm_Acception"
          }
        >
          <button
            type="button"
            className="accept_Btn"
            onClick={handleAcceptApplicant}
          >
            {loading ? <Spinner /> : "Accept"}
          </button>
          <button
            type="button"
            className="back_Btn"
            onClick={() => setConfirmAccept(false)}
          >
            Back
          </button>
        </section>
      </section>
    </div>
  );
};

export default Accept;
