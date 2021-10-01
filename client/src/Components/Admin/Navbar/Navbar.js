import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

// REDUX ACTIONS
import { removeUsertokenActions } from "../../../Redux/Redux_actions/actions";

//css
import "./Navbar.css";

const Navbar = () => {
  // dispatch
  const dispatch = useDispatch();

  return (
    <div className="admin_Navbar">
      {/* HEADER */}
      <section className="admin_Navbar_Header">
        <span>GDC HRIS</span>
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
