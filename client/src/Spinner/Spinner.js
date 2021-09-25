import React from "react";

//css
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner_container">
      <section className="first_spinner"></section>
      <span>Loading...</span>
    </div>
  );
};

export default Spinner;
