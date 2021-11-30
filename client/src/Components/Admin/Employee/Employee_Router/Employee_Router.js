import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Employee from "../Employee";
import Blacklist from "../Blacklist/Blacklist";
import Terminated from "../Terminated/Terminated";
import Resigned from "../Resigned/Resigned";

// css
import "./Employee_Router.css";

const Employee_Router = () => {
  return (
    <div className="employee_Router_Container">
      <Router>
        <Route exact path="/Employee" component={Employee} />
        <Route path="/Employee/Blacklist" component={Blacklist} />
        <Route path="/Employee/Terminated" component={Terminated} />
        <Route path="/Employee/Resigned" component={Resigned} />
      </Router>
    </div>
  );
};

export default Employee_Router;
