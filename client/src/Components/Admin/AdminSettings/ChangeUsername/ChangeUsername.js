import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";

// css
import "../UpdateAcc.css";

const ChangeUsername = ({ closeModal }) => {
  // ---------- STATE ---------
  const [username, setUsername] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // error message
  const [errorMessage, setErrorMessage] = useState("");

  // selector
  const { adminId } = useSelector((state) => state.GS_Admin);

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username.length !== 0) {
        setLoading(true);
        const { data } = await axiosConfig.patch(`UpdateAdmin/${adminId}`, {
          Username: username,
        });
        if (data.isError) {
          setErrorMessage(data.errorMessage);
          setLoading(false);
          return;
        }
        console.log(data);
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="accDetails_Container">
      {/* CHANGE USERNAME FORM */}
      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <h2>Change username</h2>
        {errorMessage && (
          <section className="errorMessage">
            <i className="fas fa-exclamation-triangle"></i>
            {errorMessage}
          </section>
        )}
        {/* INPUTS */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* ACTIONS */}
        <section
          className={loading ? "actionsContainer_disable" : "actionsContainer"}
        >
          <button
            type="submit"
            className={username.length === 0 ? "save_disable" : "save"}
          >
            {loading ? <Spinner /> : "Save"}
          </button>
          <button
            type="button"
            className="back"
            onClick={() => closeModal(false)}
          >
            Back
          </button>
        </section>
      </form>
    </div>
  );
};

export default ChangeUsername;
