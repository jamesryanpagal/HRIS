import React, { useState } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";
import { v4 as uuidV4 } from "uuid";

// Component
import ConfirmbyPassword from "../ConfirmbyPassword/ConfirmbyPassword";
import SendAcc from "../SendAccToEmail/SendAcc";

// css
import "../UpdateAcc.css";

const CreateAdminAcc = ({ closeModal }) => {
  // --------- STATE -------------

  // new admin details state
  const [newAdminDetails, setNewAdminDetails] = useState({
    employee_number: "",
    username: "",
    password: uuidV4().split("-")[0],
  });

  // confirm by password state
  const [confirmByPass, setConfirmByPass] = useState(false);

  // loading state
  const [loading, setLoading] = useState(false);

  // error message state
  const [errorMessage, setErrorMessage] = useState("");

  // create success state
  const [createSuccess, setCreateSuccess] = useState(false);

  // handle change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewAdminDetails((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        newAdminDetails.employee_number.length !== 0 &&
        newAdminDetails.username.length !== 0 &&
        newAdminDetails.password.length !== 0
      ) {
        setLoading(true);
        const { data } = await axiosConfig.post("NewUsers/checkNewAdmin", {
          newAdminDetails,
        });
        if (data.isError) {
          setErrorMessage(data.errorMessage);
          setLoading(false);
          return;
        }

        setConfirmByPass(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="accDetails_Container">
      {/* CONFIRM BY PASSWORD MODAL */}
      {confirmByPass && (
        <ConfirmbyPassword
          newAdminDetails={newAdminDetails}
          setCreateSuccess={setCreateSuccess}
          closeModal={setConfirmByPass}
        />
      )}

      {/* SEND ACC TO EMAIL */}
      {createSuccess && <SendAcc newAdminDetails={newAdminDetails} />}

      {/* CHANGE USERNAME FORM */}
      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <h2>Create new admin</h2>
        {errorMessage && (
          <section className="errorMessage">
            <i className="fas fa-exclamation-triangle"></i>
            {errorMessage}
          </section>
        )}
        {/* INPUTS */}
        <input
          type="text"
          name="employee_number"
          placeholder="Employee number"
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        {/* ACTIONS */}
        <section
          className={loading ? "actionsContainer_disable" : "actionsContainer"}
        >
          <button
            type="submit"
            className={
              newAdminDetails.employee_number.length === 0 ||
              newAdminDetails.username.length === 0 ||
              newAdminDetails.password.length === 0
                ? "save_disable"
                : "save"
            }
          >
            {loading ? <Spinner /> : "Create"}
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

export default CreateAdminAcc;
