import React, { useState, useEffect } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";

// component
import DeleteAdmin from "../DeleteAdmin/DeleteAdmin";

// css
import "./AdminList.css";

const AdminList = ({ closeModal }) => {
  // ------- STATE ---------
  const [adminlist, setAdminList] = useState([]);

  // delete admin confirmation
  const [adminActions, setAdminActions] = useState(false);

  // admin details
  const [adminUsername, setAdminUsername] = useState("");

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

  // delete
  const handleDelete = (e) => {
    const value = e.target.value;
    setAdminUsername(value);
    setAdminActions(true);
  };

  return (
    <div className="adminList_Container">
      {/* DELETE ADMIN MODAL */}
      {adminActions && (
        <DeleteAdmin
          setAdminActions={setAdminActions}
          username={adminUsername}
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
                {/* ADMIN NAME */}
                <h4>{admin.Username}</h4>
                {/* ACTIONS */}
                <section className="actions_Container">
                  <button
                    type="button"
                    value={admin.Username}
                    onClick={handleDelete}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </section>
              </section>
            );
          })
        )}
      </section>
    </div>
  );
};

export default AdminList;
