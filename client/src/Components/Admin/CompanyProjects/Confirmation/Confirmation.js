import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";

// redux actions
import { clearCompanyProjects } from "../../../../Redux/Redux_actions/actions";

// css
import "./Confirmation.css";

const Confirmation = ({
  projectDetails,
  setProjectConfirmation,
  setProjectCreated,
}) => {
  // ---------------- STATE ------------------
  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  // selector
  const { admin, adminEmpNum } = useSelector((state) => state.GS_Admin);

  // SAVE PROJECT
  const handleSaveProject = async () => {
    let uploadedImage = "";
    const date = new Date();
    try {
      setLoading(true);
      if (projectDetails.projectImage.name) {
        const formData = new FormData();
        formData.append("file", projectDetails.projectImage);
        formData.append("upload_preset", "company_projects");
        const uploadProjectImage = await axiosConfig.post(
          "https://api.cloudinary.com/v1_1/dfwa3kop9/image/upload",
          formData
        );

        uploadedImage = uploadProjectImage.data.url;
      }

      await axiosConfig.post("CompanyProjects", {
        ...projectDetails,
        projectImage: uploadedImage && uploadedImage,
      });

      // for audit trail
      const audittrails = {
        actions: "Project created",
        subject: projectDetails.projectTitle,
        admin,
        adminId: adminEmpNum,
        date: `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getDate()}, ${date.getFullYear()}`,
        time: date.toLocaleTimeString(),
      };

      await axiosConfig.post("Audittrail", { audittrails });

      setProjectCreated(true);
      setLoading(false);
      dispatch(clearCompanyProjects());
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="confirmation_Container">
      <section className="confirmation">
        {/* CONFIRMATION TEXT */}
        <p>Are you sure you want to create this project?</p>
        {/* CONFIRMATION ACTION CONTAINER */}
        <section
          className={
            loading
              ? "confirmationActions_Container_Disable"
              : "confirmationActions_Container"
          }
        >
          <button type="button" className="save" onClick={handleSaveProject}>
            {loading ? <Spinner /> : "Create"}
          </button>
          <button
            type="button"
            className="back"
            onClick={() => setProjectConfirmation(false)}
          >
            Back
          </button>
        </section>
      </section>
    </div>
  );
};

export default Confirmation;
