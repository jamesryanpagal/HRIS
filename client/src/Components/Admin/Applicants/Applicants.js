import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// COMPONENT
import Reject from "../../../ReusableFunctions/Confirmation/Reject/Reject";
import Accept from "../../../ReusableFunctions/Confirmation/Accept/Accept";

// REDUX ACTIONS
import {
  applicantsActions,
  removeApplicantActions,
  moveToScreening,
  removeApplicantScreeningActions,
  moveToInterviewActions,
  removeApplicantInterviewActions,
  moveToHiredActions,
  rejectedApplicantActions,
} from "../../../Redux/Redux_actions/actions";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

//css
import "./Applicants.css";

// SOCKET CONNECTION
const socket = io.connect("https://grandspan.herokuapp.com/");

// --------------------------------- APPLICANT DETAILS MODAL ----------------------
const ApplicantDetails = ({
  applicantId,
  rejectApi,
  acceptApi,
  rejectSocket,
  acceptSocket,
  screening,
  applicants,
  interview,
  setToggleApplicantDetails,
  loading,
  setLoading,
  setIsRemove,
}) => {
  // APPLICANT DETAILS STATE
  const [applicant_Details, setApplicant_Details] = useState({});

  // TOGGLE CONFIRM REJECT STATE
  const [confirmReject, setConfirmReject] = useState(false);

  // TOGGLE CONFIRM ACCEPT STATE
  const [confirmAccept, setConfirmAccept] = useState(false);

  // defaultLayoutPlugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // get applicant details from Applicants
  useEffect(() => {
    const applicant = applicants.find((a) => a._id === applicantId);
    if (applicant) {
      setApplicant_Details({ ...applicant });
    }
  }, [applicantId, applicants]);

  // get applicant details from Screening
  useEffect(() => {
    const applicant = screening.find((a) => a._id === applicantId);
    if (applicant) {
      setApplicant_Details({ ...applicant });
    }
  }, [applicantId, screening]);

  // get applicant details from Interview
  useEffect(() => {
    const applicant = interview.find((a) => a._id === applicantId);
    if (applicant) {
      setApplicant_Details({ ...applicant });
    }
  }, [applicantId, interview]);

  return (
    <div className="applicants_Details_Container">
      {/* ------------------ TOGGLE CONFIRMATION ------------------- */}
      {/* CONFIRM REJECT */}
      {confirmReject && (
        <Reject
          applicantId={applicantId}
          rejectApi={rejectApi}
          socket={socket}
          rejectSocket={rejectSocket}
          loading={loading}
          setLoading={setLoading}
          setIsRemove={setIsRemove}
          setConfirmReject={setConfirmReject}
        />
      )}

      {/* CONFIRM ACCEPT */}
      {confirmAccept && (
        <Accept
          applicantId={applicantId}
          acceptApi={acceptApi}
          socket={socket}
          acceptSocket={acceptSocket}
          loading={loading}
          setIsRemove={setIsRemove}
          setLoading={setLoading}
          setConfirmAccept={setConfirmAccept}
        />
      )}

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
          {/* ACTIONS */}
          <section className="applicants_Actions">
            <button
              type="button"
              className="reject"
              onClick={() => setConfirmReject(true)}
            >
              Reject
            </button>
            <button
              type="button"
              className="accept"
              onClick={() => setConfirmAccept(true)}
            >
              Accept
            </button>
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

  // applicant reject api
  const [rejectApi, setRejectApi] = useState("");

  // applicant accept api
  const [acceptApi, setAcceptApi] = useState("");

  // reject socket
  const [rejectSocket, setRejectSocket] = useState("");

  // accept socket
  const [acceptSocket, setAcceptSocket] = useState("");

  // loading
  const [loading, setLoading] = useState(false);

  // remove applicant
  const [isRemove, setIsRemove] = useState(false);

  // dispatch instance
  const dispatch = useDispatch();

  // selector instance
  const { applicants, screening, interview, rejected, hired } = useSelector(
    (state) => state.Applicants
  );

  // ------------------------- FOR APPLICANTS ----------------------------
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

  // delete applicants from redux
  useEffect(() => {
    socket.on("removeApplicant", ({ id, applicantData }) => {
      dispatch(removeApplicantActions(id));
      dispatch(rejectedApplicantActions(applicantData));
      if (isRemove) {
        window.location.reload();
      }
    });
  }, [dispatch, isRemove]);

  // ------------------------- FOR SCREENING ----------------------------
  // move applicant to screening
  useEffect(() => {
    socket.on("moveToScreening", (data) => {
      dispatch(moveToScreening(data));
      dispatch(removeApplicantActions(data.applicant_id));
      if (isRemove) {
        setLoading(false);
        window.location.reload();
      }
    });
  }, [dispatch, isRemove]);

  // get applicant screening from database
  useEffect(() => {
    const getApplicantScreening = async () => {
      const { data } = await axiosConfig.get(
        "/Applicants/getApplicantScreening"
      );
      data.map((a) => dispatch(moveToScreening(a)));
    };

    getApplicantScreening();
  }, [dispatch]);

  // delete applicantscreening from redux
  useEffect(() => {
    socket.on("removeApplicantScreening", ({ id, applicantData }) => {
      dispatch(removeApplicantScreeningActions(id));
      dispatch(rejectedApplicantActions(applicantData));
      if (isRemove) {
        setLoading(false);
        window.location.reload();
      }
    });
  }, [dispatch, isRemove]);

  // ------------------------------- FOR INTERVIEW ----------------------
  // move applicant to interview
  useEffect(() => {
    socket.on("moveToInterview", (data) => {
      dispatch(moveToInterviewActions(data));
      dispatch(removeApplicantScreeningActions(data.applicant_id));
      if (isRemove) {
        setLoading(false);
        window.location.reload();
      }
    });
  }, [dispatch, isRemove]);

  // get applicant interview from database
  useEffect(() => {
    const getAllApplicantInterview = async () => {
      const { data } = await axiosConfig.get(
        "/Applicants/getApplicantInterview"
      );
      data.map((a) => dispatch(moveToInterviewActions(a)));
    };

    getAllApplicantInterview();
  }, [dispatch]);

  // delete applicant interview from redux
  useEffect(() => {
    socket.on("removeApplicantInterview", ({ id, applicantData }) => {
      dispatch(removeApplicantInterviewActions(id));
      dispatch(rejectedApplicantActions(applicantData));
      if (isRemove) {
        setLoading(false);
        window.location.reload();
      }
    });
  }, [dispatch, isRemove]);

  // -------------------- FOR HIRED -----------------------
  // move applicant to hired
  useEffect(() => {
    socket.on("moveToHired", (data) => {
      dispatch(moveToHiredActions(data));
      dispatch(removeApplicantInterviewActions(data.applicant_id));
      if (isRemove) {
        setLoading(false);
        window.location.reload();
      }
    });
  }, [dispatch, isRemove]);

  // get applicant from database
  useEffect(() => {
    const getAllApplicantHires = async () => {
      const { data } = await axiosConfig.get("/Applicants/getApplicantHired");
      data.map((a) => dispatch(moveToHiredActions(a)));
    };

    getAllApplicantHires();
  }, [dispatch]);

  // ----------------------------- FOR REJECTED -----------------------
  // get applicant from database
  useEffect(() => {
    const getAllApplicantRejected = async () => {
      const { data } = await axiosConfig.get(
        "/Applicants/getApplicantRejected"
      );
      data.map((a) => dispatch(rejectedApplicantActions(a)));
    };

    getAllApplicantRejected();
  }, [dispatch]);

  // view applicant details
  const handleViewApplicantDetails = (e) => {
    const applicantInfo = e.target.children;
    setApplicantId(applicantInfo[0].innerText);
    setRejectApi(applicantInfo[1].innerText);
    setAcceptApi(applicantInfo[2].innerText);
    setRejectSocket(applicantInfo[3].innerText);
    setAcceptSocket(applicantInfo[4].innerText);
    setToggleApplicantDetails(true);
  };

  return (
    <div className="applicants_Container">
      {/* ---------------------------- MODAL ------------------------- */}
      {/* APPLICANT DETAILS MODAL */}
      {toggleApplicantDetails && (
        <ApplicantDetails
          applicantId={applicantId}
          rejectApi={rejectApi}
          acceptApi={acceptApi}
          rejectSocket={rejectSocket}
          acceptSocket={acceptSocket}
          screening={screening}
          applicants={applicants}
          interview={interview}
          setToggleApplicantDetails={setToggleApplicantDetails}
          loading={loading}
          setLoading={setLoading}
          setIsRemove={setIsRemove}
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
          <span>Total Applicants: </span>
          <section className="total_Applicant_List">
            {applicants.length}
          </section>
        </section>
        {/* LIST */}
        <section className="applicants_List">
          {/* PROCESSING */}
          <section className="processing">
            {/* --------------------- APPLICATIONS -------------------- */}
            <section className="applications">
              {/* HEADER */}
              <section className="applications_Header">Applications</section>
              {/* APPLICANTS LIST */}
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
                          onClick={handleViewApplicantDetails}
                        >
                          <span>{a._id}</span>
                          <span>{`/Applicants/removeApplicant/${a._id}`}</span>
                          <span>{"/Applicants/acceptApplicant"}</span>
                          <span>{"rejectapplicant"}</span>
                          <span>{"acceptApplicant"}</span>
                          View details
                        </button>
                      </section>
                    </section>
                  );
                })}
              </section>
            </section>
            {/* ----------------------- SCREENING ---------------------- */}
            <section className="applications screening">
              {/* HEADER */}
              <section className="applications_Header">Screening</section>
              {/* APPLICANTS SCREENING LIST */}
              <section className="applicants_List">
                {screening.map((a) => {
                  return (
                    <section key={a._id} className="applicant">
                      <section className="applicant_Name">
                        {a.firstname}
                      </section>
                      <section className="applicant_View_Details">
                        <button
                          type="button"
                          onClick={handleViewApplicantDetails}
                        >
                          {/* Appicant id */}
                          <span>{a._id}</span>
                          {/* remove applicant from database api */}
                          <span>{`/Applicants/removeApplicantScreening/${a._id}`}</span>
                          {/* move applicant to interview */}
                          <span>{"/Applicants/acceptApplicantScreening"}</span>
                          {/* remove applicant from redux */}
                          <span>{"rejectApplicantScreening"}</span>
                          {/* move applicant to redux */}
                          <span>{"acceptApplicantScreening"}</span>
                          View details
                        </button>
                      </section>
                    </section>
                  );
                })}
              </section>
            </section>
            {/* ----------------------- INTERVIEW ---------------------- */}
            <section className="applications interview">
              {/* HEADER */}
              <section className="applications_Header">Interview</section>
              <section className="applicants_List">
                {interview.map((a) => {
                  return (
                    <section key={a._id} className="applicant">
                      <section className="applicant_Name">
                        {a.firstname}
                      </section>
                      <section className="applicant_View_Details">
                        <button
                          type="button"
                          onClick={handleViewApplicantDetails}
                        >
                          {/* Appicant id */}
                          <span>{a._id}</span>
                          {/* remove applicant from database api */}
                          <span>{`/Applicants/removeApplicantInterview/${a._id}`}</span>
                          {/* hired applicant */}
                          <span>{"/Applicants/hiredApplicant"}</span>
                          {/* remove applicant from redux */}
                          <span>{"rejectApplicantInterview"}</span>
                          {/* move applicant to redux */}
                          <span>{"acceptApplicantInterview"}</span>
                          View details
                        </button>
                      </section>
                    </section>
                  );
                })}
              </section>
            </section>
          </section>
          {/* RESULT */}
          <section className="result">
            {/* ---------------------- REJECTED -------------------- */}
            <section className="applications rejected">
              {/* HEADER */}
              <section className="applications_Header">Rejected</section>
              <section className="applicants_List">
                {rejected.map((a) => {
                  return (
                    <section key={a._id} className="applicant">
                      <section className="applicant_Name">
                        {a.firstname}
                      </section>
                    </section>
                  );
                })}
              </section>
            </section>
            {/* ---------------------------- HIRED -------------------------------------- */}
            <section className="applications hired">
              {/* HEADER */}
              <section className="applications_Header">Hired</section>
              <section className="applicants_List">
                {hired.map((a) => {
                  return (
                    <section key={a._id} className="applicant">
                      <section className="applicant_Name">
                        {a.firstname}
                      </section>
                    </section>
                  );
                })}
              </section>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Applicants;
