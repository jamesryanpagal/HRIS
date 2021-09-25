import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../ReusableFunctions/AxiosConfig/AxiosConfig";

// -------------------------------- REDUX ACTIONS -----------------------------
import { userTokenActions } from "../../Redux/Redux_actions/actions";

// ------------------------------ SPINNER -----------------------------
import Spinner from "../../Spinner/Spinner";

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
  const [errorMessage, setErrorMessage] = useState(null);

  // loading state
  const [loading, setLoading] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  // ------------------------------- REDUX STORE ---------------------------------------
  const { admin_token } = useSelector((state) => state.GS_Admin);

  // ---------------------------- RIDIRECT USER IF ALREADY SIGNEDIN -------------------------
  useEffect(() => {
    if (admin_token) {
      history.push("/admindashboard");
    }
  }, [admin_token, history]);

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
      const { data } = await axiosConfig.post("/GSUserSignin", {
        ...userSignInDetails,
      });

      // check error
      if (data.error) {
        setErrorMessage(data.errorMessage);
        setLoading(false);
        return;
      }

      // redirect to admin
      dispatch(userTokenActions(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup_Container">
      {/* ------------------------------------- SIGNUP SIDE IMAGE ----------------------------------------- */}
      <section className="signup_Side_Image_Container">
        <section className="signup_Side_Image_Background"></section>
        <section className="signup_Side_Image_Text">
          <p className="first">Grandspan Development Corporation</p>
          <p>The Leader in Quality Infrastracture</p>
        </section>
      </section>
      {/* ------------------------------------- SIGNUP FORM CONTAINER ----------------------------------------- */}
      <section className="signup_Form_Container">
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
              Already have an account? <Link to="/">Login</Link>
            </span>
          </section>
        </form>
      </section>
    </div>
  );
};

export default Signup;
