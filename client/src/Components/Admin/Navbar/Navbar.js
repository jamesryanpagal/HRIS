import React from "react";
import { NavLink } from "react-router-dom";

//css
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="admin_Navbar">
      {/* HEADER */}
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
        </ul>
      </section>
    </div>
  );
};

export default Navbar;
