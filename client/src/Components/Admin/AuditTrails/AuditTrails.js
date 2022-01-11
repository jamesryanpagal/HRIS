import React from "react";

// css
import "./AuditTrails.css";

const AuditTrails = () => {
  return (
    <div className="audittrails_Container">
      <table>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Admin</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default AuditTrails;
