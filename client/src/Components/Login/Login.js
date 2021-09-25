import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../ReusableFunctions/AxiosConfig/AxiosConfig";

// ---------------------- REDUX ACTIONS --------------------------
import { userTokenActions } from "../../Redux/Redux_actions/actions";

// spinner
import Spinner from "../../Spinner/Spinner";

//css
import "./Login.css";

const Login = ({ history }) => {
  // ------------------------------- STATE ----------------------------

  // login details state
  const [loginDetails, setLoginDetails] = useState({
    Employee_number: "",
    Password: "",
  });

  //  error state
  const [errorMessage, setErrorMessage] = useState(null);

  //  loading
  const [loading, setLoading] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  // --------------------------- REDUX STORE -------------------------------
  const { admin_token } = useSelector((state) => state.GS_Admin);

  // check if already logged in
  useEffect(() => {
    if (admin_token) {
      history.push("/admindashboard");
    }
  }, [admin_token, history]);

  // INPUT ON FOCUS
  const handleInputOnFocus = (e) => {
    const target = e.target.parentElement;
    target.children[0].className = "login_Form_Input_Group_OnFocus";
  };

  // INPUT ON BLUR
  const handleInputOnBlur = (e) => {
    const target = e.target.parentElement;
    if (target.children[1].value) {
      target.children[0].className = "login_Form_Input_Group_OnFocus";
      return;
    }

    target.children[0].className = "label";
  };

  // ------------------------ HANDLE INPUT CHANGE -------------------
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  // ----------------------------- LOGIN SUBMIT ------------------------
  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axiosConfig.post("/GSUserLogin", loginDetails);

      // check error
      if (data.error) {
        setErrorMessage(data.errorMessage);
        setLoading(false);
        return;
      }

      // redirect to dashboard
      dispatch(userTokenActions(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login_Container">
      {/* --------------------------------------------- LOGIN FORM ------------------------------------------------ */}
      <section className="login_Form_Container">
        <section className="login_Form_Compname">
          <p className="first">Grandspan Development Corporation</p>
          <p>The Leader in Quality Infrastracture</p>
        </section>
        {/* FORM */}
        <form className="login_Form" onSubmit={handleSignInSubmit}>
          <section className="login_Form_Text">Login</section>
          {/* ERROR MESSAGE */}
          {errorMessage && (
            <section className="error_Message_Container">
              <i className="fas fa-exclamation-triangle"></i>
              <span> {errorMessage}</span>
            </section>
          )}
          {/* EMPLOYEE NUMBER */}
          <section className="login_Form_Input_Group">
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
          {/* PASSWORD */}
          <section className="login_Form_Input_Group">
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
          {/* LOGIN BTN */}
          <section
            className={loading ? "disable_OnLoggedIn" : "login_Form_Btn"}
          >
            <button type="submit">{loading ? <Spinner /> : "Login"}</button>
          </section>
          {/* SIGNUP LINK */}
          <section className="signup_Form_Btn">
            <span>
              Don't have an account? <Link to="/signup">Signup</Link>
            </span>
          </section>
        </form>
      </section>

      {/* --------------------------------------------- LOGIN SIDE IMAGE ------------------------------------------------ */}
      <section className="login_Side_Image_Container">
        <section className="login_Side_Image_Background"></section>
        <section className="login_Side_Image_Text_Container">
          <section className="login_Side_Image_Text">
            <span>Join our team today!</span>
          </section>
          <section className="login_Side_Image_Link_Container">
            <Link to="/applicantsform">Apply now</Link>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Login;
