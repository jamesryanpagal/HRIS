import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//component
import Grandspan from "../LandingPage/Grandspan";
import ApplicantsForm from "../Applicants/ApplicantsForm";
import AdminLogin from "../Login/Login";
import AdminSignup from "../Signup/Signup";
import PageNotFound from "../../PageNotFound/PageNotFound";

const LandingPage_Router = () => {
  return (
    <div className="landingpage_Router">
      <Router>
        <Switch>
          <Route exact path="/" component={Grandspan} />
          <Route path="/applicantsform" component={ApplicantsForm} />
          <Route path="/login" component={AdminLogin} />
          <Route path="/signup" component={AdminSignup} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default LandingPage_Router;
