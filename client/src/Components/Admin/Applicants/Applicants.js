import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// REDUX ACTIONS
import { applicantsActions } from "../../../Redux/Redux_actions/actions";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

//css
import "./Applicants.css";

// SOCKET CONNECTION
const socket = io.connect("http://localhost:8080/");

// --------------------------------- APPLICANT DETAILS MODAL ----------------------
const ApplicantDetails = ({
  applicantId,
  applicants,
  setToggleApplicantDetails,
}) => {
  // APPLICANT DETAILS STATE
  const [applicant_Details, setApplicant_Details] = useState({});

  // defaultLayoutPlugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const applicant = applicants.find((a) => a._id === applicantId);
    setApplicant_Details({ ...applicant });
  }, [applicantId, applicants]);

  return (
    <div className="applicants_Details_Container">
      {/* CLOSE */}
      <section
        className="close_Applicant_Details"
        onClick={() => setToggleApplicantDetails(false)}
      >
        <i className="fas fa-times"></i>
      </section>
      {/* APPLICANT DETAILS */}
      <section className="applicants_Details">
        {/* BASIC DETAILS */}
        <section className="applicants_Basic_Details">
          {/* LASTNAME */}
          <section className="applicant">
            <label>Lastname</label>
            <section className="info">{applicant_Details.lastname}</section>
          </section>
          {/* FIRSTNAME */}
          <section className="applicant">
            <label>Firstname</label>
            <section className="info">{applicant_Details.firstname}</section>
          </section>
          {/* MIDDLE */}
          <section className="applicant">
            <label>Middle</label>
            <section className="info">{applicant_Details.middle}</section>
          </section>
          {/* PHONE */}
          <section className="applicant">
            <label>Phone</label>
            <section className="info">{applicant_Details.phone}</section>
          </section>
          {/* BIRTHDAY */}
          <section className="applicant">
            <label>Birthday</label>
            <section className="info">{applicant_Details.birthday}</section>
          </section>
          {/* GENDER */}
          <section className="applicant">
            <label>Gender</label>
            <section className="info">{applicant_Details.gender}</section>
          </section>
          {/* ADDRESS */}
          <section className="applicant">
            <label>Address</label>
            <section className="info">{applicant_Details.address}</section>
          </section>
          {/* EMAIL */}
          <section className="applicant">
            <label>Email</label>
            <section className="info">{applicant_Details.email}</section>
          </section>
        </section>
        {/* RESUME */}
        <section className="applicants_Resume">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer
              fileUrl={applicant_Details.resume}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </section>
      </section>
    </div>
  );
};

// ---------------------------------- MAIN ----------------------------------
const Applicants = () => {
  // ---------------- STATE ----------------
  // toggle applicant details modal state
  const [toggleApplicantDetails, setToggleApplicantDetails] = useState(false);

  // applicant id
  const [applicantId, setApplicantId] = useState("");

  // dispatch instance
  const dispatch = useDispatch();

  // selector instance
  const { applicants } = useSelector((state) => state.Applicants);

  // get applicants form in realtime
  useEffect(() => {
    socket.on("getApplicants", (data) => {
      dispatch(applicantsActions(data));
    });
  }, [dispatch]);

  // get applicants form from database
  useEffect(() => {
    const getApplicants = async () => {
      const { data } = await axiosConfig.get("/Applicants/getApplicants");
      data.map((a) => dispatch(applicantsActions(a)));
    };

    getApplicants();
  }, [dispatch]);

  // view applicant details
  const handleViewApplicantDetails = (e) => {
    const id = e.target.value;
    setApplicantId(id);
    setToggleApplicantDetails(true);
  };

  return (
    <div className="applicants_Container">
      {/* ---------------------------- MODAL ------------------------- */}
      {/* APPLICANT DETAILS MODAL */}
      {toggleApplicantDetails && (
        <ApplicantDetails
          applicantId={applicantId}
          applicants={applicants}
          setToggleApplicantDetails={setToggleApplicantDetails}
        />
      )}

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
                {applicants.map((a) => {
                  return (
                    <section key={a._id} className="applicant">
                      <section className="applicant_Name">
                        {a.firstname}
                      </section>
                      <section className="applicant_View_Details">
                        <button
                          type="button"
                          value={a._id}
                          onClick={handleViewApplicantDetails}
                        >
                          View details
                        </button>
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
