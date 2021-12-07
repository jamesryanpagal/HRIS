import React from "react";
import { useDispatch } from "react-redux";

// redux actions
import { clearCompanyProjects } from "../../../../Redux/Redux_actions/actions";

// css
import "./CloseProjectConfirmation.css";

const CloseProjectConfirmation = ({
  setNewProject,
  setCloseProjectConfirmation,
}) => {
  // dispatch
  const dispatch = useDispatch();

  // handleSave
  const handleSave = () => {
    setNewProject(false);
    setCloseProjectConfirmation(false);
  };

  // handleDontSave
  const handleDontSave = () => {
    setNewProject(false);
    setCloseProjectConfirmation(false);
    dispatch(clearCompanyProjects());
    window.location.reload();
  };

  return (
    <div className="closeProjectConfirmation_Container">
      {/* CLOSE PROJECT CONFIRMATION */}
      <section className="closeProjectConfirmation">
        {/* PROJECT CONFIRMATION TEXT */}
        <p>Do you want to save Company Project detials?</p>
        {/* PROJECT CONFIRMATION ACTIONS */}
        <section className="closeProjectConfirmation_Actions">
          <button type="button" className="yes" onClick={handleSave}>
            Yes
          </button>
          <button type="button" className="no" onClick={handleDontSave}>
            No
          </button>
        </section>
      </section>
    </div>
  );
};

export default CloseProjectConfirmation;
