import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux actions
import { removeUsertokenActions } from "../../../Redux/Redux_actions/actions";

// images
import adminlisticon from "../../../PublicImages/adminlist.png";
import changeusernameicon from "../../../PublicImages/changeusername.png";
import changepasswordicon from "../../../PublicImages/changepassword.png";
import logouticon from "../../../PublicImages/logout.png";
import createadminIcon from "../../../PublicImages/createadmin.png";
import syncaccountIcon from "../../../PublicImages/syncaccount.png";

// components
import AdminList from "./AdminList/AdminList";
import ChangeUsername from "./ChangeUsername/ChangeUsername";
import ChangePassword from "./ChangePassword/ChangePassword";
import CreateAdminAcc from "./CreateAdminAcc/CreateAdminAcc";
import SyncAccount from "./SyncAccount/SyncAccount";

// css
import "./AdminSettings.css";

const AdminSettings = () => {
  // ---------- STATE -----------

  // toggle admin list state
  const [adminlist, setAdminList] = useState(false);

  // toggle create admin state
  const [createAdmin, setCreateAdmin] = useState(false);

  // toggle change username state
  const [changeUsername, setChangeUsername] = useState(false);

  // toggle change password state
  const [changePassword, setChangePassword] = useState(false);

  // toggle sync account
  const [syncAccount, setSyncAccount] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  // selector
  const { adminType } = useSelector((state) => state.GS_Admin);

  return (
    <div className="admin_Settings_Container">
      {/* ADMIN LIST MODAL */}
      {adminlist && <AdminList closeModal={setAdminList} />}

      {/* CREATE ADMIN MODAL */}
      {createAdmin && <CreateAdminAcc closeModal={setCreateAdmin} />}

      {/* CHANGE USERNAME MODAL */}
      {changeUsername && <ChangeUsername closeModal={setChangeUsername} />}

      {/* CHANGE PASSWORD MODAL */}
      {changePassword && <ChangePassword closeModal={setChangePassword} />}

      {/* SYNC ACCOUNT MODAL */}
      {syncAccount && <SyncAccount closeModal={setSyncAccount} />}

      {/* OPTION */}
      <section className="options_Container">
        {adminType === "SuperAdmin" && (
          <>
            {/* ADMIN LIST */}
            <section
              className="admin_List_Container"
              onClick={() => setAdminList(true)}
            >
              <img src={adminlisticon} alt="" />
              <h5>Admin list</h5>
            </section>
            {/* SYNC ACCOUNT */}
            <section
              className="admin_List_Container"
              onClick={() => setSyncAccount(true)}
            >
              <img src={syncaccountIcon} alt="" />
              <h5>Sync account</h5>
            </section>
            {/* CREATE ADMIN ACCOUNT */}
            <section
              className="admin_List_Container"
              onClick={() => setCreateAdmin(true)}
            >
              <img src={createadminIcon} alt="" />
              <h5>Create admin</h5>
            </section>{" "}
          </>
        )}
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
