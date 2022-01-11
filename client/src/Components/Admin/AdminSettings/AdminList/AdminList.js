import React, { useState, useEffect } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";

// images
import lockIcon from "../../../../PublicImages/lock.png";
import unlockIcon from "../../../../PublicImages/unlock.png";
import statusunlockIcon from "../../../../PublicImages/statusunlock.png";
import statuslockIcon from "../../../../PublicImages/statuslock.png";

// component
import ProfileImage from "../../../../ReusableFunctions/ProfileImage/ProfileImage";
import ConfirmByPass from "../ConfirmbyPassword/ConfirmbyPassword";

// css
import "./AdminList.css";

const AdminList = ({ closeModal }) => {
  // ------- STATE ---------
  const [adminlist, setAdminList] = useState([]);

  // disble or enable admin confirmation
  const [adminActions, setAdminActions] = useState(false);

  // admin id
  const [adminId, setAdminId] = useState({ type: "", id: "" });

  // Get admin list
  useEffect(() => {
    const getAdminList = async () => {
      const { data } = await axiosConfig.get("/AdminList");
      setAdminList([...data]);
    };

    getAdminList();

    return () => {
      setAdminList([]);
    };
  }, []);

  // disable admin
  const handleDisable = (e) => {
    const value = e.target.value;
    setAdminId((prev) => ({ ...prev, type: "disable", id: value }));
    setAdminActions(true);
  };

  // enable admin
  const handleEnable = (e) => {
    const value = e.target.value;
    setAdminId((prev) => ({ ...prev, type: "enable", id: value }));
    setAdminActions(true);
  };

  return (
    <div className="adminList_Container">
      {/* CONFIRM BY PASSWORD MODAL */}
      {adminActions && (
        <ConfirmByPass
          closeModal={setAdminActions}
          disable_enableAdminDetails={adminId}
        />
      )}
      {/* CLOSE */}
      <button
        type="button"
        className="close_AdminList"
        onClick={() => closeModal(false)}
      >
        <i className="fas fa-times"></i>
      </button>
      {/* HEADER */}
      <section className="adminList_Header">
        <h2>Admin list</h2>
      </section>
      {/* ADMIN LIST */}
      <section className="adminList">
        {adminlist.length === 0 ? (
          <section className="loading_Adminlist">
            <Spinner />
          </section>
        ) : (
          adminlist.map((admin) => {
            return (
              <section key={admin._id} className="admin">
                {/* ADMIN STATUS */}
                <section className="status">
                  {admin.IsDisabled ? (
                    <img src={statuslockIcon} alt="" />
                  ) : (
                    <img src={statusunlockIcon} alt="" />
                  )}
                </section>
                {/* ADMIN DETAILS */}
                <section className="adminDetails_Container">
                  {/* ADMIN IMAGE */}
                  <section className="adminImage">
                    <ProfileImage
                      image={admin.Employee_image}
                      firstname={admin.Username}
                    />
                  </section>
                  {/* ADMIN ID */}
                  <h4 className="adminId">{admin.Employee_number}</h4>
                  {/* ADMIN NAME */}
                  <span>{admin.Username}</span>
                </section>
                {/* ACTIONS */}
                {admin.Admin_type !== "SuperAdmin" && (
                  <section className="actions_Container">
                    <button
                      type="button"
                      className={admin.IsDisabled ? "lock_disable" : "lock"}
                      value={admin.Employee_number}
                      onClick={handleDisable}
                    >
                      <img src={lockIcon} alt="" />
                    </button>
                    <button
                      type="button"
                      className={admin.IsDisabled ? "unlock" : "unlock_disable"}
                      value={admin.Employee_number}
                      onClick={handleEnable}
                    >
                      <img src={unlockIcon} alt="" />
                    </button>
                  </section>
                )}
              </section>
            );
          })
        )}
      </section>
    </div>
  );
};

export default AdminList;
