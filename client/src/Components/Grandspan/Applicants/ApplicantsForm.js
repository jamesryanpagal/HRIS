import React, { useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

//css
import "./ApplicantsForm.css";

// SOCKET CONNECTION
const socket = io.connect("http://localhost:8080/");

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
    education: "",
    hobbies: "",
    language: "",
    skills: "",
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
      bloodtype,
      height,
      weight,
      guardian,
      education,
      hobbies,
      language,
      skills,
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
      !bloodtype ||
      !height ||
      !weight ||
      !guardian ||
      !education ||
      !hobbies ||
      !language ||
      !skills
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

    // SUBMIT FORM
    await socket.emit("applicants", applicantDetails);
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
      education: "",
      hobbies: "",
      language: "",
      skills: "",
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
                  <option value="">Position</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Human_Resource">Human Resource</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Security">Security</option>
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
                  Bloodtype
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
                  Height
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
            <section className="applicants_Form_Input_Group">
              {/* WEIGHT */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Weight">
                  Weight
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
              {/* EDUCATIONAL BACKGROUND */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Education">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  id="app_Education"
                  value={applicantDetails.education}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
            </section>

            {/* ----------------------------------------- SEVENTH INPUT GROUP --------------------------------------- */}
            <section className="applicants_Form_Input_Group">
              {/* HOBBIES */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Hobbies">
                  Hobbies
                </label>
                <input
                  type="text"
                  name="hobbies"
                  id="app_Hobbies"
                  value={applicantDetails.hobbies}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* LANGUAGE */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Language">
                  Language
                </label>
                <input
                  type="text"
                  name="language"
                  id="app_Language"
                  value={applicantDetails.language}
                  onChange={handleChange}
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* SKILLS */}
              <section className="applicants_Form_Inputs">
                <label className="label" htmlFor="app_Skills">
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  id="app_Skills"
                  value={applicantDetails.skills}
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
