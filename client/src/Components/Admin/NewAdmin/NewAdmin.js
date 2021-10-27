import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import io from "socket.io-client";

// REDUX ACTIONS
import {
  newAdminActions,
  removeNewAdminActions,
} from "../../../Redux/Redux_actions/actions";

// Component
import AcceptNewAdmin from "../../../ReusableFunctions/NewAdminConfirmation/AcceptNewAdmin/AcceptNewAdmin";
import DeleteNewAdmin from "../../../ReusableFunctions/NewAdminConfirmation/DeleteNewAdmin/DeleteNewAdmin";

// css
import "./NewAdmin.css";

// SOCKET CONNECTION
const socket = io.connect("https://grandspan.herokuapp.com/");

const NewAdmin = () => {
  // ---------------- STATE ------------------
  // toggle accept confirmation state
  const [acceptConfirmation, setAcceptConfirmation] = useState(false);

  // toggle delete confirmation state
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  // new admin id state
  const [newAdminId, setNewAdminId] = useState("");

  // selector
  const { newAdminList } = useSelector((state) => state.newAdmin);

  // dispatch
  const dispatch = useDispatch();

  // get new Admin from database
  useEffect(() => {
    const getNewAdmin = async () => {
      try {
        const { data } = await axiosConfig.get("/NewUsers/getNewAdmin");
        data.map((a) => dispatch(newAdminActions(a)));
      } catch (error) {
        console.log(error);
      }
    };

    getNewAdmin();
  }, [dispatch]);

  // remove new admin in realtime
  useEffect(() => {
    socket.on("remove_NewAdmin", (id) => {
      dispatch(removeNewAdminActions(id));
    });
  }, [dispatch]);

  // handle toggle accept confirmation
  const handleToggleAcceptConfirmation = (e) => {
    const target = e.target.value;
    setAcceptConfirmation(true);
    setNewAdminId(target);
  };

  // handle toggle delete confirmation
  const handleToggleDeleteConfirmation = (e) => {
    const target = e.target.value;
    setDeleteConfirmation(true);
    setNewAdminId(target);
  };

  return (
    <div className="newAdmin_Container">
      {/* ACCEPT CONFIRMATION */}
      {acceptConfirmation && (
        <AcceptNewAdmin
          id={newAdminId}
          setAcceptConfirmation={setAcceptConfirmation}
        />
      )}
      {/* DELETE CONFIRMATION */}
      {deleteConfirmation && (
        <DeleteNewAdmin
          id={newAdminId}
          setDeleteConfirmation={setDeleteConfirmation}
        />
      )}
      {/* NEW ADMIN LIST */}
      <section className="newAdmin_List">
        {/* NEW ADMIN CARD */}
        {newAdminList.map((a) => (
          <section key={a._id} className="newAdmin">
            {/* NEW ADMIN USERNAME */}
            <section className="newAdmin_Username">{a.Username}</section>
            {/* NEW ADMIN EMP ID */}
            <h4>{a.Employee_number}</h4>
            {/* NEW ADMIN EMAIL */}
            <section className="newAdmin_Email">{a.Email}</section>
            <section className="newAdmin_Actions_Container">
              <button
                type="button"
                className="accept"
                value={a._id}
                onClick={handleToggleAcceptConfirmation}
              >
                Accept
              </button>
              <button
                type="button"
                className="delete"
                value={a._id}
                onClick={handleToggleDeleteConfirmation}
              >
                Delete
              </button>
            </section>
          </section>
        ))}
      </section>
    </div>
  );
};

export default NewAdmin;
