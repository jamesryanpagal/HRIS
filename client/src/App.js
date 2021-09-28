import React from "react";
import { useSelector } from "react-redux";

//css
import "./App.css";

//Components
import LandingPageRouter from "./Components/Grandspan/Router/LandingPage_Router";
import AdminRouter from "./Components/Admin/AdminRouter/Admin_Router";

function App() {
  const { admin_token } = useSelector((state) => state.GS_Admin);

  return (
    <div className="App">
      {admin_token ? <AdminRouter /> : <LandingPageRouter />}
    </div>
  );
}

export default App;
