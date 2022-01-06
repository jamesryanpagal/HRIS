import React, { useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

//css
import "./ApplicantsForm.css";

// SOCKET CONNECTION
const socket = io.connect("https://grandspan.herokuapp.com/");

// ----------------------- MARRIED ADDITIONAL FORM ------------------------------
const MarriedAdditional = ({ setApplicantDetails }) => {
  const handleMarriedAdditional = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setApplicantDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <section className="married_Additional_Inputs">
        {/* SPOUCE FULLNAME */}
        <section className="married_Additional_Inputs_Group">
          <label>Spouce fullname</label>
          <input
            type="text"
            name="spouce_fullname"
            onChange={handleMarriedAdditional}
          />
        </section>
        {/* SPOUCE BIRTHDAY */}
        <section className="married_Additional_Inputs_Group">
          <label>Spouce birthday</label>
          <input
            type="date"
            name="spouce_birthday"
            onChange={handleMarriedAdditional}
          />
        </section>
        {/* SPOUCE CONTACT NUMBER */}
        <section className="married_Additional_Inputs_Group">
          <label>Spouce contact no.</label>
          <input
            type="number"
            name="spouce_contact_number"
            onChange={handleMarriedAdditional}
          />
        </section>
      </section>
    </div>
  );
};

// --------------------------- MAIN -----------------------------
const ApplicantsForm = () => {
  // ------------------------ STATE ----------------------------

  // applicant state
  const [applicantDetails, setApplicantDetails] = useState({
    assignedBy: "N/A",
    firstname: "",
    lastname: "",
    middle: "",
    phone: "",
    birthday: "",
    gender: "",
    address: "",
    email: "",
    resume: "",
    position: "",
    civil_status: "",
    spouce_fullname: "",
    spouce_birthday: "",
    spouce_contact_number: "",
    religion: "",
    bloodtype: "",
    height: "",
    weight: "",
    guardian: "",
  });

  // show married additional input
  const [showMarriedAdditional, setShowMarriedAdditional] = useState(false);

  // response messsage state
  const [resMessage, setResMessage] = useState("");

  // ON FOCUS
  const handleAppFormOnFocus = (e) => {
    const target = e.target.parentElement;
    target.children[0].className = "appForm_OnFocus";
  };

  // ON BLUR
  const handleAppFormOnBlur = (e) => {
    const target = e.target.parentElement;
    if (target.children[1].value) {
      target.children[0].className = "appForm_OnFocus";
      return;
    }

    target.children[0].className = "label";
  };

  // --------------------------- HANDLE CHANGE -------------------------
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setApplicantDetails((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------- UPLOAD RESUME-------------------
  const handleUploadResume = (e) => {
    const selectedFile = e.target.files[0];
    const fileType = ["application/pdf"];

    const reader = new FileReader();

    if (selectedFile) {
      if (fileType.includes(selectedFile.type)) {
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setApplicantDetails((prev) => ({ ...prev, resume: e.target.result }));
          setResMessage("");
        };
        return;
      }
      setResMessage(
        <section className="resError">
          <i className="fas fa-exclamation-triangle"></i>
          <span>Please upload pdf file only</span>
        </section>
      );
      setApplicantDetails((prev) => ({ ...prev, resume: "" }));
      return;
    }
  };

  // ------------------------------ SUBMIT APPLICANT FORM ----------------------------
  const handleApplicantFormSubmit = async (e) => {
    e.preventDefault();

    // DESCTRUCTURING applicants details
    const {
      lastname,
      firstname,
      middle,
      phone,
      birthday,
      gender,
      address,
      email,
      resume,
      position,
      civil_status,
      religion,
      guardian,
    } = applicantDetails;

    // CHECK NULL INPUT
    if (
      !lastname ||
      !firstname ||
      !middle ||
      !phone ||
      !birthday ||
      !gender ||
      !address ||
      !email ||
      !resume ||
      !position ||
      !civil_status ||
      !religion ||
      !guardian
    ) {
      setResMessage(
        <section className="resError">
          <i className="fas fa-exclamation-triangle"></i>
          <span>Please fill out all the input fields</span>
        </section>
      );
      return;
    }

    // CHECK, F,L AND M MUST BE STRING ONLY
    const regexForString = /[0-9]/;

    if (regexForString.test(lastname)) {
      setResMessage(
        <section className="resError">
          <i className="fas fa-exclamation-triangle"></i>
          <span>Invalid lastname</span>
        </section>
      );
      return;
    }

    if (regexForString.test(firstname)) {
      setResMessage(
        <section className="resError">
          <i className="fas fa-exclamation-triangle"></i>
          <span>Invalid firstname</span>
        </section>
      );
      return;
    }

    if (regexForString.test(middle)) {
      setResMessage(
        <section className="resError">
          <i className="fas fa-exclamation-triangle"></i>
          <span>Invalid middle</span>
        </section>
      );
      return;
    }

    // FORMAT LASTNAME, FIRSTNAME, MIDDLE

    const editlastname = applicantDetails.lastname.toLowerCase();
    const lastnamearr = editlastname.split(" ");

    const formatLastname = lastnamearr.map((w) => {
      return (w = w.substring(0, 1).toUpperCase() + w.substring(1));
    });

    const editfirstname = applicantDetails.firstname.toLowerCase();
    const firstnamearr = editfirstname.split(" ");

    const formatFirstname = firstnamearr.map((w) => {
      return (w = w.substring(0, 1).toUpperCase() + w.substring(1));
    });

    const editmiddle = applicantDetails.middle.toLowerCase();
    const middlearr = editmiddle.split(" ");

    const formatMiddle = middlearr.map((w) => {
      return (w = w.substring(0, 1).toUpperCase() + w.substring(1));
    });

    // SUBMIT FORM
    await socket.emit("applicants", {
      ...applicantDetails,
      lastname: formatLastname.join(" "),
      firstname: formatFirstname.join(" "),
      middle: formatMiddle.join(""),
    });
    setResMessage(
      <section className="resSuccess">
        <i className="fas fa-check-circle"></i>
        <span>
          Application sent! We will send you an email after processing your form
        </span>
      </section>
    );
    setApplicantDetails((prev) => ({
      ...prev,
      lastname: "",
      firstname: "",
      middle: "",
      phone: "",
      birthday: "",
      address: "",
      email: "",
      position: "",
      civil_status: "",
      spouce_fullname: "",
      spouce_birthday: "",
      spouce_contact_number: "",
      religion: "",
      bloodtype: "",
      height: "",
      weight: "",
      guardian: "",
    }));
  };

  return (
    <div className="applicants_Form_Container">
      <section className="applicants_Form">
        {/* FORM TEXT */}
        <section className="applicants_Form_Text">
          <span>Applicants form</span>
        </section>
        {/* RESPONSE MESSAGE */}
        {resMessage && <section className="resMessage">{resMessage}</section>}
        {/* FORM */}
        <section className="applicants_Form_Inputs_Container">
          <form onSubmit={handleApplicantFormSubmit}>
            {/* ----------------------------------------- FIRST INPUT GROUP --------------------------------------- */}
            <section className="applicants_Form_Input_Group">
              {/* LASTNAME */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Lastname">
                  Lastname
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="app_Lastname"
                  value={applicantDetails.lastname}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* FIRSTNAME */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Firstname">
                  Firstname
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="app_Firstname"
                  value={applicantDetails.firstname}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* MIDDLE INITIAL */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Middle">
                  Middle initial
                </label>
                <input
                  type="text"
                  name="middle"
                  id="app_Middle"
                  value={applicantDetails.middle}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
            </section>

            {/* ----------------------------------------- SECOND INPUT GROUP --------------------------------------- */}
            <section className="applicants_Form_Input_Group">
              {/* PHONE */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Phone">
                  Phone number
                </label>
                <input
                  type="number"
                  name="phone"
                  id="app_Phone"
                  value={applicantDetails.phone}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* BIRTHDAY */}
              <section className="applicants_Form_Inputs">
                <label className="label_Bday" htmlFor="app_Birthday">
                  Birthday
                </label>
                <input
                  type="date"
                  name="birthday"
                  id="app_Birthday"
                  value={applicantDetails.birthday}
                  onChange={handleChange}
                />
              </section>
              {/* ------------- GENDER ------------- */}
              <section className="applicants_Form_Inputs_Gender">
                <span>Gender</span>
                <section className="gender_Form_Inputs_Group">
                  {/* MALE */}
                  <section className="gender_Container">
                    <label htmlFor="Male">Male</label>
                    <input
                      type="radio"
                      name="gender"
                      id="Male"
                      value="male"
                      onClick={(e) =>
                        setApplicantDetails((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                    />
                  </section>
                  {/* FEMALE */}
                  <section className="gender_Container">
                    <label htmlFor="Female">Female</label>
                    <input
                      type="radio"
                      name="gender"
                      id="Female"
                      value="female"
                      onClick={(e) =>
                        setApplicantDetails((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                    />
                  </section>
                </section>
              </section>
            </section>

            {/* ----------------------------------------- THIRD INPUT GROUP --------------------------------------- */}
            <section className="applicants_Form_Input_Group">
              {/* ADDRESS */}
              <section className="applicants_Form_Inputs address">
                <label className="label" htmlFor="app_Address">
                  Address
                </label>
                <input
                  type="tel"
                  name="address"
                  id="app_Address"
                  value={applicantDetails.address}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* EMAIL */}
              <section className="applicants_Form_Inputs email">
                <label className="label" htmlFor="app_Email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="app_Email"
                  value={applicantDetails.email}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* FILE */}
              <section className="applicants_Form_Inputs file">
                <label className="label_File" htmlFor="app_File">
                  Resume
                </label>
                <input
                  type="file"
                  name="file"
                  id="app_File"
                  onChange={handleUploadResume}
                />
              </section>
            </section>

            {/* ----------------------------------------- FOURTH INPUT GROUP --------------------------------------- */}
            <section className="applicants_Form_Input_Group">
              {/* POSITION */}
              <section className="applicants_Form_Inputs">
                <select onChange={handleChange} name="position">
                  <option value="">-- Select Position --</option>
                  {/* PRESIDENT'S OFFICE */}
                  {/* <option value="President (PRESIDENTS OFFICE)">
                    President (PRESIDENT'S OFFICE)
                  </option>
                  <option value="Secretary of President (PRESIDENTS OFFICE)">
                    Secretary of President (PRESIDENT'S OFFICE)
                  </option> */}
                  {/* ADMINISTRATION */}
                  <option value="Division Head (ADMINISTRATION)">
                    Division Head (ADMINISTRATION)
                  </option>
                  <option value="Administrative Officer (ADMINISTRATION)">
                    Administrative Officer (ADMINISTRATION)
                  </option>
                  <option value="Administrative In-Charge (ADMINISTRATION)">
                    Administrative In-Charge (ADMINISTRATION)
                  </option>
                  <option value="Assistant of the OIC (ADMINISTRATION)">
                    Assistant of the OIC (ADMINISTRATION)
                  </option>
                  <option value="OIC (ADMINISTRATION)">
                    OIC (ADMINISTRATION)
                  </option>
                  <option value="Vice President (ADMINISTRATION)">
                    Vice President (ADMINISTRATION)
                  </option>
                  <option value="EVP (ADMINISTRATION)">
                    EVP (ADMINISTRATION)
                  </option>
                  {/* AUDITING */}
                  <option value="Associate Book keeper (AUDITING)">
                    Associate Book keeper (AUDITING)
                  </option>
                  <option value="Book keeper (AUDITING)">
                    Book keeper (AUDITING)
                  </option>
                  <option value="Clerk 1 (AUDITING)">Clerk 1 (AUDITING)</option>
                  <option value="Clerk 2 (AUDITING)">Clerk 2 (AUDITING)</option>
                  <option value="Clerk 3 (AUDITING)">Clerk 3 (AUDITING)</option>
                  <option value="Clerk 4 (AUDITING)">Clerk 4 (AUDITING)</option>
                  <option value="Clerk 5 (AUDITING)">Clerk 5 (AUDITING)</option>
                  <option value="Department Head (AUDITING)">
                    Department Head (AUDITING)
                  </option>
                  {/* CASHIER */}
                  <option value="Associate Sales Coordinator (CASHIER)">
                    Associate Sales Coordinator (CASHIER)
                  </option>
                  <option value="Cashier (CASHIER)">Cashier (CASHIER)</option>
                  <option value="Clerk 1 (CASHIER)">Clerk 1 (CASHIER)</option>
                  <option value="Clerk 2 (CASHIER)">Clerk 2 (CASHIER)</option>
                  <option value="Clerk 3 (CASHIER)">Clerk 3 (CASHIER)</option>
                  <option value="Clerk 4 (CASHIER)">Clerk 4 (CASHIER)</option>
                  <option value="Clerk 5 (CASHIER)">Clerk 5 (CASHIER)</option>
                  <option value="Department Head (CASHIER)">
                    Department Head (CASHIER)
                  </option>
                  <option value="Purchaser (CASHIER)">
                    Purchaser (CASHIER)
                  </option>
                  <option value="Sales Coordinator (CASHIER)">
                    Sales Coordinator (CASHIER)
                  </option>
                  <option value="Sales Coordinator 1 (CASHIER)">
                    Sales Coordinator 1 (CASHIER)
                  </option>
                  <option value="Sales Coordinator 2 (CASHIER)">
                    Sales Coordinator 2 (CASHIER)
                  </option>
                  <option value="Sales Coordinator 3 (CASHIER)">
                    Sales Coordinator 3 (CASHIER)
                  </option>
                  {/* CLINIC */}
                  <option value="Physician (CLINIC)">Physician (CLINIC)</option>
                  <option value="First Aider (CLINIC)">
                    First Aider (CLINIC)
                  </option>
                  <option value="Company Nurse (CLINIC)">
                    Company Nurse (CLINIC)
                  </option>
                  <option value="Nurse 2 (CLINIC)">Nurse 2 (CLINIC)</option>
                  {/* COMMUNICATIONS */}
                  <option value="Liaison Staff (COMMUNICATIONS)">
                    Liaison Staff (COMMUNICATIONS)
                  </option>
                  <option value="Liaison Officer (COMMUNICATIONS)">
                    Liaison Officer (COMMUNICATIONS)
                  </option>
                  <option value="Department Head (COMMUNICATIONS)">
                    Department Head (COMMUNICATIONS)
                  </option>
                  {/* CONSTRUCTION */}
                  <option value="Division Head (CONSTRUCTION)">
                    Division Head (CONSTRUCTION)
                  </option>
                  <option value="Assistant Manager (CONSTRUCTION)">
                    Assistant Manager (CONSTRUCTION)
                  </option>
                  <option value="Associate Detailer (CONSTRUCTION)">
                    Associate Detailer (CONSTRUCTION)
                  </option>
                  <option value="Associate Field Engineer (CONSTRUCTION)">
                    Associate Field Engineer (CONSTRUCTION)
                  </option>
                  <option value="Field Engineer (CONSTRUCTION)">
                    Field Engineer (CONSTRUCTION)
                  </option>
                  <option value="Junior Foreman (CONSTRUCTION)">
                    Junior Foreman (CONSTRUCTION)
                  </option>
                  <option value="Foreman (CONSTRUCTION)">
                    Foreman (CONSTRUCTION)
                  </option>
                  <option value="Department Head (CONSTRUCTION)">
                    Department Head (CONSTRUCTION)
                  </option>
                  <option value="Project Engineer (CONSTRUCTION)">
                    Project Engineer (CONSTRUCTION)
                  </option>
                  <option value="Project Engineer 1 (CONSTRUCTION)">
                    Project Engineer 1 (CONSTRUCTION)
                  </option>
                  <option value="Project Engineer 2 (CONSTRUCTION)">
                    Project Engineer 2 (CONSTRUCTION)
                  </option>
                  <option value="Project Engineer 3 (CONSTRUCTION)">
                    Project Engineer 3 (CONSTRUCTION)
                  </option>
                  <option value="Project Manager (CONSTRUCTION)">
                    Project Manager (CONSTRUCTION)
                  </option>
                  <option value="Structural Detailer 1 (CONSTRUCTION)">
                    Structural Detailer 1 (CONSTRUCTION)
                  </option>
                  <option value="Structural Detailer 2 (CONSTRUCTION)">
                    Structural Detailer 2 (CONSTRUCTION)
                  </option>
                  <option value="Structural Detailer 3 (CONSTRUCTION)">
                    Structural Detailer 3 (CONSTRUCTION)
                  </option>
                  <option value="Supervisor 1 (CONSTRUCTION)">
                    Supervisor 1 (CONSTRUCTION)
                  </option>
                  <option value="Supervisor 2 (CONSTRUCTION)">
                    Supervisor 2 (CONSTRUCTION)
                  </option>
                  <option value="Supervisor 3 (CONSTRUCTION)">
                    Supervisor 3 (CONSTRUCTION)
                  </option>
                  {/* ENGINEERING */}
                  <option value="Division Head (ENGINEERING)">
                    Division Head (ENGINEERING)
                  </option>
                  <option value="Assistant Manager (ENGINEERING)">
                    Assistant Manager (ENGINEERING)
                  </option>
                  <option value="Architect (ENGINEERING)">
                    Architect (ENGINEERING)
                  </option>
                  <option value="Engineer (ENGINEERING)">
                    Engineer (ENGINEERING)
                  </option>
                  <option value="CADD Operator (ENGINEERING)">
                    CADD Operator (ENGINEERING)
                  </option>
                  <option value="Cadet Engineer (ENGINEERING)">
                    Cadet Engineer (ENGINEERING)
                  </option>
                  <option value="Detailer (ENGINEERING)">
                    Detailer (ENGINEERING)
                  </option>
                  <option value="Detailing Checker (ENGINEERING)">
                    Detailing Checker (ENGINEERING)
                  </option>
                  <option value="Detailing Head (ENGINEERING)">
                    Detailing Head (ENGINEERING)
                  </option>
                  <option value="Drafting Checker 1 (ENGINEERING)">
                    Drafting Checker 1 (ENGINEERING)
                  </option>
                  <option value="Drafting Checker 2 (ENGINEERING)">
                    Drafting Checker 2 (ENGINEERING)
                  </option>
                  <option value="Drafting Checker 3 (ENGINEERING)">
                    Drafting Checker 3 (ENGINEERING)
                  </option>
                  <option value="Drafting (ENGINEERING)">
                    Drafting (ENGINEERING)
                  </option>
                  <option value="Detailing Supervisor (ENGINEERING)">
                    Detailing Supervisor (ENGINEERING)
                  </option>
                  <option value="Estimating Head (ENGINEERING)">
                    Estimating Head (ENGINEERING)
                  </option>
                  <option value="Estimating Supervisor 1 (ENGINEERING)">
                    Estimating Supervisor 1 (ENGINEERING)
                  </option>
                  <option value="Estimating Supervisor 2 (ENGINEERING)">
                    Estimating Supervisor 2 (ENGINEERING)
                  </option>
                  <option value="Estimator 1 (ENGINEERING)">
                    Estimator 1 (ENGINEERING)
                  </option>
                  <option value="Estimator 2 (ENGINEERING)">
                    Estimator 2 (ENGINEERING)
                  </option>
                  <option value="Estimator 3 (ENGINEERING)">
                    Estimator 3 (ENGINEERING)
                  </option>
                  <option value="Department Head (ENGINEERING)">
                    Department Head (ENGINEERING)
                  </option>
                  {/* FABRICATION */}
                  <option value="Department Head (FABRICATION)">
                    Department Head (FABRICATION)
                  </option>
                  {/* GMSD */}
                  <option value="Department Head (GMSD)">
                    Department Head (GMSD)
                  </option>
                  {/* MOTORPOOL */}
                  <option value="Department Head (MOTORPOOL)">
                    Department Head (MOTORPOOL)
                  </option>
                  {/* HUMAN RESOURCE */}
                  <option value="Clerk 1 (HUMAN RESOURCE)">
                    Clerk 1 (HUMAN RESOURCE)
                  </option>
                  <option value="Clerk 2 (HUMAN RESOURCE)">
                    Clerk 2 (HUMAN RESOURCE)
                  </option>
                  <option value="Clerk 3 (HUMAN RESOURCE)">
                    Clerk 3 (HUMAN RESOURCE)
                  </option>
                  <option value="Clerk 4 (HUMAN RESOURCE)">
                    Clerk 4 (HUMAN RESOURCE)
                  </option>
                  <option value="Clerk 5 (HUMAN RESOURCE)">
                    Clerk 5 (HUMAN RESOURCE)
                  </option>
                  <option value="HR Officer (HUMAN RESOURCE)">
                    HR Officer (HUMAN RESOURCE)
                  </option>
                  <option value="Department Head (HUMAN RESOURCE)">
                    Department Head (HUMAN RESOURCE)
                  </option>
                  {/* MARKETING */}
                  <option value="Assistant Manager (MARKETING)">
                    Assistant Manager (MARKETING)
                  </option>
                  <option value="Department Head (MARKETING)">
                    Department Head (MARKETING)
                  </option>
                  {/* I.T */}
                  <option value="Computer Technician (I.T)">
                    Computer Technician (I.T)
                  </option>
                  <option value="Department Head (I.T)">
                    Department Head (I.T)
                  </option>
                  <option value="Programmer 1 (I.T)">Programmer 1 (I.T)</option>
                  <option value="Programmer 2 (I.T)">Programmer 2 (I.T)</option>
                  <option value="Programmer 3 (I.T)">Programmer 3 (I.T)</option>
                  {/* OPERATIONS */}
                  <option value="Associate Maintenance (OPERATIONS)">
                    Associate Maintenance (OPERATIONS)
                  </option>
                  <option value="Safety Inspector (OPERATIONS)">
                    Safety Inspector (OPERATIONS)
                  </option>
                  <option value="Chief Mechanic (OPERATIONS)">
                    Chief Mechanic (OPERATIONS)
                  </option>
                  <option value="Jr. Safety Inspector (OPERATIONS)">
                    Jr. Safety Inspector (OPERATIONS)
                  </option>
                  <option value="Department Head (OPERATIONS)">
                    Department Head (OPERATIONS)
                  </option>
                  <option value="Safety Inspector (OPERATIONS)">
                    Safety Inspector (OPERATIONS)
                  </option>
                  <option value="Safety Officer (OPERATIONS)">
                    Safety Officer (OPERATIONS)
                  </option>
                  <option value="Safety Supervisor (OPERATIONS)">
                    Safety Supervisor (OPERATIONS)
                  </option>
                  <option value="Technical Assistant (OPERATIONS)">
                    Technical Assistant (OPERATIONS)
                  </option>
                  <option value="Technical Head (OPERATIONS)">
                    Technical Head (OPERATIONS)
                  </option>
                  {/* PPC */}
                  <option value="Associate PPC (PPC)">
                    Associate PPC (PPC)
                  </option>
                  <option value="PPC Engineer (PPC)">PPC Engineer (PPC)</option>
                  <option value="PPC Engineer 1 (PPC)">
                    PPC Engineer 1 (PPC)
                  </option>
                  <option value="PPC Engineer 2 (PPC)">
                    PPC Engineer 2 (PPC)
                  </option>
                  <option value="PPC Engineer 3 (PPC)">
                    PPC Engineer 3 (PPC)
                  </option>
                  <option value="PPC Engineer 4 (PPC)">
                    PPC Engineer 4 (PPC)
                  </option>
                  <option value="PPC Supervisor (PPC)">
                    PPC Supervisor (PPC)
                  </option>
                  {/* PURCHASING */}
                  <option value="Associate Purchaser (PURCHASING)">
                    Associate Purchaser (PURCHASING)
                  </option>
                  <option value="Purchaser (PURCHASING)">
                    Purchaser (PURCHASING)
                  </option>
                  {/* QA/QC */}
                  <option value="Associate QC (QA/QC)">
                    Associate QC (QA/QC)
                  </option>
                  <option value="Inspector Associate (QA/QC)">
                    Inspector Associate (QA/QC)
                  </option>
                  <option value="Jr. QC Engineer (QA/QC)">
                    Jr. QC Engineer (QA/QC)
                  </option>
                  <option value="Jr. QC Inspector (QA/QC)">
                    Jr. QC Inspector (QA/QC)
                  </option>
                  <option value="Department Head (QA/QC)">
                    Department Head (QA/QC)
                  </option>
                  <option value="QA Engineer (QA/QC)">
                    QA Engineer (QA/QC)
                  </option>
                  <option value="QA/QC Supervisor (QA/QC)">
                    QA/QC Supervisor (QA/QC)
                  </option>
                  <option value="QC Inspector (QA/QC)">
                    QC Inspector (QA/QC)
                  </option>
                  <option value="QC Supervisor (QA/QC)">
                    QC Supervisor (QA/QC)
                  </option>
                  {/* WAREHOUSE */}
                  <option value="Associate Shop Engineer (WAREHOUSE)">
                    Associate Shop Engineer (WAREHOUSE)
                  </option>
                  <option value="Materials Supervisor (WAREHOUSE)">
                    Materials Supervisor (WAREHOUSE)
                  </option>
                  <option value="Production Supervisor (WAREHOUSE)">
                    Production Supervisor (WAREHOUSE)
                  </option>
                  <option value="Sales Engineer (WAREHOUSE)">
                    Sales Engineer (WAREHOUSE)
                  </option>
                  <option value="Sales Engineer 1 (WAREHOUSE)">
                    Sales Engineer 1 (WAREHOUSE)
                  </option>
                  <option value="Sales Trainee Section Head (WAREHOUSE)">
                    Sales Trainee Section Head (WAREHOUSE)
                  </option>
                  <option value="Shop Engineer (WAREHOUSE)">
                    Shop Engineer (WAREHOUSE)
                  </option>
                  <option value="Warehouse Officer (WAREHOUSE)">
                    Warehouse Officer (WAREHOUSE)
                  </option>
                  {/* FINISHING */}
                  <option value="Engineer Maintenance Supervisor (FINISHING)">
                    Engineer Maintenance Supervisor (FINISHING)
                  </option>
                  <option value="Production Supervisor (FINISHING)">
                    Production Supervisor (FINISHING)
                  </option>
                  <option value="Sr. QC Engineer (FINISHING)">
                    Sr. QC Engineer (FINISHING)
                  </option>
                  <option value="Sr. QC Inspector (FINISHING)">
                    Sr. QC Inspector (FINISHING)
                  </option>
                  <option value="Sr. Safety Inspector (FINISHING)">
                    Sr. Safety Inspector (FINISHING)
                  </option>
                  {/* SECURITY */}
                  <option value="Security Officer (SECURITY)">
                    Security Officer (SECURITY)
                  </option>
                  {/* SUITES */}
                  <option value="Staff (SUITES)">Staff (SUITES)</option>
                </select>
              </section>

              {/* CIVIL STATUS */}
              <section className="applicants_Form_Inputs_Gender civilStatus">
                <span>Civil status</span>
                <section className="gender_Form_Inputs_Group">
                  {/* SINGLE */}
                  <section
                    className="gender_Container"
                    onClick={() => setShowMarriedAdditional(false)}
                  >
                    <label htmlFor="Single">Single</label>
                    <input
                      type="radio"
                      name="civil_status"
                      id="Single"
                      value="single"
                      onClick={(e) =>
                        setApplicantDetails((prev) => ({
                          ...prev,
                          civil_status: e.target.value,
                        }))
                      }
                    />
                  </section>
                  {/* MARRIED */}
                  <section
                    className="gender_Container"
                    onClick={() => setShowMarriedAdditional(true)}
                  >
                    <label htmlFor="Married">Married</label>
                    <input
                      type="radio"
                      name="civil_status"
                      id="Married"
                      value="married"
                      onClick={(e) =>
                        setApplicantDetails((prev) => ({
                          ...prev,
                          civil_status: e.target.value,
                        }))
                      }
                    />
                  </section>
                  {/* WIDOWED */}
                  <section
                    className="gender_Container"
                    onClick={() => setShowMarriedAdditional(false)}
                  >
                    <label htmlFor="Widowed">Widowed</label>
                    <input
                      type="radio"
                      name="civil_status"
                      id="Widowed"
                      value="widowed"
                      onClick={(e) =>
                        setApplicantDetails((prev) => ({
                          ...prev,
                          civil_status: e.target.value,
                        }))
                      }
                    />
                  </section>
                </section>
              </section>

              {/* MARRIED ADDITIONAL */}
              <section className="applicants_Form_Inputs married_Form_Inputs">
                {showMarriedAdditional && (
                  <MarriedAdditional
                    setApplicantDetails={setApplicantDetails}
                  />
                )}
              </section>
            </section>

            {/* ----------------------------------------- FIFTH INPUT GROUP --------------------------------------- */}
            <section className="applicants_Form_Input_Group">
              {/* RELIGION */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Religion">
                  Religion
                </label>
                <input
                  type="text"
                  name="religion"
                  id="app_Religion"
                  value={applicantDetails.religion}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* BLOODTYPE */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Bloodtype">
                  Bloodtype <span>(optional)</span>
                </label>
                <input
                  type="text"
                  name="bloodtype"
                  id="app_Bloodtype"
                  value={applicantDetails.bloodtype}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* HEIGHT */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Height">
                  Height <span>(optional)</span>
                </label>
                <input
                  type="text"
                  name="height"
                  id="app_Height"
                  value={applicantDetails.height}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
            </section>

            {/* ----------------------------------------- SIXTH INPUT GROUP --------------------------------------- */}
            <section className="applicants_Form_Input_Group last_Group">
              {/* WEIGHT */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Weight">
                  Weight <span>(optional)</span>
                </label>
                <input
                  type="text"
                  name="weight"
                  id="app_Weight"
                  value={applicantDetails.weight}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* GUARDIAN */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Guardian">
                  Guardian
                </label>
                <input
                  type="text"
                  name="guardian"
                  id="app_Guardian"
                  value={applicantDetails.guardian}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
            </section>

            {/* FORM BUTTON */}
            <section className="applicants_Form_Button">
              <Link to="/">Back</Link>
              <button type="submit">Submit</button>
            </section>
          </form>
        </section>
      </section>
    </div>
  );
};

export default ApplicantsForm;
