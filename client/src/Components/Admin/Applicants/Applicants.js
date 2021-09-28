import React from "react";

//css
import "./Applicants.css";

const Applicants = () => {
  return (
    <div className="applicants_Container">
      {/* ---------------------- HEADER ------------------------- */}
      <section className="applicants_Header">
        <span>APPLICANTS</span>
      </section>
      {/* ------------------------- APPLICANT LIST ------------------------ */}
      <section className="applicants_List_Container">
        {/* HEADER */}
        <section className="applicants_List_Header">
          Total Applicants: 0
        </section>
        {/* LIST */}
        <section className="applicants_List">
          {/* PROCESSING */}
          <section className="processing">
            <section className="applications">
              {/* HEADER */}
              <section className="applications_Header">Applications</section>
            </section>
            <section className="screening">
              {/* HEADER */}
              <section className="applications_Header">Screening</section>
            </section>
            <section className="interview">
              {/* HEADER */}
              <section className="applications_Header">Interview</section>
            </section>
          </section>
          {/* RESULT */}
          <section className="result">
            <section className="rejected">
              {/* HEADER */}
              <section className="applications_Header">Rejected</section>
            </section>
            <section className="hired">
              {/* HEADER */}
              <section className="applications_Header">Hired</section>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Applicants;
