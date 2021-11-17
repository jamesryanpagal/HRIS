import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// COMPONENT
import Reject from "../../../ReusableFunctions/Confirmation/Reject/Reject";
import Accept from "../../../ReusableFunctions/Confirmation/Accept/Accept";
import Spinner from "../../../Spinner/Spinner";

// REDUX ACTIONS
import {
  adminUsernameActions,
  applicantsActions,
  assignApplicationApplicantActions,
  unassignApplicationApplicantActions,
  removeApplicantActions,
  moveToScreening,
  assignScreeningApplicantActions,
  unassignScreeningApplicantActions,
  removeApplicantScreeningActions,
  moveToInterviewActions,
  assignInterviewApplicantActions,
  unassignInterviewApplicantActions,
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

  // SHOW SEND EMAIL STATE
  const [showSendEmail, setShowSendEmail] = useState(false);

  // SENDING EMAIL DETAILS STATE
  const [sendEmailDetails, setSendEmailDetails] = useState({
    meetingLink: "",
    interviewDate: "",
    hour: "00",
    minutes: "00",
    meridiem: "am",
  });

  // MINUTES STATE
  const [minuteList, setMinuteList] = useState([]);

  // HOUR STATE
  const [hourList, setHourList] = useState([]);

  // SEND EMAIL RESPONSE STATE
  const [emailResponse, setEmailResponse] = useState("");

  // EMAIL SENT STATE
  const [emailSent, setEmailSent] = useState(false);

  // SEND EMAIL LOADER STATE
  const [sendEmailLoading, setSendEmailLoading] = useState(false);

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
      setShowSendEmail(true);
    }
  }, [applicantId, screening]);

  // get applicant details from Interview
  useEffect(() => {
    const applicant = interview.find((a) => a._id === applicantId);
    if (applicant) {
      setApplicant_Details({ ...applicant });
    }
  }, [applicantId, interview]);

  // create time
  useEffect(() => {
    // minutes
    let minutearr = [];
    // hour
    let hourarr = [];
    for (let x = 0; x <= 59; x++) {
      minutearr.push(x.toString());
      if (x >= 0 && x <= 12) {
        hourarr.push(x.toString());
      }
    }
    setMinuteList([...minutearr]);
    setHourList([...hourarr]);
  }, []);

  // send email onchange
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSendEmailDetails((prev) => ({ ...prev, [name]: value }));
  };

  // handle send email
  const handleSendEmail = async () => {
    try {
      setSendEmailLoading(true);
      const { data } = await axiosConfig.post("/SendingEmail", {
        ...sendEmailDetails,
        email: applicant_Details.email,
        name: `${applicant_Details.firstname} ${applicant_Details.lastname}`,
        gender: applicant_Details.gender === "male" ? "Mr" : "Ms/Mrs",
      });

      // check error
      if (data.isError) {
        setEmailResponse(
          <section className="emailResponseError">
            <i className="fas fa-exclamation-triangle"></i> {data.errorMessage}
          </section>
        );
        setSendEmailLoading(false);
        return;
      }
      setSendEmailLoading(false);
      setEmailResponse(
        <section className="emailResponseSuccess">
          <i className="fas fa-check-circle"></i> {data}
        </section>
      );
      setEmailSent(true);
    } catch (error) {
      console.log(error);
    }
  };

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
          {/* SENDING EMAIL */}
          {showSendEmail && (
            <>
              {/* SENDING EMAIL RESPONSE */}
              {emailResponse && (
                <section className="sending_Email_Response">
                  {emailResponse}
                </section>
              )}
              {/* SENDING EMAIL CONTAINER */}
              <section className="sending_Email_Container">
                {/* SEDING EMAIL HEADER */}
                <section className="sending_Email_Header">Send email</section>
                {/* SENDING EMAIL INPUT GROUPS */}
                <section className="sending_Email_Input_Groups">
                  {/* MEETING LINK GROUP */}
                  <section className="sendingEmail_Group">
                    <label htmlFor="meetingLink">Meeting link</label>
                    <input
                      type="text"
                      name="meetingLink"
                      id="meetingLink"
                      onChange={handleChange}
                    />
                  </section>
                  {/* INTERVIEW DATE GROUP */}
                  <section className="sendingEmail_Group">
                    <label htmlFor="interviewDate">Interview date</label>
                    <input
                      type="date"
                      name="interviewDate"
                      id="interviewDate"
                      onChange={handleChange}
                    />
                  </section>
                  {/* INTERVIEW TIME GROUP */}
                  <section className="sendingEmail_Group">
                    <label htmlFor="interviewTime">Interview time</label>
                    <section>
                      {/* HOUR */}
                      <select name="hour" onChange={handleChange}>
                        {hourList.map((h, i) => (
                          <option key={i} value={h.length === 1 ? `0${h}` : h}>
                            {h.length === 1 ? `0${h}` : h}
                          </option>
                        ))}
                      </select>
                      {/* MINUTES */}
                      <select name="minutes" onChange={handleChange}>
                        {minuteList.map((m, i) => (
                          <option key={i} value={m.length === 1 ? `0${m}` : m}>
                            {m.length === 1 ? `0${m}` : m}
                          </option>
                        ))}
                      </select>
                      {/* MERIDIEM */}
                      <select name="meridiem" onChange={handleChange}>
                        <option value="am">am</option>
                        <option value="pm">pm</option>
                      </select>
                    </section>
                  </section>
                  {/* SEND EMAIL BUTTON */}
                  <section
                    className={
                      sendEmailLoading
                        ? "sendEmail_Button_Disable"
                        : "sendEmail_Button"
                    }
                  >
                    <button type="button" onClick={handleSendEmail}>
                      {sendEmailLoading ? <Spinner /> : "Send"}
                    </button>
                  </section>
                </section>
              </section>
            </>
          )}
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
              className={
                showSendEmail
                  ? !emailSent
                    ? "accept_Disable"
                    : "accept"
                  : "accept"
              }
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

  // disable assign
  const [loadingAssign, setLoadingAssign] = useState(false);

  // response message for assigning
  const [resMessage, setResmessage] = useState("");

  // remove applicant
  const [isRemove, setIsRemove] = useState(false);

  // dispatch instance
  const dispatch = useDispatch();

  // selector instance
  const { applicants, screening, interview, rejected, hired } = useSelector(
    (state) => state.Applicants
  );

  const { admin_token, admin } = useSelector((state) => state.GS_Admin);

  // -------------------- FOR ADMIN -------------------
  // get admin details
  useEffect(() => {
    const getAdminDetails = async () => {
      try {
        const { data } = await axiosConfig.get("/VerifyToken", {
          headers: { key: admin_token },
        });
        dispatch(adminUsernameActions(data.Username));
      } catch (error) {
        console.log(error);
      }
    };

    getAdminDetails();
  }, [admin_token, dispatch]);

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

  // if applicant still exist in application
  useEffect(() => {
    screening.map((ai) => {
      const applicantApplication = applicants.find(
        (as) => as._id === ai.applicant_id
      );
      if (applicantApplication) {
        return dispatch(removeApplicantActions(applicantApplication._id));
      }
      return applicantApplication;
    });
  }, [dispatch, applicants, screening]);

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

  // if applicant still exist in screening
  useEffect(() => {
    interview.map((ai) => {
      const applicantScreening = screening.find(
        (as) => as._id === ai.applicant_id
      );
      if (applicantScreening) {
        return dispatch(
          removeApplicantScreeningActions(applicantScreening._id)
        );
      }
      return applicantScreening;
    });
  }, [dispatch, screening, interview]);

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

  // if applicant still exist in interview
  useEffect(() => {
    hired.map((ai) => {
      const applicantInterview = interview.find(
        (as) => as._id === ai.applicant_id
      );
      if (applicantInterview) {
        return dispatch(
          removeApplicantInterviewActions(applicantInterview._id)
        );
      }
      return applicantInterview;
    });
  }, [dispatch, interview, hired]);

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

  // if applicant still exist in application
  useEffect(() => {
    rejected.map((ai) => {
      const applicantApplications = applicants.find(
        (as) => as._id === ai.applicant_id
      );
      if (applicantApplications) {
        return dispatch(removeApplicantActions(applicantApplications._id));
      }
      return applicantApplications;
    });
  }, [dispatch, applicants, rejected]);

  // if applicant still exist in screening
  useEffect(() => {
    rejected.map((ai) => {
      const applicantScreening = screening.find(
        (as) => as._id === ai.applicant_id
      );
      if (applicantScreening) {
        return dispatch(
          removeApplicantScreeningActions(applicantScreening._id)
        );
      }
      return applicantScreening;
    });
  }, [dispatch, screening, rejected]);

  // if applicant still exist in interview
  useEffect(() => {
    rejected.map((ai) => {
      const applicantInterview = interview.find(
        (as) => as._id === ai.applicant_id
      );
      if (applicantInterview) {
        return dispatch(
          removeApplicantInterviewActions(applicantInterview._id)
        );
      }
      return applicantInterview;
    });
  }, [dispatch, interview, rejected]);

  // ------------------- FOR ASSIGNING APPLICANT --------------
  // assigned application applicant
  useEffect(() => {
    socket.on("assignedApplicationApplicant", ({ adminName, applicantId }) => {
      dispatch(assignApplicationApplicantActions(adminName, applicantId));
    });
  }, [dispatch]);

  // unassign application applicant
  useEffect(() => {
    socket.on("unassignedApplicationApplicant", ({ applicantId }) => {
      dispatch(unassignApplicationApplicantActions(applicantId));
    });
  }, [dispatch]);

  // ------------------ FOR ASSIGNING SCREENING -----------------
  // assigned screening applicant
  useEffect(() => {
    socket.on("assignedScreeningApplicant", ({ adminName, applicantId }) => {
      dispatch(assignScreeningApplicantActions(adminName, applicantId));
    });
  }, [dispatch]);

  // unassign screening applicant
  useEffect(() => {
    socket.on("unassignedScreeningApplicant", ({ applicantId }) => {
      dispatch(unassignScreeningApplicantActions(applicantId));
    });
  }, [dispatch]);

  // ------------------ FOR ASSIGNING INTERVIEW -----------------
  // assigned interview applicant
  useEffect(() => {
    socket.on("assignedInterviewApplicant", ({ adminName, applicantId }) => {
      dispatch(assignInterviewApplicantActions(adminName, applicantId));
    });
  }, [dispatch]);

  // unassign interview applicant
  useEffect(() => {
    socket.on("unassignedInterviewApplicant", ({ applicantId }) => {
      dispatch(unassignInterviewApplicantActions(applicantId));
    });
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

  // handle assign application applicant
  const handleAssignApplicationsApplicant = async (e) => {
    const target = e.target;
    try {
      setLoadingAssign(true);
      const { data } = await axiosConfig.patch(
        "/AssignApplicant/assignApplicationApplicant/" +
          target.children[0].innerText,
        { adminName: admin }
      );
      if (data === "Already assigned") {
        setResmessage("Already assign to other admin");
        setLoadingAssign(false);
        return;
      }
      socket.emit("assignApplicationApplicant", {
        adminName: data.assignedBy,
        applicantId: data._id,
      });
      setLoadingAssign(false);
    } catch (error) {
      console.log(error);
    }
  };

  // handle unassign application applicant
  const handleUnassignApplicationsApplicant = async (e) => {
    const target = e.target;
    try {
      setLoadingAssign(true);
      const { data } = await axiosConfig.patch(
        "/AssignApplicant/unassignApplicationApplicant/" +
          target.children[0].innerText
      );
      socket.emit("unassignApplicationApplicant", {
        applicantId: data,
      });
      setLoadingAssign(false);
    } catch (error) {
      console.log(error);
    }
  };

  // handle assign screening applicant
  const handleAssignScreeningApplicant = async (e) => {
    const target = e.target;
    try {
      setLoadingAssign(true);
      const { data } = await axiosConfig.patch(
        "/AssignApplicant/assignScreeningApplicant/" +
          target.children[0].innerText,
        { adminName: admin }
      );
      if (data === "Already assigned") {
        setResmessage("Already assign to other admin");
        setLoadingAssign(false);
        return;
      }
      socket.emit("assignScreeningApplicant", {
        adminName: data.assignedBy,
        applicantId: data._id,
      });
      setLoadingAssign(false);
    } catch (error) {
      console.log(error);
    }
  };

  // handle unassign screening applicant
  const handleUnassignScreeningApplicant = async (e) => {
    const target = e.target;
    try {
      setLoadingAssign(true);
      const { data } = await axiosConfig.patch(
        "/AssignApplicant/unassignScreeningApplicant/" +
          target.children[0].innerText
      );
      socket.emit("unassignScreeningApplicant", {
        applicantId: data,
      });
      setLoadingAssign(false);
    } catch (error) {
      console.log(error);
    }
  };

  // handle assign interview applicant
  const handleAssignInterviewApplicant = async (e) => {
    const target = e.target;
    try {
      setLoadingAssign(true);
      const { data } = await axiosConfig.patch(
        "/AssignApplicant/assignInterviewApplicant/" +
          target.children[0].innerText,
        { adminName: admin }
      );
      if (data === "Already assigned") {
        setResmessage("Already assign to other admin");
        setLoadingAssign(false);
        return;
      }
      socket.emit("assignInterviewApplicant", {
        adminName: data.assignedBy,
        applicantId: data._id,
      });
      setLoadingAssign(false);
    } catch (error) {
      console.log(error);
    }
  };

  // handle unassign interview applicant
  const handleUnassignInterviewApplicant = async (e) => {
    const target = e.target;
    try {
      setLoadingAssign(true);
      const { data } = await axiosConfig.patch(
        "/AssignApplicant/unassignInterviewApplicant/" +
          target.children[0].innerText
      );
      socket.emit("unassignInterviewApplicant", {
        applicantId: data,
      });
      setLoadingAssign(false);
    } catch (error) {
      console.log(error);
    }
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
          {/* RESPONSE MESSAGE */}
          {resMessage && (
            <section className="resMessage">
              <i className="fas fa-exclamation-triangle"></i>
              <span> {resMessage}</span>
            </section>
          )}
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
                    <section
                      key={a._id}
                      className={
                        a.assignedBy === "N/A"
                          ? "applicant"
                          : a.assignedBy === admin
                          ? "applicant"
                          : "disable_Applicant"
                      }
                    >
                      {/* ASSIGN BUTTON */}
                      {admin !== a.assignedBy ? (
                        // ASSIGN BUTTON
                        <section
                          className={
                            loadingAssign
                              ? "disable_Assign_Button"
                              : "assign_Button"
                          }
                          onClick={handleAssignApplicationsApplicant}
                        >
                          <span>{a._id}</span>
                          <i className="fas fa-thumbtack"></i>
                        </section>
                      ) : (
                        // UNASSIGN BUTTON
                        <section
                          className={
                            loadingAssign
                              ? "disable_Assign_Button"
                              : "unassign_Button"
                          }
                          onClick={handleUnassignApplicationsApplicant}
                        >
                          <span>{a._id}</span>
                          <i className="fas fa-backspace"></i>
                        </section>
                      )}
                      {/* APPLICANTS NAME */}
                      <section className="applicant_Name">
                        <p>{`${a.firstname} ${a.middle}.`}</p>
                        <p>{a.lastname}</p>
                      </section>
                      {/* APPLICANTS VIEW DETAILS BUTTON */}
                      <section className="applicant_View_Details">
                        <button
                          type="button"
                          onClick={handleViewApplicantDetails}
                        >
                          {/* applicant id */}
                          <span>{a._id}</span>
                          {/* remove applicant from database */}
                          <span>{`/Applicants/removeApplicant/${a._id}`}</span>
                          {/* move applicant to screening database */}
                          <span>{"/Applicants/acceptApplicant"}</span>
                          {/* remove applicant from redux */}
                          <span>{"rejectapplicant"}</span>
                          {/* move applicant to redux */}
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
                    <section
                      key={a._id}
                      className={
                        a.assignedBy === "N/A"
                          ? "applicant"
                          : a.assignedBy === admin
                          ? "applicant"
                          : "disable_Applicant"
                      }
                    >
                      {/* ASSIGN BUTTON */}
                      {admin !== a.assignedBy ? (
                        // ASSIGN BUTTON
                        <section
                          className={
                            loadingAssign
                              ? "disable_Assign_Button"
                              : "assign_Button"
                          }
                          onClick={handleAssignScreeningApplicant}
                        >
                          <span>{a._id}</span>
                          <i className="fas fa-thumbtack"></i>
                        </section>
                      ) : (
                        // UNASSIGN BUTTON
                        <section
                          className={
                            loadingAssign
                              ? "disable_Assign_Button"
                              : "unassign_Button"
                          }
                          onClick={handleUnassignScreeningApplicant}
                        >
                          <span>{a._id}</span>
                          <i className="fas fa-backspace"></i>
                        </section>
                      )}
                      {/* APPLICANTS NAME */}
                      <section className="applicant_Name">
                        <p>{`${a.firstname} ${a.middle}.`}</p>
                        <p>{a.lastname}</p>
                      </section>
                      {/* APPLICANTS VIEW DETAILS BUTTON */}
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
                    <section
                      key={a._id}
                      className={
                        a.assignedBy === "N/A"
                          ? "applicant"
                          : a.assignedBy === admin
                          ? "applicant"
                          : "disable_Applicant"
                      }
                    >
                      {/* ASSIGN BUTTON */}
                      {admin !== a.assignedBy ? (
                        // ASSIGN BUTTON
                        <section
                          className={
                            loadingAssign
                              ? "disable_Assign_Button"
                              : "assign_Button"
                          }
                          onClick={handleAssignInterviewApplicant}
                        >
                          <span>{a._id}</span>
                          <i className="fas fa-thumbtack"></i>
                        </section>
                      ) : (
                        // UNASSIGN BUTTON
                        <section
                          className={
                            loadingAssign
                              ? "disable_Assign_Button"
                              : "unassign_Button"
                          }
                          onClick={handleUnassignInterviewApplicant}
                        >
                          <span>{a._id}</span>
                          <i className="fas fa-backspace"></i>
                        </section>
                      )}
                      {/* APPLICANTS NAME */}
                      <section className="applicant_Name">
                        <p>{`${a.firstname} ${a.middle}.`}</p>
                        <p>{a.lastname}</p>
                      </section>
                      {/* APPLICANTS VIEW DETAILS BUTTON */}
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
                      {/* APPLICANTS NAME */}
                      <section className="applicant_Name">
                        <p>{`${a.firstname} ${a.middle}.`}</p>
                        <p>{a.lastname}</p>
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
                      {/* APPLICANTS NAME */}
                      <section className="applicant_Name">
                        <p>{`${a.firstname} ${a.middle}.`}</p>
                        <p>{a.lastname}</p>
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
