import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// --------------------------- REDUX ACTIONS ---------------------
import { removeUsertokenActions } from "../../../Redux/Redux_actions/actions";

//css
import "./Dashboard.css";

const Dashboard = ({ history }) => {
  // dispatch
  const dispatch = useDispatch();

  // --------------------------- REDUX STORE -----------------------
  const { admin_token } = useSelector((state) => state.GS_Admin);

  // check if there's a token
  useEffect(() => {
    if (!admin_token) {
      history.go(-1);
    }
  }, [admin_token, history]);

  // -------------------------- HANDLE LOGOUT -------------------------
  const handleLogOut = () => {
    dispatch(removeUsertokenActions());
  };

  return (
    <div>
      dashboard
      <button type="button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
