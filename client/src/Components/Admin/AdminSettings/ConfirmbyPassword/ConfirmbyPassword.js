import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../../Spinner/Spinner";
import io from "socket.io-client";

// css
import "../UpdateAcc.css";

// SOCKET CONNECTION
const socket = io.connect("https://grandspan.herokuapp.com/");

const ConfirmbyPassword = ({
  requestDetails,
  setTemp,
  disable_enableAdminDetails,
  syncDetails,
  newAdminDetails,
  setCreateSuccess,
  closeModal,
}) => {
  // -------- STATE --------------

  // password state
  const [password, setPassword] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // error message
  const [errorMessage, setErrorMessage] = useState("");

  // selector
  const { adminId, admin, adminEmpNum } = useSelector(
    (state) => state.GS_Admin
  );

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosConfig.post("ConfirmByPass", {
        id: adminId,
        password,
      });

      // check if theres error
      if (data.isError) {
        setErrorMessage(data.errorMessage);
        setLoading(false);
        return;
      }

      // for disbling or enabling admin acc
      if (disable_enableAdminDetails) {
        // for disabling admin
        if (disable_enableAdminDetails.type === "disable") {
          await axiosConfig.post("/DisableEnableAdmin/disable", {
            adminId: disable_enableAdminDetails.id,
          });
          socket.emit("disableAdmin", disable_enableAdminDetails.id);
          setLoading(false);
          window.location.reload();
          return;
        }

        // for enabling admin
        if (disable_enableAdminDetails.type === "enable") {
          await axiosConfig.post("/DisableEnableAdmin/enable", {
            adminId: disable_enableAdminDetails.id,
          });
          setLoading(false);
          window.location.reload();
          return;
        }
      }

      // for syncing admin
      if (syncDetails) {
        await axiosConfig.post("SyncAdmin", {
          syncDetails,
        });
        setLoading(false);
        window.location.reload();
        return;
      }

      // for assigning temp admin
      if (setTemp) {
        // for assigning
        if (setTemp.type === "assign") {
          await axiosConfig.post("AssignUnAssign/assign", {
            id: setTemp.id,
          });
          setLoading(false);
          window.location.reload();
          return;
        }

        // for unassigning
        if (setTemp.type === "unassign") {
          await axiosConfig.post("AssignUnAssign/unassign", {
            id: setTemp.id,
          });
          setLoading(false);
          window.location.reload();
          return;
        }
      }

      // for requesting
      if (requestDetails) {
        // for authorizing
        if (requestDetails.type === "authorized") {
          await axiosConfig.post("RequestUpdate/authorized", {
            id: requestDetails.id,
          });

          // for audit trail
          const date = new Date();
          const audittrails = {
            actions: "Request approve",
            subject: "Employee details / Company project",
            admin,
            adminId: adminEmpNum,
            date: `${date.toLocaleString("default", {
              month: "short",
            })} ${date.getDate()}, ${date.getFullYear()}`,
            time: date.toLocaleTimeString(),
          };
          await axiosConfig.post("Audittrail", { audittrails });
          setLoading(false);
          window.location.reload();
          return;
        }

        // for not authorizing
        if (requestDetails.type === "notauthorized") {
          await axiosConfig.post("RequestUpdate/notauthorized", {
            id: requestDetails.id,
          });

          // for audit trail
          const date = new Date();
          const audittrails = {
            actions: "Request rejected",
            subject: "Employee details / Company project",
            admin,
            adminId: adminEmpNum,
            date: `${date.toLocaleString("default", {
              month: "short",
            })} ${date.getDate()}, ${date.getFullYear()}`,
            time: date.toLocaleTimeString(),
          };
          await axiosConfig.post("Audittrail", { audittrails });
          setLoading(false);
          window.location.reload();
          return;
        }
      }

      await axiosConfig.post("NewUsers", {
        newAdminDetails,
      });

      // for audit trail
      const date = new Date();
      const audittrails = {
        actions: "Admin created",
        subject: newAdminDetails.username,
        admin,
        adminId: adminEmpNum,
        date: `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getDate()}, ${date.getFullYear()}`,
        time: date.toLocaleTimeString(),
      };
      await axiosConfig.post("Audittrail", { audittrails });

      setLoading(false);
      setCreateSuccess(true);
      closeModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="accDetails_Container">
      {/* CONFIRM BY PASSWORD */}
      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <p>Please enter your password to continue</p>
        {/* ERROR MESSAGE */}
        {errorMessage && (
          <section className="errorMessage">
            <i className="fas fa-exclamation-triangle"></i>
            {errorMessage}
          </section>
        )}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* ACTIONS */}
        <section
          className={loading ? "actionsContainer_disable" : "actionsContainer"}
        >
          <button type="submit" className="save">
            {loading ? <Spinner /> : "Confirm"}
          </button>
          <button
            type="button"
            className="back"
            onClick={() => closeModal(false)}
          >
            Back
          </button>
        </section>
      </form>
    </div>
  );
};

export default ConfirmbyPassword;
