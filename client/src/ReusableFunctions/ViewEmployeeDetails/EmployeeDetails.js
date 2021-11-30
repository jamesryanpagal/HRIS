import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosConfig from "../AxiosConfig/AxiosConfig";
import io from "socket.io-client";

// redux actions
import { updatingActions } from "../../Redux/Redux_actions/actions";

// Spinner
import Spinner from "../../Spinner/Spinner";

// Components
import ProfileImage from "../ProfileImage/ProfileImage";
import Moveto from "./Moveto/Moveto";

//css
import "./EmployeeDetails.css";

// SOCKET CONNECTION
const socket = io.connect("https://grandspan.herokuapp.com/");

const EmployeeDetails = ({ toggleViewDetails, setToggleViewDetails, id }) => {
  // --------------------------------- STATE -----------------------------
  // Employee Details State
  const [employeeDetails, setEmployeeDetails] = useState({
    _id: "",
    employee_id: "",
    employee_image: "",
    lastname: "",
    firstname: "",
    middle: "",
    phone: "",
    contract: "",
    birthday: "",
    gender: "",
    address: "",
    email: "",
    position: "",
    civil_status: "",
    spouce_fullname: "",
    spouce_birthday: "",
    spouce_contact_number: "",
    religion: "",
    bloodtype: "",
    height: "",
    weight: "",
    guardian: "",
    education: "",
    hobbies: "",
    language: "",
    skills: "",
    date_hired: "",
  });

  // update image preview state
  const [updateImagePreview, setUpdateImagePreview] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // unsave total
  const [unsaveTotal, setUnSaveTotal] = useState(0);

  // move to state
  const [moveto, setMoveto] = useState(false);

  // move to destination
  const [destination, setDestination] = useState("");

  // move to details
  const [movetoDetails, setMovetoDetails] = useState({
    id: "",
    name: "",
  });

  // SELECTOR
  const { employees } = useSelector((state) => state.Employee);

  // dispatch
  const dispatch = useDispatch();

  // get employee from redux
  useEffect(() => {
    const getEmployee = async () => {
      const employee = await employees.find((e) => e.employee_id === id);
      if (employee) {
        setEmployeeDetails((prev) => ({
          ...prev,
          _id: employee._id,
          employee_id: employee.employee_id,
          employee_image: employee.employee_image,
          lastname: employee.lastname,
          firstname: employee.firstname,
          middle: employee.middle,
          phone: employee.phone,
          contract: employee.contract,
          birthday: employee.birthday,
          gender: employee.gender,
          address: employee.address,
          email: employee.email,
          position: employee.position,
          civil_status: employee.civil_status,
          spouce_fullname: employee.spouce_fullname,
          spouce_birthday: employee.spouce_birthday,
          spouce_contact_number: employee.spouce_contact_number,
          religion: employee.religion,
          bloodtype: employee.bloodtype,
          height: employee.height,
          weight: employee.weight,
          guardian: employee.guardian,
          education: employee.education,
          hobbies: employee.hobbies,
          language: employee.language,
          skills: employee.skills,
          date_hired: employee.date_hired,
        }));
      }
    };

    getEmployee();
  }, [id, employees]);

  // return unsaveTotal value to 0 if it is negative
  useEffect(() => {
    if (unsaveTotal < 0) {
      setUnSaveTotal(0);
    }
  }, [unsaveTotal]);

  // handleEditDetails
  const handleEditDetails = (e) => {
    const inputParent = e.target.parentElement;

    if (inputParent.children[1].disabled) {
      inputParent.children[1].disabled = false;
      inputParent.children[1].className = "edit_input";
      inputParent.children[2].children[0].className = "fas fa-times";
      setUnSaveTotal((prev) => prev + 1);
      return;
    }

    inputParent.children[1].disabled = true;
    inputParent.children[1].className = "input";
    inputParent.children[2].children[0].className = "fas fa-pen";
    setUnSaveTotal((prev) => prev - 1);
  };

  // handle change employee details
  const handleChangeEmployeeDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEmployeeDetails((prev) => ({ ...prev, [name]: value }));
  };

  // handle save changes
  const handleSaveChanges = async () => {
    let updateImage = "";
    try {
      setLoading(true);
      // upload to cloudinary
      if (employeeDetails.employee_image.name) {
        const formData = new FormData();
        formData.append("file", employeeDetails.employee_image);
        formData.append("upload_preset", "grandspan_profileImage");
        const uploadEmployeeImage = await axiosConfig.post(
          "https://api.cloudinary.com/v1_1/dfwa3kop9/image/upload",
          formData
        );

        updateImage = uploadEmployeeImage.data.url;
      }
      // Save changes
      await socket.emit("editEmployeeDetails", {
        id: employeeDetails._id,
        data: {
          ...employeeDetails,
          employee_image: updateImage
            ? updateImage
            : employeeDetails.employee_image,
        },
      });
      setLoading(false);
      setUnSaveTotal(0);
      dispatch(updatingActions());
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle close employee details
  const handleCloseEmployeeDetails = () => {
    setToggleViewDetails(false);
    setUpdateImagePreview("");
    setEmployeeDetails((prev) => ({
      ...prev,
      employee_image: prev.employee_image.name ? "N/A" : prev.employee_image,
    }));
    setUnSaveTotal(0);
  };

  // handle update profile image
  const handleUpadteProfileImage = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      setUnSaveTotal((prev) => prev + 1);
    } else {
      setUnSaveTotal((prev) => prev - 1);
      setUpdateImagePreview("");
      setEmployeeDetails((prev) => ({
        ...prev,
        employee_image: "N/A",
      }));
    }

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUpdateImagePreview(reader.result);
        setEmployeeDetails((prev) => ({
          ...prev,
          employee_image: selectedFile,
        }));
      }
    };
  };

  // handle move to
  const handleMoveTo = (e) => {
    setMovetoDetails((prev) => ({
      ...prev,
      id: employeeDetails.employee_id,
      name: `${employeeDetails.lastname}, ${employeeDetails.firstname} ${employeeDetails.middle}`,
    }));
    setDestination(e.target.innerText);
    setMoveto(true);
  };

  // employee Department
  const getEmployeeDepartment = employeeDetails.position;
  const removeCloseParenthesis = getEmployeeDepartment.replace(")", "");
  const employeeDepartmentArr = removeCloseParenthesis.split("");
  const employeeDepartmentIndex = employeeDepartmentArr.findIndex(
    (e) => e === "("
  );
  const employeeDepartment = removeCloseParenthesis.substring(
    employeeDepartmentIndex + 1
  );

  // employee Position
  const employeePosition = getEmployeeDepartment.substring(
    0,
    employeeDepartmentIndex
  );
  return (
    <div
      className={
        toggleViewDetails ? "employee_Details_Container" : "close_View_Details"
      }
    >
      {moveto && (
        <Moveto
          setMoveto={setMoveto}
          destination={destination}
          movetoDetails={movetoDetails}
        />
      )}
      <section className="employee_Details">
        {/* CLOSE */}
        <section className="close">
          <i className="fas fa-times" onClick={handleCloseEmployeeDetails}></i>
          {unsaveTotal > 0 && (
            <section>
              <button
                className={loading ? "disable_Save_Changes" : "save_Changes"}
                type="button"
                onClick={handleSaveChanges}
              >
                {loading ? <Spinner /> : "Save"}
              </button>
            </section>
          )}
        </section>
        {/* PROFILE */}
        <section className="profile">
          {/* IMAGE */}
          <section className="image">
            <ProfileImage
              image={employeeDetails.employee_image}
              lastname={employeeDetails.lastname}
              firstname={employeeDetails.firstname}
              updateImagePreview={updateImagePreview}
            />
            <section className="update_Image_Container">
              <label htmlFor="update_Image">
                <i className="fas fa-pen"></i>
              </label>
              <input
                type="file"
                id="update_Image"
                onChange={handleUpadteProfileImage}
              />
            </section>
          </section>
          {/* PROFILE DETAILS */}
          <section className="profile_Details">
            {/* PROFILE DETAILS HEADER */}
            <section className="header">
              <h2>{`${employeeDetails.lastname}, ${employeeDetails.firstname} ${employeeDetails.middle}.`}</h2>
              <span>{employeePosition}</span>
            </section>
            <hr />
            {/* PROFILE DETAILS */}
            <section className="details">
              {/* FIRST SECTION */}
              <section className="first_Section">
                {/* ID */}
                <section className="child">
                  <span>Employee id: </span>
                  {employeeDetails.employee_id}
                </section>
                {/* DEPARTMENT */}
                <section className="child">
                  <span>Department: </span>
                  {employeeDepartment}
                </section>
                {/* DATE HIRED */}
                <section className="child">
                  <span>Date hired: </span>
                  {employeeDetails.date_hired}
                </section>
              </section>
              {/* SECOND SECTION */}
              <section className="second_Section">
                {/* EMAIL */}
                <section className="child">
                  <span>Emial: </span>
                  {employeeDetails.email}
                </section>
                {/* CONTACT NUMBER */}
                <section className="child">
                  <span>Contact: </span>
                  {employeeDetails.phone}
                </section>
                {/* CONTRACT EXPIRED */}
                <section className="child">
                  <span>Contract: </span>
                  {employeeDetails.contract}
                </section>
              </section>
            </section>
          </section>
        </section>
        {/* DETAILS */}
        <section className="other_Details">
          <form>
            {/* PERSONAL DETAILS */}
            <section className="personal_Details">
              <h5>Personal Background</h5>
              <section className="group_Container">
                {/* ---------------- FIRST SECTION ------------------ */}
                <section className="first_Section">
                  {/* NAME INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Name</h6>
                    <input
                      className="input"
                      type="text"
                      name="name"
                      disabled={true}
                      value={`${employeeDetails.lastname}, ${employeeDetails.firstname} ${employeeDetails.middle}.`}
                    />
                  </section>
                  {/* GENDER INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Gender</h6>
                    <input
                      className="input"
                      type="text"
                      name="gender"
                      disabled={true}
                      value={employeeDetails.gender}
                    />
                  </section>
                  {/* BIRTHDATE INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Birthdate</h6>
                    <input
                      className="input"
                      type="text"
                      name="birthday"
                      disabled={true}
                      value={employeeDetails.birthday}
                    />
                  </section>
                  {/* EMAIL INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Email</h6>
                    <input
                      className="input"
                      type="email"
                      name="email"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.email}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* POSITION GROUP */}
                  <section className="input_Group">
                    <h6>Position</h6>
                    {/* SELECT POSITION */}
                    <select
                      disabled={true}
                      onChange={handleChangeEmployeeDetails}
                      name="position"
                    >
                      <option value={employeeDetails.position}>
                        {employeeDetails.position}
                      </option>
                      {/* PRESIDENT'S OFFICE */}
                      <option value="President (PRESIDENTS OFFICE)">
                        President (PRESIDENT'S OFFICE)
                      </option>
                      <option value="Secretary of President (PRESIDENTS OFFICE)">
                        Secretary of President (PRESIDENT'S OFFICE)
                      </option>
                      {/* ADMINISTRATION */}
                      <option value="Division Head (ADMINISTRATION)">
                        Division Head (ADMINISTRATION)
                      </option>
                      <option value="Administrative Officer (ADMINISTRATION)">
                        Administrative Officer (ADMINISTRATION)
                      </option>
                      <option value="Administrative In-Charge (ADMINISTRATION)">
                        Administrative In-Charge (ADMINISTRATION)
                      </option>
                      <option value="Assistant of the OIC (ADMINISTRATION)">
                        Assistant of the OIC (ADMINISTRATION)
                      </option>
                      <option value="OIC (ADMINISTRATION)">
                        OIC (ADMINISTRATION)
                      </option>
                      <option value="Vice President (ADMINISTRATION)">
                        Vice President (ADMINISTRATION)
                      </option>
                      <option value="EVP (ADMINISTRATION)">
                        EVP (ADMINISTRATION)
                      </option>
                      {/* AUDITING */}
                      <option value="Associate Bookkeeper (AUDITING)">
                        Associate Bookkeeper (AUDITING)
                      </option>
                      <option value="Bookkeeper (AUDITING)">
                        Bookkeeper (AUDITING)
                      </option>
                      <option value="Clerk 1 (AUDITING)">
                        Clerk 1 (AUDITING)
                      </option>
                      <option value="Clerk 2 (AUDITING)">
                        Clerk 2 (AUDITING)
                      </option>
                      <option value="Clerk 3 (AUDITING)">
                        Clerk 3 (AUDITING)
                      </option>
                      <option value="Clerk 4 (AUDITING)">
                        Clerk 4 (AUDITING)
                      </option>
                      <option value="Clerk 5 (AUDITING)">
                        Clerk 5 (AUDITING)
                      </option>
                      <option value="Department Head (AUDITING)">
                        Department Head (AUDITING)
                      </option>
                      {/* CASHIER */}
                      <option value="Associate Sales Coordinator (CASHIER)">
                        Associate Sales Coordinator (CASHIER)
                      </option>
                      <option value="Cashier (CASHIER)">
                        Cashier (CASHIER)
                      </option>
                      <option value="Clerk 1 (CASHIER)">
                        Clerk 1 (CASHIER)
                      </option>
                      <option value="Clerk 2 (CASHIER)">
                        Clerk 2 (CASHIER)
                      </option>
                      <option value="Clerk 3 (CASHIER)">
                        Clerk 3 (CASHIER)
                      </option>
                      <option value="Clerk 4 (CASHIER)">
                        Clerk 4 (CASHIER)
                      </option>
                      <option value="Clerk 5 (CASHIER)">
                        Clerk 5 (CASHIER)
                      </option>
                      <option value="Department Head (CASHIER)">
                        Department Head (CASHIER)
                      </option>
                      <option value="Purchaser (CASHIER)">
                        Purchaser (CASHIER)
                      </option>
                      <option value="Sales Coordinator (CASHIER)">
                        Sales Coordinator (CASHIER)
                      </option>
                      <option value="Sales Coordinator 1 (CASHIER)">
                        Sales Coordinator 1 (CASHIER)
                      </option>
                      <option value="Sales Coordinator 2 (CASHIER)">
                        Sales Coordinator 2 (CASHIER)
                      </option>
                      <option value="Sales Coordinator 3 (CASHIER)">
                        Sales Coordinator 3 (CASHIER)
                      </option>
                      {/* CLINIC */}
                      <option value="Physician (CLINIC)">
                        Physician (CLINIC)
                      </option>
                      <option value="First Aider (CLINIC)">
                        First Aider (CLINIC)
                      </option>
                      <option value="Company Nurse (CLINIC)">
                        Company Nurse (CLINIC)
                      </option>
                      <option value="Nurse 2 (CLINIC)">Nurse 2 (CLINIC)</option>
                      {/* COMMUNICATIONS */}
                      <option value="Liaison Staff (COMMUNICATIONS)">
                        Liaison Staff (COMMUNICATIONS)
                      </option>
                      <option value="Liaison Officer (COMMUNICATIONS)">
                        Liaison Officer (COMMUNICATIONS)
                      </option>
                      <option value="Department Head (COMMUNICATIONS)">
                        Department Head (COMMUNICATIONS)
                      </option>
                      {/* CONSTRUCTION */}
                      <option value="Division Head (CONSTRUCTION)">
                        Division Head (CONSTRUCTION)
                      </option>
                      <option value="Assistant Manager (CONSTRUCTION)">
                        Assistant Manager (CONSTRUCTION)
                      </option>
                      <option value="Associate Detailer (CONSTRUCTION)">
                        Associate Detailer (CONSTRUCTION)
                      </option>
                      <option value="Associate Field Engineer (CONSTRUCTION)">
                        Associate Field Engineer (CONSTRUCTION)
                      </option>
                      <option value="Field Engineer (CONSTRUCTION)">
                        Field Engineer (CONSTRUCTION)
                      </option>
                      <option value="Junior Foreman (CONSTRUCTION)">
                        Junior Foreman (CONSTRUCTION)
                      </option>
                      <option value="Foreman (CONSTRUCTION)">
                        Foreman (CONSTRUCTION)
                      </option>
                      <option value="Department Head (CONSTRUCTION)">
                        Department Head (CONSTRUCTION)
                      </option>
                      <option value="Project Engineer (CONSTRUCTION)">
                        Project Engineer (CONSTRUCTION)
                      </option>
                      <option value="Project Engineer 1 (CONSTRUCTION)">
                        Project Engineer 1 (CONSTRUCTION)
                      </option>
                      <option value=">Project Engineer 2 (CONSTRUCTION)">
                        Project Engineer 2 (CONSTRUCTION)
                      </option>
                      <option value="Project Engineer 3 (CONSTRUCTION)">
                        Project Engineer 3 (CONSTRUCTION)
                      </option>
                      <option value="Project Manager (CONSTRUCTION)">
                        Project Manager (CONSTRUCTION)
                      </option>
                      <option value="Structural Detailer 1 (CONSTRUCTION)">
                        Structural Detailer 1 (CONSTRUCTION)
                      </option>
                      <option value="Structural Detailer 2 (CONSTRUCTION)">
                        Structural Detailer 2 (CONSTRUCTION)
                      </option>
                      <option value="Structural Detailer 3 (CONSTRUCTION)">
                        Structural Detailer 3 (CONSTRUCTION)
                      </option>
                      <option value="Supervisor 1 (CONSTRUCTION)">
                        Supervisor 1 (CONSTRUCTION)
                      </option>
                      <option value="Supervisor 2 (CONSTRUCTION)">
                        Supervisor 2 (CONSTRUCTION)
                      </option>
                      <option value="Supervisor 3 (CONSTRUCTION)">
                        Supervisor 3 (CONSTRUCTION)
                      </option>
                      {/* ENGINEERING */}
                      <option value="Division Head (ENGINEERING)">
                        Division Head (ENGINEERING)
                      </option>
                      <option value="Assistant Manager (ENGINEERING)">
                        Assistant Manager (ENGINEERING)
                      </option>
                      <option value="Architect (ENGINEERING)">
                        Architect (ENGINEERING)
                      </option>
                      <option value="Engineer (ENGINEERING)">
                        Engineer (ENGINEERING)
                      </option>
                      <option value="CADD Operator (ENGINEERING)">
                        CADD Operator (ENGINEERING)
                      </option>
                      <option value="Cadet Engineer (ENGINEERING)">
                        Cadet Engineer (ENGINEERING)
                      </option>
                      <option value="Detailer (ENGINEERING)">
                        Detailer (ENGINEERING)
                      </option>
                      <option value="Detailing Checker (ENGINEERING)">
                        Detailing Checker (ENGINEERING)
                      </option>
                      <option value="Detailing Head (ENGINEERING)">
                        Detailing Head (ENGINEERING)
                      </option>
                      <option value="Drafting Checker 1 (ENGINEERING)">
                        Drafting Checker 1 (ENGINEERING)
                      </option>
                      <option value="Drafting Checker 2 (ENGINEERING)">
                        Drafting Checker 2 (ENGINEERING)
                      </option>
                      <option value="Drafting Checker 3 (ENGINEERING)">
                        Drafting Checker 3 (ENGINEERING)
                      </option>
                      <option value="Drafting (ENGINEERING)">
                        Drafting (ENGINEERING)
                      </option>
                      <option value="Detailing Supervisor (ENGINEERING)">
                        Detailing Supervisor (ENGINEERING)
                      </option>
                      <option value="Estimating Head (ENGINEERING)">
                        Estimating Head (ENGINEERING)
                      </option>
                      <option value="Estimating Supervisor 1 (ENGINEERING)">
                        Estimating Supervisor 1 (ENGINEERING)
                      </option>
                      <option value="Estimating Supervisor 2 (ENGINEERING)">
                        Estimating Supervisor 2 (ENGINEERING)
                      </option>
                      <option value="Estimator 1 (ENGINEERING)">
                        Estimator 1 (ENGINEERING)
                      </option>
                      <option value="Estimator 2 (ENGINEERING)">
                        Estimator 2 (ENGINEERING)
                      </option>
                      <option value="Estimator 3 (ENGINEERING)">
                        Estimator 3 (ENGINEERING)
                      </option>
                      <option value="Department Head (ENGINEERING)">
                        Department Head (ENGINEERING)
                      </option>
                      {/* FABRICATION */}
                      <option value="Department Head (FABRICATION)">
                        Department Head (FABRICATION)
                      </option>
                      {/* GMSD */}
                      <option value="Department Head (GMSD)">
                        Department Head (GMSD)
                      </option>
                      {/* MOTORPOOL */}
                      <option value="Department Head (MOTORPOOL)">
                        Department Head (MOTORPOOL)
                      </option>
                      {/* HUMAN RESOURCE */}
                      <option value="Clerk 1 (HUMAN RESOURCE)">
                        Clerk 1 (HUMAN RESOURCE)
                      </option>
                      <option value="Clerk 2 (HUMAN RESOURCE)">
                        Clerk 2 (HUMAN RESOURCE)
                      </option>
                      <option value="Clerk 3 (HUMAN RESOURCE)">
                        Clerk 3 (HUMAN RESOURCE)
                      </option>
                      <option value="Clerk 4 (HUMAN RESOURCE)">
                        Clerk 4 (HUMAN RESOURCE)
                      </option>
                      <option value="Clerk 5 (HUMAN RESOURCE)">
                        Clerk 5 (HUMAN RESOURCE)
                      </option>
                      <option value="HR Officer (HUMAN RESOURCE)">
                        HR Officer (HUMAN RESOURCE)
                      </option>
                      <option value="Department Head (HUMAN RESOURCE)">
                        Department Head (HUMAN RESOURCE)
                      </option>
                      {/* MARKETING */}
                      <option value="Assistant Manager (MARKETING)">
                        Assistant Manager (MARKETING)
                      </option>
                      <option value="Department Head (MARKETING)">
                        Department Head (MARKETING)
                      </option>
                      {/* I.T */}
                      <option value="Computer Technician (I.T)">
                        Computer Technician (I.T)
                      </option>
                      <option value="Department Head (I.T)">
                        Department Head (I.T)
                      </option>
                      <option value="Programmer 1 (I.T)">
                        Programmer 1 (I.T)
                      </option>
                      <option value="Programmer 2 (I.T)">
                        Programmer 2 (I.T)
                      </option>
                      <option value="Programmer 3 (I.T)">
                        Programmer 3 (I.T)
                      </option>
                      {/* OPERATIONS */}
                      <option value="Associate Maintenance (OPERATIONS)">
                        Associate Maintenance (OPERATIONS)
                      </option>
                      <option value="Safety Inspector (OPERATIONS)">
                        Safety Inspector (OPERATIONS)
                      </option>
                      <option value="Chief Mechanic (OPERATIONS)">
                        Chief Mechanic (OPERATIONS)
                      </option>
                      <option value="Jr. Safety Inspector (OPERATIONS)">
                        Jr. Safety Inspector (OPERATIONS)
                      </option>
                      <option value="Department Head (OPERATIONS)">
                        Department Head (OPERATIONS)
                      </option>
                      <option value="Safety Inspector (OPERATIONS)">
                        Safety Inspector (OPERATIONS)
                      </option>
                      <option value="Safety Officer (OPERATIONS)">
                        Safety Officer (OPERATIONS)
                      </option>
                      <option value="Safety Supervisor (OPERATIONS)">
                        Safety Supervisor (OPERATIONS)
                      </option>
                      <option value="Technical Assistant (OPERATIONS)">
                        Technical Assistant (OPERATIONS)
                      </option>
                      <option value="Technical Head (OPERATIONS)">
                        Technical Head (OPERATIONS)
                      </option>
                      {/* PPC */}
                      <option value="Associate PPC (PPC)">
                        Associate PPC (PPC)
                      </option>
                      <option value="PPC Engineer (PPC)">
                        PPC Engineer (PPC)
                      </option>
                      <option value="PPC Engineer 1 (PPC)">
                        PPC Engineer 1 (PPC)
                      </option>
                      <option value="PPC Engineer 2 (PPC)">
                        PPC Engineer 2 (PPC)
                      </option>
                      <option value="PPC Engineer 3 (PPC)">
                        PPC Engineer 3 (PPC)
                      </option>
                      <option value="PPC Engineer 4 (PPC)">
                        PPC Engineer 4 (PPC)
                      </option>
                      <option value="PPC Supervisor (PPC)">
                        PPC Supervisor (PPC)
                      </option>
                      {/* PURCHASING */}
                      <option value="Associate Purchaser (PURCHASING)">
                        Associate Purchaser (PURCHASING)
                      </option>
                      <option value="Purchaser (PURCHASING)">
                        Purchaser (PURCHASING)
                      </option>
                      {/* QA/QC */}
                      <option value="Associate QC (QA/QC)">
                        Associate QC (QA/QC)
                      </option>
                      <option value="Inspector Associate (QA/QC)">
                        Inspector Associate (QA/QC)
                      </option>
                      <option value="Jr. QC Engineer (QA/QC)">
                        Jr. QC Engineer (QA/QC)
                      </option>
                      <option value="Jr. QC Inspector (QA/QC)">
                        Jr. QC Inspector (QA/QC)
                      </option>
                      <option value="Department Head (QA/QC)">
                        Department Head (QA/QC)
                      </option>
                      <option value="QA Engineer (QA/QC)">
                        QA Engineer (QA/QC)
                      </option>
                      <option value="QA/QC Supervisor (QA/QC)">
                        QA/QC Supervisor (QA/QC)
                      </option>
                      <option value="QC Inspector (QA/QC)">
                        QC Inspector (QA/QC)
                      </option>
                      <option value="QC Supervisor (QA/QC)">
                        QC Supervisor (QA/QC)
                      </option>
                      {/* WAREHOUSE */}
                      <option value="Associate Shop Engineer (WAREHOUSE)">
                        Associate Shop Engineer (WAREHOUSE)
                      </option>
                      <option value="Materials Supervisor (WAREHOUSE)">
                        Materials Supervisor (WAREHOUSE)
                      </option>
                      <option value="Production Supervisor (WAREHOUSE)">
                        Production Supervisor (WAREHOUSE)
                      </option>
                      <option value="Sales Engineer (WAREHOUSE)">
                        Sales Engineer (WAREHOUSE)
                      </option>
                      <option value="Sales Engineer 1 (WAREHOUSE)">
                        Sales Engineer 1 (WAREHOUSE)
                      </option>
                      <option value="Sales Trainee Section Head (WAREHOUSE)">
                        Sales Trainee Section Head (WAREHOUSE)
                      </option>
                      <option value="Shop Engineer (WAREHOUSE)">
                        Shop Engineer (WAREHOUSE)
                      </option>
                      <option value="Warehouse Officer (WAREHOUSE)">
                        Warehouse Officer (WAREHOUSE)
                      </option>
                      {/* FINISHING */}
                      <option value="Administrative">
                        Engineer Maintenance Supervisor (FINISHING)
                      </option>
                      <option value="Production Supervisor (FINISHING)">
                        Production Supervisor (FINISHING)
                      </option>
                      <option value="Sr. QC Engineer (FINISHING)">
                        Sr. QC Engineer (FINISHING)
                      </option>
                      <option value="Sr. QC Inspector (FINISHING)">
                        Sr. QC Inspector (FINISHING)
                      </option>
                      <option value="Sr. Safety Inspector (FINISHING)">
                        Sr. Safety Inspector (FINISHING)
                      </option>
                      {/* SECURITY */}
                      <option value="Security Officer (SECURITY)">
                        Security Officer (SECURITY)
                      </option>
                      {/* SUITES */}
                      <option value="Staff (SUITES)">Staff (SUITES)</option>
                    </select>
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* PHONE INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Phone</h6>
                    <input
                      className="input"
                      type="number"
                      name="phone"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.phone}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* CONTRACT INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Contract</h6>
                    <input
                      className="input"
                      type="date"
                      name="contract"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                    <section className="contract_Container">
                      {employeeDetails.contract}
                    </section>
                  </section>
                </section>
                {/* ---------------- SECOND SECTION ------------------ */}
                <section className="second_Section">
                  {/* HEIGHT INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Height</h6>
                    <input
                      className="input"
                      type="text"
                      name="height"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.height}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* WEIGHT INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Weight</h6>
                    <input
                      className="input"
                      type="text"
                      name="weight"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.weight}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* BLOODTYPE INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Bloodtype</h6>
                    <input
                      className="input"
                      type="text"
                      name="bloodtype"
                      disabled={true}
                      value={employeeDetails.bloodtype}
                    />
                  </section>
                  {/* CIVIL STATUS INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Civil status</h6>
                    <input
                      className="input"
                      type="text"
                      name="civil_status"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.civil_status}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* SPOUCE NAME INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Spouce name</h6>
                    <input
                      className="input"
                      type="text"
                      name="spouce_fullname"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.spouce_fullname}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* SPOUCE BIRTHDAY INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Spouce birthdate</h6>
                    <input
                      className="input"
                      type="text"
                      name="spouce_birthday"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.spouce_birthday}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* SPOUCE CONTACT NUMBER INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Spouce contact number</h6>
                    <input
                      className="input"
                      type="text"
                      name="spouce_contact_number"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.spouce_contact_number}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                </section>
                {/* ---------------- THIRD SECTION ------------------ */}
                <section className="third_Section">
                  {/* ADDRESS INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Address</h6>
                    <input
                      className="input"
                      type="text"
                      name="address"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.address}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* LANGUAGE INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Language</h6>
                    <input
                      className="input"
                      type="text"
                      name="language"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.language}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* HOBBIES INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Hobbies</h6>
                    <textarea
                      className="input"
                      type="text"
                      name="hobbies"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.hobbies}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                  {/* SKILLS INPUT GROUP */}
                  <section className="input_Group">
                    <h6>Skills</h6>
                    <textarea
                      className="input"
                      type="text"
                      name="skills"
                      onChange={handleChangeEmployeeDetails}
                      disabled={true}
                      value={employeeDetails.skills}
                    />
                    <section
                      className="edit_Icon_Container"
                      onClick={handleEditDetails}
                    >
                      <i className="fas fa-pen"></i>
                    </section>
                  </section>
                </section>
              </section>
            </section>
          </form>
        </section>
        {/* MOVE TO */}
        <section className="moveto_Container">
          {/* TEXT */}
          <section className="moveto_Text">Move employee to: </section>
          {/* ACTIONS BUTTON */}
          <section className="moveto_Actions_Button">
            <button type="button" onClick={handleMoveTo}>
              Blacklist
            </button>
            <button type="button" onClick={handleMoveTo}>
              Terminated
            </button>
            <button type="button" onClick={handleMoveTo}>
              Resigned
            </button>
          </section>
        </section>
      </section>
    </div>
  );
};

export default EmployeeDetails;
