import React, { useState, useEffect } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";

// component
import ProfileImage from "../../../../ReusableFunctions/ProfileImage/ProfileImage";
import ConfirmbyPassword from "../ConfirmbyPassword/ConfirmbyPassword";

// css
import "./TempAdmin.css";

const TempAdmin = ({ closeModal }) => {
  // ----------- STATE ---------
  const [adminList, setAdminList] = useState([]);

  // temp admin id
  const [tempAdminDetails, setTempAdminDetails] = useState({
    id: "",
    type: "",
  });

  // confirm by pass state
  const [confirmByPass, setConfirmByPass] = useState(false);

  // get admin list
  useEffect(() => {
    const getAdmins = async () => {
      const { data } = await axiosConfig.get("AdminList");
      const filteredAdmin = data.filter((a) => a.Admin_type !== "SuperAdmin");
      setAdminList([...filteredAdmin]);
    };

    getAdmins();
  }, []);

  // assign temp
  const handleAssignTemp = async (e) => {
    const value = e.target.value;
    setTempAdminDetails((prev) => ({ ...prev, id: value, type: "assign" }));
    setConfirmByPass(true);
  };

  // unassign temp
  const handleUnassignTemp = (e) => {
    const value = e.target.value;
    setTempAdminDetails((prev) => ({ ...prev, id: value, type: "unassign" }));
    setConfirmByPass(true);
  };

  return (
    <div className="tempAdmin_Container">
      {/* CONFIRM BY PASS */}
      {confirmByPass && (
        <ConfirmbyPassword
          setTemp={tempAdminDetails}
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
      <section className="tempAdmin_List">
        {/* HEADER */}
        <section className="tempAdmin_Header">
          <h2>Assign temporary admin</h2>
        </section>
        {adminList.map((admin) => {
          return (
            <section className="tempAdmin" key={admin._id}>
              {/* ADMIN IMAGE */}
              <section className="tempAdmin_Image">
                <ProfileImage
                  image={admin.Employee_image}
                  firstname={admin.Username}
                />
              </section>
              {/* ADMIN NAME */}
              <section className="tempAdmin_Details">{admin.Username}</section>
              {/* ADMIN ID */}
              <section className="tempAdmin_Details">
                {admin.Employee_number}
              </section>
              {/* ACTION */}
              <section className="tempActions">
                {admin.Admin_type !== "TempAdmin" ? (
                  <button
                    className="assign"
                    type="button"
                    value={admin.Employee_number}
                    onClick={handleAssignTemp}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                ) : (
                  <button
                    className="unassign"
                    type="button"
                    value={admin.Employee_number}
                    onClick={handleUnassignTemp}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </section>
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default TempAdmin;
