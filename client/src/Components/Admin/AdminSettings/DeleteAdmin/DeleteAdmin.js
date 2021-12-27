import React, { useState } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";

// css
import "./DeleteAdmin.css";

const DeleteAdmin = ({ setAdminActions, username }) => {
  // ----------- STATE --------
  const [confirmUsername, setConfirmUsername] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // delete admin
  const handleDeleteAdmin = async () => {
    try {
      setLoading(true);
      const { data } = await axiosConfig.delete(
        `/UpdateAdmin/deleteAdmin/${username}`
      );
      console.log(data);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="deleteAdmin_Container">
      {/* DELETE CONTAINER */}
      <section className="actionsContainer">
        <p>
          For confirming the removal of admin <strong>("{username}")</strong>{" "}
          please type his/her username
        </p>
        {/* CONFIRM NAME */}
        <section className="confirm_Name">
          <input
            type="text"
            placeholder="Admin username"
            onChange={(e) => setConfirmUsername(e.target.value)}
          />
        </section>
        {/* ACTIONS CONTAINER */}
        <section className={loading ? "actions_disable" : "actions"}>
          <button
            type="button"
            className={
              confirmUsername === username ? "delete" : "delete_disable"
            }
            onClick={handleDeleteAdmin}
          >
            {loading ? <Spinner /> : "Delete"}
          </button>
          <button
            type="button"
            className="back"
            onClick={() => setAdminActions(false)}
          >
            Back
          </button>
        </section>
      </section>
    </div>
  );
};

export default DeleteAdmin;
