import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import ProfileImage from "../../../ReusableFunctions/ProfileImage/ProfileImage";

// REDUX ACTIONS
import { removeUsertokenActions } from "../../../Redux/Redux_actions/actions";

// Icons
import applicantsIcon from "../../../PublicImages/applicantsIcon.png";
import employeesIcon from "../../../PublicImages/employeesIcon.png";
import departmentIcon from "../../../PublicImages/departmentIcon.png";
import companyProjectsIcon from "../../../PublicImages/companyProjectsIcon.png";
import scheduleIcon from "../../../PublicImages/scheduleIcon.png";
import newadminIcon from "../../../PublicImages/newadminIcon.png";

//css
import "./Navbar.css";

const Navbar = () => {
  // ----------------- STATE ----------------
  // admin details state
  const [adminDetails, setAdminDetails] = useState({
    Employee_image: "",
    Username: "",
  });

  // dispatch
  const dispatch = useDispatch();

  // selector
  const { admin_token } = useSelector((state) => state.GS_Admin);

  // get admin details
  useEffect(() => {
    const getAdminDetails = async () => {
      const { data } = await axiosConfig.get("/VerifyToken", {
        headers: { key: admin_token },
      });
      setAdminDetails((prev) => ({
        ...prev,
        Employee_image: data.Employee_image,
        Username: data.Username,
      }));
    };

    getAdminDetails();
  }, [admin_token]);

  return (
    <div className="admin_Navbar">
      {/* HEADER */}
      <section className="admin_Profile_Container">
        <section className="adminProfile">
          <ProfileImage
            image={adminDetails.Employee_image}
            firstname={adminDetails.Username}
          />
        </section>
      </section>
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
              <span>
                Company <br />
                Projects
              </span>
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
      {/* LOGOUT */}
      <section className="admin_Signout">
        <button
          type="button"
          onClick={() => dispatch(removeUsertokenActions())}
        >
          Sign out
        </button>
      </section>
    </div>
  );
};

export default Navbar;
