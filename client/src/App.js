import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//css
import "./App.css";

//Components
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import ApplicantsForm from "./Components/Applicants/ApplicantsForm";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/applicantsform" component={ApplicantsForm} />
          <Route path="/admindashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
