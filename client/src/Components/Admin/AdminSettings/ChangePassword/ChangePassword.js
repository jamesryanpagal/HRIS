import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";

// css
import "../UpdateAcc.css";

const ChangePassword = ({ closeModal }) => {
  // ---------- STATE ---------
  const [userPassword, setUserPassword] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  // loading state
  const [loading, setLoading] = useState(false);

  // error state
  const [errorMsg, setErrorMsg] = useState("");

  // selector
  const { adminId } = useSelector((state) => state.GS_Admin);

  // change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserPassword((prev) => ({ ...prev, [name]: value }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosConfig.patch(
        `UpdateAdmin/updatePassword/${adminId}`,
        {
          oldpassword: userPassword.oldpassword,
          newpassword: userPassword.newpassword,
          confirmpassword: userPassword.confirmpassword,
        }
      );

      if (data.isError) {
        setErrorMsg(data.errorMessage);
        setLoading(false);
        return;
      }

      setErrorMsg("");
      window.location.reload();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="accDetails_Container">
      {/* CHANGE USERNAME FORM */}
      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <h2>Change password</h2>
        {/* ERROR MESSAGE */}
        {errorMsg && (
          <section className="errorMessage">
            <i className="fas fa-exclamation-triangle"></i>
            {errorMsg}
          </section>
        )}
        {/* INPUTS */}
        <input
          type="password"
          name="oldpassword"
          placeholder="Old password"
          onChange={handleChange}
        />
        {/* INPUTS */}
        <input
          type="password"
          name="newpassword"
          placeholder="New password"
          onChange={handleChange}
        />
        {/* INPUTS */}
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm password"
          onChange={handleChange}
        />
        {/* ACTIONS */}
        <section
          className={loading ? "actionsContainer_disable" : "actionsContainer"}
        >
          <button
            type="submit"
            className={
              userPassword.oldpassword.length === 0 ||
              userPassword.newpassword.length === 0
                ? "save_disable"
                : "save"
            }
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

export default ChangePassword;
