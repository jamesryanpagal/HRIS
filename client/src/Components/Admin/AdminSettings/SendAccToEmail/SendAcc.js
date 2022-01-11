import React, { useState } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";

// css
import "./SendAcc.css";

const SendAcc = ({ newAdminDetails }) => {
  // ------------ STATE ------------

  // loading state
  const [loading, setLoading] = useState(false);

  // res message state
  const [resMessage, setResMessage] = useState(null);

  const handleSendDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axiosConfig.post("SendAccDetails", {
        newAdminDetails,
      });
      if (data.isError) {
        setResMessage(
          <section className="resError">
            <i className="fas fa-exclamation-triangle"></i>
            {data.errorMessage}
          </section>
        );
        setLoading(false);
        return;
      }

      setResMessage(
        <section className="resSuccess">
          <i className="fas fa-check-circle"></i>
          {data}
        </section>
      );

      setTimeout(() => {
        window.location.reload();
      }, 1500);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sendAcc_Container">
      <section className="details_Container">
        {/* HEADER */}
        <h1>Account details</h1>
        {/* RESPONSE MESSAGE */}
        {resMessage && <section className="resMessage">{resMessage}</section>}
        {/* ACCOUNT DETAILS */}
        <section className="admin_Details">
          <h3>Employee id:</h3>
          <p>{newAdminDetails.employee_number}</p>
        </section>
        <section className="admin_Details">
          <h3>Username:</h3>
          <p>{newAdminDetails.username}</p>
        </section>
        <section className="admin_Details">
          <h3>Password:</h3>
          <p>{newAdminDetails.password}</p>
        </section>
        {/* ACTION */}
        <section className="sendAccAction">
          <button type="button" onClick={handleSendDetails}>
            {loading ? <Spinner /> : "Send account details"}
          </button>
        </section>
      </section>
    </div>
  );
};

export default SendAcc;
