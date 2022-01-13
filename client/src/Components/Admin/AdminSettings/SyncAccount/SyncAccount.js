import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";

// component
import ProfileImage from "../../../../ReusableFunctions/ProfileImage/ProfileImage";
import ConfirmbyPassword from "../ConfirmbyPassword/ConfirmbyPassword";

// css
import "./SyncAccount.css";

const SyncAccount = ({ closeModal }) => {
  // ------------ STATE ----------
  // list of admin state
  const [adminList, setAdminList] = useState([]);

  // sync id state
  const [syncDetails, setSyncDetails] = useState({
    newAdmin_id: "",
    formerAdmin_id: "",
    formerAdmin_Name: "",
    formerAdmin_Image: "",
    formerAdmin_Type: "",
  });

  // toggle confirm by password state
  const [confirmByPass, setConfirmByPass] = useState(false);

  // selector
  const { adminEmpNum, admin, adminImage, adminType } = useSelector(
    (state) => state.GS_Admin
  );

  // get adminlist
  useEffect(() => {
    const getAdmin = async () => {
      const { data } = await axiosConfig.get("AdminList");
      const filtered = data.filter(
        (admin) => admin.Employee_number !== adminEmpNum
      );
      const filteredDisabled = filtered.filter(
        (disable) => disable.IsDisabled !== true
      );
      setAdminList([...filteredDisabled]);
    };

    getAdmin();
  }, [adminEmpNum]);

  // handle sync
  const handleSync = (e) => {
    const value = e.target.value;
    setSyncDetails((prev) => ({
      ...prev,
      newAdmin_id: value,
      formerAdmin_id: adminEmpNum,
      formerAdmin_Name: admin,
      formerAdmin_Image: adminImage,
      formerAdmin_Type: adminType,
    }));
    setConfirmByPass(true);
  };

  return (
    <div className="syncaccount_Container">
      {/* CONFIRM BY PASSWORD MODAL */}
      {confirmByPass && (
        <ConfirmbyPassword
          syncDetails={syncDetails}
          closeModal={setConfirmByPass}
        />
      )}
      {/* CLOSE MODAL */}
      <button
        type="button"
        className="closeModal"
        onClick={() => closeModal(false)}
      >
        <i className="fas fa-times"></i>
      </button>
      {/* ADMIN LIST */}
      <section className="account_List">
        {/* HEADER */}
        <h2>Sync account</h2>
        {/* ADMINS */}
        {adminList.map((a) => {
          return (
            <section className="admin" key={a._id}>
              {/* IMAGE */}
              <section className="adminImage">
                <ProfileImage image={a.Employee_image} firstname={a.Username} />
              </section>
              {/* USERNAME */}
              <p>{a.Username}</p>
              {/* EMPLOYEE NUMBER */}
              <p>{a.Employee_number}</p>
              {/* ACTIONS */}
              <button
                type="button"
                value={a.Employee_number}
                onClick={handleSync}
              >
                <i className="fas fa-sync-alt"></i>
              </button>
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default SyncAccount;
