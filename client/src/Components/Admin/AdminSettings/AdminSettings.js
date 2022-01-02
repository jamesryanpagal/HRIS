import React, { useState } from "react";
import { useDispatch } from "react-redux";

// redux actions
import { removeUsertokenActions } from "../../../Redux/Redux_actions/actions";

// images
import adminlisticon from "../../../PublicImages/adminlist.png";
import changeusernameicon from "../../../PublicImages/changeusername.png";
import changepasswordicon from "../../../PublicImages/changepassword.png";
import logouticon from "../../../PublicImages/logout.png";

// components
import AdminList from "./AdminList/AdminList";
import ChangeUsername from "./ChangeUsername/ChangeUsername";
import ChangePassword from "./ChangePassword/ChangePassword";

// css
import "./AdminSettings.css";

const AdminSettings = () => {
  // ---------- STATE -----------

  // toggle admin list state
  const [adminlist, setAdminList] = useState(false);

  // toggle change username state
  const [changeUsername, setChangeUsername] = useState(false);

  // toggle change password state
  const [changePassword, setChangePassword] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  return (
    <div className="admin_Settings_Container">
      {/* ADMIN LIST MODAL */}
      {adminlist && <AdminList closeModal={setAdminList} />}

      {/* CHANGE USERNAME MODAL */}
      {changeUsername && <ChangeUsername closeModal={setChangeUsername} />}

      {/* CHANGE PASSWORD MODAL */}
      {changePassword && <ChangePassword closeModal={setChangePassword} />}

      {/* OPTION */}
      <section className="options_Container">
        {/* ADMIN LIST */}
        <section
          className="admin_List_Container"
          onClick={() => setAdminList(true)}
        >
          <img src={adminlisticon} alt="" />
          <h5>Admin list</h5>
        </section>
        {/* CHANGE USERNAME */}
        <section
          className="change_Username_Container"
          onClick={() => setChangeUsername(true)}
        >
          <img src={changeusernameicon} alt="" />
          <h5>Change username</h5>
        </section>
        {/* CHANGE PASSWORD */}
        <section
          className="change_Password_Container"
          onClick={() => setChangePassword(true)}
        >
          <img src={changepasswordicon} alt="" />
          <h5>Change password</h5>
        </section>
        {/* SIGNOUT */}
        <section
          className="signout_Container"
          onClick={() => dispatch(removeUsertokenActions())}
        >
          <img src={logouticon} alt="" />
          <h5>Sign out</h5>
        </section>
      </section>
    </div>
  );
};

export default AdminSettings;
