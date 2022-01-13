import React, { useState, useEffect } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";

// components
import ProfileImage from "../../../../ReusableFunctions/ProfileImage/ProfileImage";

// css
import "./ArchiveAdmin.css";

const ArchiveAdmin = ({ closeModal }) => {
  // ------- STATE --------
  const [archive, setArchive] = useState([]);

  // get archive admins
  useEffect(() => {
    const getArchives = async () => {
      const { data } = await axiosConfig.get("ArchiveAdmins");
      setArchive([...data]);
    };

    getArchives();
  }, []);

  return (
    <div className="archiveAdmin_Controller">
      {/* CLOSE MODAL */}
      <button
        type="button"
        className="closeModal"
        onClick={() => closeModal(false)}
      >
        <i className="fas fa-times"></i>
      </button>
      {/* ARCHIVE ADMIN LIST */}
      <section className="archiveAdmin_List">
        {/* HEADER */}
        <section className="archiveAdmin_Header">
          <h2>Archive admin</h2>
        </section>
        {archive.map((a) => {
          return (
            <section className="archiveAdmin" key={a._id}>
              {/* ADMIN IMAGE */}
              <section className="archiveAdmin_Image">
                <ProfileImage image={a.Employee_image} firstname={a.Username} />
              </section>
              {/* ADMIN NAME */}
              <section className="archiveAdmin_Details">{a.Username}</section>
              {/* ADMIN ID */}
              <section className="archiveAdmin_Details">
                {a.Employee_number}
              </section>
              {/* ADMIN TYPE */}
              <section className="archiveAdmin_Details">{a.Admin_type}</section>
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default ArchiveAdmin;
