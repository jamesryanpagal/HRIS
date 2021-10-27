import React, { useState } from "react";
import axiosConfig from "../../AxiosConfig/AxiosConfig";
import io from "socket.io-client";
import Spinner from "../../../Spinner/Spinner";

// css
import "./AcceptNewAdmin.css";

// SOCKET CONNECTION
const socket = io.connect("http://localhost:8080/");

const AcceptNewAdmin = ({ id, setAcceptConfirmation }) => {
  // ------------------ STATE --------------
  // loading state
  const [loading, setLoading] = useState(false);

  // handle accept new admin
  const handleAcceptNewAdmin = async () => {
    try {
      setLoading(true);
      await axiosConfig.post("/NewUsers/acceptNewAdmin/" + id);
      socket.emit("removeNewAdmin", id);
      setLoading(false);
      setAcceptConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="acceptNewAdmin_Container">
      <section className="acceptNewAdmin">
        Are you sure you want to add this as an admin ?
        <section
          className={
            loading ? "disable_Actions" : "acceptNewAdminActions_Container"
          }
        >
          <button
            type="button"
            className="accept"
            onClick={handleAcceptNewAdmin}
          >
            {loading ? <Spinner /> : "Accept"}
          </button>
          <button
            type="button"
            className="back"
            onClick={() => setAcceptConfirmation(false)}
          >
            Back
          </button>
        </section>
      </section>
    </div>
  );
};

export default AcceptNewAdmin;
