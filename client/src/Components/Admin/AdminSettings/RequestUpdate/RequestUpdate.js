import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";

// components
import ProfileImage from "../../../../ReusableFunctions/ProfileImage/ProfileImage";
import ConfirmbyPassword from "../ConfirmbyPassword/ConfirmbyPassword";

// css
import "./RequestUpdate.css";

const RequestUpdate = ({ closeModal }) => {
  // --------- STATE -----------
  // request list state
  const [requestList, setRequestList] = useState([]);

  // request details
  const [requestDetails, setRequestDetails] = useState({
    id: "",
    type: "",
  });

  // confirm by pass
  const [confirmByPass, setConfirmByPass] = useState(false);

  // selector
  const { adminEmpNum } = useSelector((state) => state.GS_Admin);

  // get request
  useEffect(() => {
    const getRequest = async () => {
      const { data } = await axiosConfig.get("RequestUpdate/getRequest");
      setRequestList([...data]);
    };

    getRequest();
  }, []);

  // authorized
  const handleAuthorized = (e) => {
    const value = e.target.value;
    setRequestDetails((prev) => ({ ...prev, id: value, type: "authorized" }));
    setConfirmByPass(true);
  };

  // not authorized
  const handleNotAuthorized = (e) => {
    const value = e.target.value;
    setRequestDetails((prev) => ({
      ...prev,
      id: value,
      type: "notauthorized",
    }));
    setConfirmByPass(true);
  };

  return (
    <div className="requestUpdate_Container">
      {/* CONFIRM BY PASSWORD MODAL */}
      {confirmByPass && (
        <ConfirmbyPassword
          requestDetails={requestDetails}
          closeModal={setConfirmByPass}
        />
      )}
      {/* CLOSE MODAL */}
      <button className="closeModal" onClick={() => closeModal(false)}>
        <i className="fas fa-times"></i>
      </button>
      {/* ADMIN LIST */}
      <section className="requestList">
        {/* HEADER */}
        <section className="requestList_Header">
          <h2>Request for update</h2>
        </section>
        {requestList.map((req) => {
          return (
            <section key={req._id}>
              {req.Employee_number !== adminEmpNum && (
                <section className="request">
                  {/* ADMIN IMAGE */}
                  <section className="adminImage">
                    <ProfileImage
                      image={req.Employee_image}
                      firstname={req.Username}
                    />
                  </section>
                  {/* ADMIN NAME */}
                  <section className="requestDetails">{req.Username}</section>
                  {/* ADMIN ID */}
                  <section className="requestDetails">
                    {req.Employee_number}
                  </section>
                  {/* ACTIONS */}
                  <section className="requestActions">
                    <button
                      type="button"
                      className="authorized"
                      value={req.Employee_number}
                      onClick={handleAuthorized}
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button
                      type="button"
                      className="notauthorized"
                      value={req.Employee_number}
                      onClick={handleNotAuthorized}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </section>
                </section>
              )}
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default RequestUpdate;
