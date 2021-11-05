import React, { useState } from "react";
import Spinner from "../../../Spinner/Spinner";
import axiosConfig from "../../AxiosConfig/AxiosConfig";
import io from "socket.io-client";

// css
import "./DeleteNewAdmin.css";

// SOCKET CONNECTION
const socket = io.connect("http://localhost:8080/");

const DeleteNewAdmin = ({ id, setDeleteConfirmation }) => {
  // ------------- STATE -----------------
  const [loading, setLoading] = useState(false);

  // handle delete new admin
  const handleDeleteNewAdmin = async () => {
    try {
      setLoading(true);
      await axiosConfig.post("/NewUsers/deleteNewAdmin/" + id);
      socket.emit("removeNewAdmin", id);
      setLoading(false);
      setDeleteConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="deleteNewAdmin_Container">
      <section className="deleteNewAdmin">
        Are you sure you want to delete this admin ?
        <section
          className={
            loading ? "disable_Actions" : "deleteNewAdminActions_Container"
          }
        >
          <button
            type="button"
            className="delete"
            onClick={handleDeleteNewAdmin}
          >
            {loading ? <Spinner /> : "Delete"}
          </button>
          <button
            type="button"
            className="back"
            onClick={() => setDeleteConfirmation(false)}
          >
            Back
          </button>
        </section>
      </section>
    </div>
  );
};

export default DeleteNewAdmin;
