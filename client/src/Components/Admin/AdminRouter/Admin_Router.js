import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//components
import Navbar from "../Navbar/Navbar";
import Applicants from "../Applicants/Applicants";
import Employee from "../Employee/Employee";
import Department from "../Department/Department";
import NewAdmin from "../NewAdmin/NewAdmin";
import PageNotFound from "../../PageNotFound/PageNotFound";

//css
import "./Admin_Router.css";

const Admin_Router = () => {
  return (
    <div className="admin_Router">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Applicants} />
          <Route path="/Employee" component={Employee} />
          <Route path="/NewAdmin" component={NewAdmin} />
          <Route path="/Department" component={Department} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default Admin_Router;
