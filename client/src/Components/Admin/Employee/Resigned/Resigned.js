import React, { useState, useEffect } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Header from "../Header/Header";

// component
import ProfileImage from "../../../../ReusableFunctions/ProfileImage/ProfileImage";

// css
import "./Resigned.css";

const Resigned = () => {
  // ------------------ STATE ---------------

  // resigned employee container state
  const [resignedEmployeeContainer, setResignedEmployeeContainer] = useState(
    []
  );

  // toggle search state
  const [toggleSearch, setToggleSearch] = useState(false);

  // search value state
  const [searchedValue, setSearchedValue] = useState("");

  // on search state
  const [onSearch, setOnSearch] = useState(false);

  // get Resigned employee
  useEffect(() => {
    const getResignedEmployee = async () => {
      const { data } = await axiosConfig.get("MoveTo/GetResigned");
      if (onSearch) {
        setResignedEmployeeContainer(data);
        return;
      }

      setResignedEmployeeContainer(data);
    };

    getResignedEmployee();

    return () => {
      setResignedEmployeeContainer((prev) => (prev = []));
    };
  }, [onSearch]);

  // handle filter Resigned container
  const handleFilterResignedContianer = (e) => {
    const empId = e.target.parentElement;
    const filtered = resignedEmployeeContainer.filter(
      (e) => e.employee_id === empId.children[1].innerText
    );
    setResignedEmployeeContainer(filtered);
    setToggleSearch((prev) => !prev);
  };

  const handleToggleSearch = () => {
    setToggleSearch((prev) => !prev);
    setOnSearch((prev) => !prev);
  };

  return (
    <div className="resigned_Container">
      <Header
        searchSource={resignedEmployeeContainer}
        toggleSearch={toggleSearch}
        searchedValue={searchedValue}
        setSearchedValue={setSearchedValue}
        handleToggleSearch={handleToggleSearch}
        handleFilterEmployeeContainer={handleFilterResignedContianer}
      />

      {/* resigned EMPLOYEE CONTAINER */}
      <section className="resigned_Employee_Container">
        {resignedEmployeeContainer.length > 0 &&
          resignedEmployeeContainer.map((e) => {
            return (
              // resigned EMPLOYEE
              <section key={e.employee_id} className="resigned_Employee">
                {/* resigned IMAGE */}
                <section className="image">
                  <ProfileImage
                    image={e.employee_image}
                    lastname={e.lastname}
                    firstname={e.firstname}
                  />
                </section>
                {/* resigned LASTNAME */}
                <section className="lastname">{e.lastname},</section>
                {/* resigned FIRSTNAME, MIDDLE */}
                <section className="firstname">{`${e.firstname} ${e.middle}.`}</section>
                {/* resigned EMPLOYEE DETAILS MODAL */}
                <section className="details_Container">
                  {/* PERSONAL DETAILS */}
                  <section className="personal_Details">
                    {/* HEADER */}
                    <h4>Personal details</h4>
                    {/* DETAILS */}
                    {/* ----------------- FIRST GROUP ------------------ */}
                    <section className="group_Details">
                      {/* LASTNAME */}
                      <p>
                        <strong>Lastname: </strong>
                        {e.lastname}
                      </p>
                      {/* FIRSTNAME */}
                      <p>
                        <strong>Firstname: </strong>
                        {e.firstname}
                      </p>
                      {/* MIDDLE */}
                      <p>
                        <strong>Middle: </strong>
                        {e.middle}
                      </p>
                    </section>
                    {/* ----------------- SECOND GROUP ------------------ */}
                    <section className="group_Details">
                      {/* EMPLOYEE ID */}
                      <p>
                        <strong>Employee id: </strong>
                        {e.employee_id}
                      </p>
                      {/* PHONE */}
                      <p>
                        <strong>Phone: </strong>
                        {e.phone}
                      </p>
                      {/* CONTRACT */}
                      <p>
                        <strong>Contract: </strong>
                        {e.contract}
                      </p>
                    </section>
                    {/* ----------------- THIRD GROUP ------------------ */}
                    <section className="group_Details">
                      {/* BIRTHDAY */}
                      <p>
                        <strong>Birthday: </strong>
                        {e.birthday}
                      </p>
                      {/* GENDER */}
                      <p>
                        <strong>Gender: </strong>
                        {e.gender}
                      </p>
                      {/* ADDRESS */}
                      <p>
                        <strong>Address: </strong>
                        {e.address}
                      </p>
                    </section>
                    {/* ----------------- FOURTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* EMAIL */}
                      <p>
                        <strong>Email: </strong>
                        {e.email}
                      </p>
                      {/* POSITION */}
                      <p>
                        <strong>Position: </strong>
                        {e.position}
                      </p>
                      {/* CIVIL STATUS */}
                      <p>
                        <strong>Civil status: </strong>
                        {e.civil_status}
                      </p>
                    </section>
                    {/* ----------------- FIFTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* SPOUSE NAME */}
                      <p>
                        <strong>Spouse name: </strong>
                        {e.spouce_fullname}
                      </p>
                      {/* SPOUSE BIRTHDAY */}
                      <p>
                        <strong>Spouse birthday: </strong>
                        {e.spouce_birthday}
                      </p>
                      {/* SPOUSE CONTACT NUMBER */}
                      <p>
                        <strong>Spouse contact number:</strong>
                        {e.spouce_contact_number}
                      </p>
                    </section>
                    {/* ----------------- SIXTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* RELIGION */}
                      <p>
                        <strong>Religion: </strong>
                        {e.religion}
                      </p>
                      {/* BLOODTYPE */}
                      <p>
                        <strong>Bloodtype: </strong>
                        {e.bloodtype}
                      </p>
                      {/* HEIGHT */}
                      <p>
                        <strong>Height: </strong>
                        {e.height}
                      </p>
                    </section>
                    {/* ----------------- SEVENTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* WEIGHT */}
                      <p>
                        <strong>Weight: </strong>
                        {e.weight}
                      </p>
                      {/* GUARDIAN */}
                      <p>
                        <strong>Guardian: </strong>
                        {e.guardian}
                      </p>
                      {/* Education */}
                      <p>
                        <strong>Education: </strong>
                        {e.education}
                      </p>
                    </section>
                    {/* ----------------- EIGHT GROUP ------------------ */}
                    <section className="group_Details">
                      {/* HOBBIES */}
                      <p>
                        <strong>Hobbies: </strong>
                        {e.hobbies}
                      </p>
                      {/* LANGUAGE */}
                      <p>
                        <strong>Language: </strong>
                        {e.language}
                      </p>
                      {/* SKILLS */}
                      <p>
                        <strong>Skills: </strong>
                        {e.skills}
                      </p>
                    </section>
                    {/* ----------------- NINTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* DATE HIRED */}
                      <p>
                        <strong>Date hired:</strong>
                        {e.date_hired.substring(4, 14)}
                      </p>
                    </section>
                  </section>
                  {/* resignedED DETAILS */}
                  <section className="resigneded_Details">
                    {/* HEADER */}
                    <h4>Reason</h4>
                    {/* REASON */}
                    <section className="reason_Container">{e.reason}</section>
                  </section>
                </section>
              </section>
            );
          })}
      </section>
    </div>
  );
};

export default Resigned;
