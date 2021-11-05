import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import ProfileImage from "../../../ReusableFunctions/ProfileImage/ProfileImage";

// REDUX ACTIONS
import { removeUsertokenActions } from "../../../Redux/Redux_actions/actions";

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
              Applicants
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Employee"
              className="link"
              activeClassName="active_Link"
            >
              Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Department"
              className="link"
              activeClassName="active_Link"
            >
              Department
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Newadmin"
              className="link"
              activeClassName="active_Link"
            >
              New admin
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
