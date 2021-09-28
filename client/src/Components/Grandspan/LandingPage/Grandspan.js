import React from "react";
import { Link } from "react-router-dom";

//images
import bg from "../../../PublicImages/bg.jpg";

//css
import "./Grandspan.css";

const Grandspan = () => {
  return (
    <div className="grandspan_LandingPage">
      <section className="grandspan_LandingPage_Background">
        <img src={bg} alt="" />
      </section>
      <section className="grandspan_LandingPage_Text">
        <p className="first">Grandspan Development Corporation</p>
        <p>The Leader in Quality Infrastracture</p>
        <p className="third">Join our team today!</p>
        <section className="grandspan_LandingPage_Btn">
          <Link className="applicants" to="/ApplicantsForm">
            Apply now
          </Link>
          <Link className="admin" to="/Login">
            Admin
          </Link>
        </section>
      </section>
    </div>
  );
};

export default Grandspan;
