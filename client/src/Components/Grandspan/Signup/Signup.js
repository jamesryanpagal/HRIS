import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";

// ------------------------------ SPINNER -----------------------------
import Spinner from "../../../Spinner/Spinner";

// -------------------------------------- CSS ---------------------------------
import "./Signup.css";

const Signup = ({ history }) => {
  // --------------------------------- STATE -------------------------------------

  // user state
  const [userSignInDetails, setUserSignInDetails] = useState({
    Employee_number: "",
    Email: "",
    Username: "",
    Password: "",
    ConfirmPassword: "",
  });

  // error message
  const [errorMessage, setErrorMessage] = useState("");

  // success message
  const [successMessage, setSuccessMessage] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // ----------------------------- HANDLE INPUT CHANGE ---------------------------------
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserSignInDetails((prev) => ({ ...prev, [name]: value }));
  };

  // INPUT ON FOCUS
  const handleInputOnFocus = (e) => {
    const target = e.target.parentElement;
    target.children[0].className = "signup_Form_Input_Group_OnFocus";
    setErrorMessage("");
  };

  // INPUT ON BLUR
  const handleInputOnBlur = (e) => {
    const target = e.target.parentElement;
    if (target.children[1].value) {
      target.children[0].className = "signup_Form_Input_Group_OnFocus";
      return;
    }

    target.children[0].className = "label";
  };

  // -------------------------------------- SUBMIT -----------------------------------------
  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axiosConfig.post("/NewUsers", {
        ...userSignInDetails,
      });

      // check error
      if (data.error) {
        setErrorMessage(data.errorMessage);
        setLoading(false);
        return;
      }

      if (data.includes("dup key: { Employee_number:")) {
        setErrorMessage("Employee number already been taken");
        setLoading(false);
        return;
      }

      if (data.includes("dup key: { Email:")) {
        setErrorMessage("Email already been taken");
        setLoading(false);
        return;
      }

      if (data.includes("dup key: { Username:")) {
        setErrorMessage("Username already been taken");
        setLoading(false);
        return;
      }

      setUserSignInDetails((prev) => ({
        ...prev,
        Employee_number: "",
        Email: "",
        Username: "",
        Password: "",
        ConfirmPassword: "",
      }));
      setSuccessMessage(data);
      setErrorMessage("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup_Container">
      {/* CLOSE SIGNIN */}
      <section className="close_Signin" onClick={() => history.push("/")}>
        <i className="fas fa-times"></i>
      </section>
      {/* ------------------------------------- SIGNUP FORM CONTAINER ----------------------------------------- */}
      <section className="signup_Form_Container">
        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <section className="successMessage">
            <i className="fas fa-check-circle"></i>
            <span> {successMessage}</span>
          </section>
        )}
        {/* FORM */}
        <form className="signup_Form" onSubmit={handleSignInSubmit}>
          <section className="signup_Form_Text">Create account</section>
          {errorMessage && (
            <section className="signInErrorMessage">
              <i className="fas fa-exclamation-triangle"></i>
              <span> {errorMessage}</span>
            </section>
          )}
          {/* EMPLOYEE NUMBER */}
          <section className="signup_Form_Input_Group">
            <label className="label" htmlFor="emp_number">
              Employee number
            </label>
            <input
              type="text"
              name="Employee_number"
              id="emp_number"
              value={userSignInDetails.Employee_number}
              onChange={handleInputChange}
              onFocus={handleInputOnFocus}
              onBlur={handleInputOnBlur}
            />
          </section>
          {/* EMAIL */}
          <section className="signup_Form_Input_Group">
            <label className="label" htmlFor="emp_email">
              Email
            </label>
            <input
              type="email"
              name="Email"
              id="emp_email"
              value={userSignInDetails.Email}
              onChange={handleInputChange}
              onFocus={handleInputOnFocus}
              onBlur={handleInputOnBlur}
            />
          </section>
          {/* USERNAME */}
          <section className="signup_Form_Input_Group">
            <label className="label" htmlFor="emp_username">
              Username
            </label>
            <input
              type="username"
              name="Username"
              id="emp_username"
              value={userSignInDetails.Username}
              onChange={handleInputChange}
              onFocus={handleInputOnFocus}
              onBlur={handleInputOnBlur}
            />
          </section>
          {/* PASSWORD */}
          <section className="signup_Form_Input_Group">
            <label className="label" htmlFor="emp_password">
              Password
            </label>
            <input
              type="password"
              name="Password"
              id="emp_password"
              value={userSignInDetails.Password}
              onChange={handleInputChange}
              onFocus={handleInputOnFocus}
              onBlur={handleInputOnBlur}
            />
          </section>
          {/* CONFIRM PASSWORD */}
          <section className="signup_Form_Input_Group">
            <label className="label" htmlFor="emp_confirmpass">
              Confirm password
            </label>
            <input
              type="password"
              name="ConfirmPassword"
              id="emp_confirmpass"
              value={userSignInDetails.ConfirmPassword}
              onChange={handleInputChange}
              onFocus={handleInputOnFocus}
              onBlur={handleInputOnBlur}
            />
          </section>
          {/* SIGNUP BTN */}
          <section
            className={loading ? "disabled_OnSignin" : "signup_Form_Btn"}
          >
            <button type="submit">{loading ? <Spinner /> : "Register"}</button>
          </section>
          {/* LOGIN LINK */}
          <section className="login_Form_Btn">
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </section>
        </form>
      </section>
    </div>
  );
};

export default Signup;
