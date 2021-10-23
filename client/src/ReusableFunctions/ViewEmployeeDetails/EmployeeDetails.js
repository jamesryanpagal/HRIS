import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../AxiosConfig/AxiosConfig";
import io from "socket.io-client";

// Spinner
import Spinner from "../../Spinner/Spinner";

// Components
import ProfileImage from "../ProfileImage/ProfileImage";

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

  // SELECTOR
  const { employees } = useSelector((state) => state.Employee);

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

  return (
    <div
      className={
        toggleViewDetails ? "employee_Details_Container" : "close_View_Details"
      }
    >
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
              <span>{employeeDetails.position}</span>
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
                  {employeeDetails.position}
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
                  <span>Contract expired: </span>
                  {employeeDetails.date_hired}
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
                </section>
                {/* ---------------- SECOND SECTION ------------------ */}
                <section className="second_Section">
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
      </section>
    </div>
  );
};

export default EmployeeDetails;
