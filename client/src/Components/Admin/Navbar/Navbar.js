import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import ProfileImage from "../../../ReusableFunctions/ProfileImage/ProfileImage";

// REDUX ACTIONS
import { adminDetailsActions } from "../../../Redux/Redux_actions/actions";

// Icons
import applicantsIcon from "../../../PublicImages/applicantsIcon.png";
import employeesIcon from "../../../PublicImages/employeesIcon.png";
import departmentIcon from "../../../PublicImages/departmentIcon.png";
import companyProjectsIcon from "../../../PublicImages/companyProjectsIcon.png";
import scheduleIcon from "../../../PublicImages/scheduleIcon.png";
import newadminIcon from "../../../PublicImages/newadminIcon.png";
import uploadCurrentEmployeeIcon from "../../../PublicImages/uploadCurrentEmployee.png";

//css
import "./Navbar.css";

const Navbar = () => {
  // dispatch
  const dispatch = useDispatch();

  // selector
  const { admin_token, admin, adminImage, adminId } = useSelector(
    (state) => state.GS_Admin
  );

  // get admin details
  useEffect(() => {
    const getAdminDetails = async () => {
      const { data } = await axiosConfig.get("/VerifyToken", {
        headers: { key: admin_token },
      });
      dispatch(adminDetailsActions(data));
    };

    getAdminDetails();
  }, [admin_token, dispatch]);

  return (
    <div className="admin_Navbar">
      {/* HEADER */}
      <section className="admin_Profile_Container">
        {/* ADMIN SETTINGS */}
        <NavLink
          exact
          to={"/Adminsettings/" + adminId}
          activeClassName="admin_Settings_Active"
          className="admin_Settings"
        >
          <i className="fas fa-user-cog"></i>
        </NavLink>
        <section className="adminProfile">
          <ProfileImage image={adminImage} firstname={admin} />
        </section>
        <section className="admin_Username">
          <h4>{admin}</h4>
        </section>
      </section>
      {/* USERNAME */}
      {/* SYSTEM NAME */}
      <section className="admin_Navbar_Header">
        <span>GDC HRIS</span>
      </section>
      {/* LINKS */}
      <section className="admin_Navbar_Links">
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              className="link"
              activeClassName="active_Link"
            >
              <img src={applicantsIcon} alt="" />
              <span>Applicants</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Employee"
              className="link"
              activeClassName="active_Link"
            >
              <img src={employeesIcon} alt="" />
              <span>Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Department"
              className="link"
              activeClassName="active_Link"
            >
              <img src={departmentIcon} alt="" />
              <span>Department</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Companyprojects"
              className="link"
              activeClassName="active_Link"
            >
              <img src={companyProjectsIcon} alt="" />
              <span>Projects</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Schedules"
              className="link"
              activeClassName="active_Link"
            >
              <img src={scheduleIcon} alt="" />
              <span>Schedule</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/UploadCurrentEmployee"
              className="link"
              activeClassName="active_Link"
            >
              <img src={uploadCurrentEmployeeIcon} alt="" />
              <span>Upload</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Newadmin"
              className="link"
              activeClassName="active_Link"
            >
              <img src={newadminIcon} alt="" />
              <span>New Admin</span>
            </NavLink>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Navbar;
