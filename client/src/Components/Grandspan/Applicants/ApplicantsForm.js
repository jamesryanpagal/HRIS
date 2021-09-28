import React from "react";
import { Link } from "react-router-dom";

//css
import "./ApplicantsForm.css";

const ApplicantsForm = () => {
  const handleAppFormOnFocus = (e) => {
    const target = e.target.parentElement;
    target.children[0].className = "appForm_OnFocus";
  };

  const handleAppFormOnBlur = (e) => {
    const target = e.target.parentElement;
    if (target.children[1].value) {
      target.children[0].className = "appForm_OnFocus";
      return;
    }

    target.children[0].className = "label";
  };

  return (
    <div className="applicants_Form_Container">
      <section className="applicants_Form">
        {/* FORM TEXT */}
        <section className="applicants_Form_Text">
          <span>Applicants form</span>
        </section>
        {/* FORM */}
        <section className="applicants_Form_Inputs_Container">
          <form>
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
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* BIRTHDAY */}
              <section className="applicants_Form_Inputs">
                <label className="label_Bday" htmlFor="app_Birthday">
                  Birthday
                </label>
                <input type="date" name="birthday" id="app_Birthday" />
              </section>
              {/* ------------- GENDER ------------- */}
              <section className="applicants_Form_Inputs_Gender">
                <span>Gender</span>
                <section className="gender_Form_Inputs_Group">
                  {/* MALE */}
                  <section className="gender_Container">
                    <label htmlFor="Male">Male</label>
                    <input type="radio" name="gender" id="Male" value="male" />
                  </section>
                  {/* FEMALE */}
                  <section className="gender_Container">
                    <label htmlFor="Female">Female</label>
                    <input
                      type="radio"
                      name="gender"
                      id="Female"
                      value="female"
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
                  onFocus={handleAppFormOnFocus}
                  onBlur={handleAppFormOnBlur}
                />
              </section>
              {/* FILE */}
              <section className="applicants_Form_Inputs file">
                <label className="label_File" htmlFor="app_File">
                  File
                </label>
                <input type="file" name="file" id="app_File" />
              </section>
            </section>

            {/* FORM BUTTON */}
            <section className="applicants_Form_Button">
              <Link to="/">Cancel</Link>
              <button type="submit">Submit</button>
            </section>
          </form>
        </section>
      </section>
    </div>
  );
};

export default ApplicantsForm;
