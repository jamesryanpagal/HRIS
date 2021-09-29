import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

// REDUX ACTIONS
import { applicantsActions } from "../../../Redux/Redux_actions/actions";

//css
import "./Applicants.css";

// SOCKET CONNECTION
const socket = io.connect("https://grandspan.herokuapp.com/");

const Applicants = () => {
  // dispatch instance
  const dispatch = useDispatch();

  // selector instance
  const { applicants } = useSelector((state) => state.Applicants);

  useEffect(() => {
    socket.on("getApplicants", (data) => {
      dispatch(applicantsActions(data));
    });
  }, [dispatch]);

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
              <section className="applicants_List">
                {applicants.map((a, index) => {
                  return (
                    <section key={index} className="applicant">
                      <section className="applicant_Name">
                        {a.firstname}
                      </section>
                      <section className="applicant_View_Details">
                        <button type="button">View details</button>
                      </section>
                    </section>
                  );
                })}
              </section>
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
