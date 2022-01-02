import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axiosConfig from "../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Spinner from "../../../Spinner/Spinner";

// css
import "./UploadCurrEmployee.css";

const UploadCurrEmployee = () => {
  // ------ STATE -----------

  // excel file state
  const [excelFile, setExcelFile] = useState(null);

  // excel data container state
  const [excelData, setExcelData] = useState([]);

  // error message state
  const [errorMessage, setErrorMessage] = useState("");

  // response message state
  const [resMessage, setResMessage] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // get excel data
  useEffect(() => {
    if (excelFile) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      setExcelData(data);
    }
  }, [excelFile]);

  // handle file
  const handleFile = (e) => {
    const fileType = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    const selectedFile = e.target.files[0];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      setErrorMessage("");
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        setExcelFile(e.target.result);
      };
      return;
    }

    setErrorMessage("File type must only be excel!");
  };

  // save
  const handleSave = async () => {
    try {
      setLoading(true);
      const { data } = await axiosConfig.post("UploadEmployees", {
        uploads: excelData,
      });
      if (data.isError) {
        setResMessage(data);
        setLoading(false);
        return;
      }
      setResMessage(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="uploadEmployee_Container">
      {/* HEADER */}
      <section className="uploadEmployee_Header">
        <h3>Upload employees</h3>
        {excelData.length > 0 && (
          <button type="button" onClick={handleSave}>
            {loading ? <Spinner /> : "Add"}
          </button>
        )}
      </section>
      {/* BODY */}
      <section className="employeeTable">
        {/* ERROR FILE MESSAGE */}
        {errorMessage && (
          <section className="errorMessage">
            <i className="fas fa-exclamation-triangle"></i>
            {errorMessage}
          </section>
        )}
        {/* RESPONSE MESSAGE */}
        {resMessage.isError ? (
          <section className="errResMessage">
            <section>
              <i className="fas fa-exclamation-triangle"></i>
              <section>
                Employee/s
                {resMessage.id.map((e, i) => {
                  return <span key={i}> [{e}] </span>;
                })}
                already exist!
              </section>
            </section>
            <button type="button" onClick={() => setResMessage("")}>
              Close
            </button>
          </section>
        ) : resMessage ? (
          <section className="successResMessage">
            <section>
              <i className="fas fa-check-circle"></i>
              <section>{resMessage}</section>
            </section>
            <button type="button" onClick={() => setResMessage("")}>
              Close
            </button>
          </section>
        ) : null}
        {/* RENDER EXCEL */}
        <section className="excel_Table">
          {excelData.length === 0 ? (
            <label htmlFor="uploadExcel">
              <i className="fas fa-file-import"></i>
              Browse
              <input type="file" id="uploadExcel" onChange={handleFile} />
            </label>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>
                    <h5>Id</h5>
                  </th>
                  <th>
                    <h5>Lastname</h5>
                  </th>
                  <th>
                    <h5>Firstname</h5>
                  </th>
                  <th>
                    <h5>Middle</h5>
                  </th>
                  <th>
                    <h5>Phone</h5>
                  </th>
                  <th>
                    <h5>Contract</h5>
                  </th>
                  <th>
                    <h5>Birthday</h5>
                  </th>
                  <th>
                    <h5>Gender</h5>
                  </th>
                  <th>
                    <h5>Address</h5>
                  </th>
                  <th>
                    <h5>Email</h5>
                  </th>
                  <th>
                    <h5>Position</h5>
                  </th>
                  <th>
                    <h5>Civil status</h5>
                  </th>
                  <th>
                    <h5>Spouse fullname</h5>
                  </th>
                  <th>
                    <h5>Spouse birthday</h5>
                  </th>
                  <th>
                    <h5>Spouse contact number</h5>
                  </th>
                  <th>
                    <h5>Religion</h5>
                  </th>
                  <th>
                    <h5>Bloodtype</h5>
                  </th>
                  <th>
                    <h5>Height</h5>
                  </th>
                  <th>
                    <h5>Weight</h5>
                  </th>
                  <th>
                    <h5>Guardian</h5>
                  </th>
                  <th>
                    <h5>Date hired</h5>
                  </th>
                  <th>
                    <h5>SSS no.</h5>
                  </th>
                  <th>
                    <h5>Tin</h5>
                  </th>
                  <th>
                    <h5>Pagibig</h5>
                  </th>
                  <th>
                    <h5>Philhealth</h5>
                  </th>
                  <th>
                    <h5>Biometric id no.</h5>
                  </th>
                  <th>
                    <h5>Infotrack id no.</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((e) => {
                  return (
                    <tr key={e.Employee_id}>
                      <td>{e.Employee_id}</td>
                      <td>{e.Lastname}</td>
                      <td>{e.Firstname}</td>
                      <td>{e.Middle}</td>
                      <td>{e.Phone}</td>
                      <td>{e.Contract}</td>
                      <td>{e.Birthday}</td>
                      <td>{e.Gender}</td>
                      <td>{e.Address}</td>
                      <td>{e.Email}</td>
                      <td>{e.Position}</td>
                      <td>{e.Civil_status}</td>
                      <td>{e.Spouse_fullname}</td>
                      <td>{e.Spouse_birthday}</td>
                      <td>{e.Spouse_contact_number}</td>
                      <td>{e.Religion}</td>
                      <td>{e.Bloodtype}</td>
                      <td>{e.Height}</td>
                      <td>{e.Weight}</td>
                      <td>{e.Guardian}</td>
                      <td>{e.Date_hired}</td>
                      <td>{e.SSS_no}</td>
                      <td>{e.Tin}</td>
                      <td>{e.Pagibig}</td>
                      <td>{e.Philhealth}</td>
                      <td>{e.Biometric_id_no}</td>
                      <td>{e.Infotrack_id_no}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </section>
    </div>
  );
};

export default UploadCurrEmployee;
