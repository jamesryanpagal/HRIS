import React from "react";
import axiosConfig from "../../AxiosConfig/AxiosConfig";
import Spinner from "../../../Spinner/Spinner";

// css
import "./Accept.css";

const Accept = ({
  applicantId,
  acceptApi,
  socket,
  acceptSocket,
  loading,
  setLoading,
  setIsRemove,
  setConfirmAccept,
}) => {
  // handle accept applicant
  const handleAcceptApplicant = async () => {
    try {
      setLoading(true);
      await axiosConfig.post(acceptApi, { applicantId });
      socket.emit(acceptSocket, applicantId);
      setLoading(false);
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
