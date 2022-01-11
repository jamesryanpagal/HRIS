import React, { useState, useEffect } from "react";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";

// images
import actionsIcon from "../../../PublicImages/actions.png";
import subjectIcon from "../../../PublicImages/subject.png";
import adminIcon from "../../../PublicImages/adminaudit.png";
import dateIcon from "../../../PublicImages/date.png";
import timeIcon from "../../../PublicImages/time.png";

// css
import "./AuditTrails.css";

const AuditTrails = () => {
  // -------- STATE ---------
  const [audittrail, setAudittrail] = useState([]);

  // get audit trail
  useEffect(() => {
    const getAuditTrails = async () => {
      const { data } = await axiosConfig.get("Audittrail/getAudittrail");
      setAudittrail([...data]);
    };

    getAuditTrails();
  }, []);

  return (
    <div className="audittrails_Container">
      <table>
        <thead>
          <tr>
            <th>
              <p>
                <img src={actionsIcon} alt="" />
                <span>Actions</span>
              </p>
            </th>
            <th>
              <p>
                <img src={subjectIcon} alt="" />
                <span>Subject</span>
              </p>
            </th>
            <th>
              <p>
                <img src={adminIcon} alt="" />
                <span>Admin</span>
              </p>
            </th>
            <th>
              <p>
                <img src={dateIcon} alt="" />
                <span>Date</span>
              </p>
            </th>
            <th>
              <p>
                <img src={timeIcon} alt="" />
                <span>Time</span>
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {audittrail.map((a) => {
            return (
              <tr key={a._id}>
                <td>
                  <p>{a.actions}</p>
                </td>
                <td>
                  <p>{a.subject}</p>
                </td>
                <td>
                  <p>
                    {a.admin} <strong>{a.adminId}</strong>
                  </p>
                </td>
                <td>
                  <p>{a.date}</p>
                </td>
                <td>
                  <p>{a.time}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTrails;
