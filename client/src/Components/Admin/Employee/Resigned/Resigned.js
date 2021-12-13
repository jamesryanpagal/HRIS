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
                      <section className="resignedList_details">
                        <h5>Lastname: </h5>
                        {e.lastname}
                      </section>
                      {/* FIRSTNAME */}
                      <section className="resignedList_details">
                        <h5>Firstname: </h5>
                        {e.firstname}
                      </section>
                      {/* MIDDLE */}
                      <section className="resignedList_details">
                        <h5>Middle: </h5>
                        {e.middle}
                      </section>
                    </section>
                    {/* ----------------- SECOND GROUP ------------------ */}
                    <section className="group_Details">
                      {/* EMPLOYEE ID */}
                      <section className="resignedList_details">
                        <h5>Employee id: </h5>
                        {e.employee_id}
                      </section>
                      {/* PHONE */}
                      <section className="resignedList_details">
                        <h5>Phone: </h5>
                        {e.phone}
                      </section>
                      {/* CONTRACT */}
                      <section className="resignedList_details">
                        <h5>Contract: </h5>
                        {e.contract}
                      </section>
                    </section>
                    {/* ----------------- THIRD GROUP ------------------ */}
                    <section className="group_Details">
                      {/* BIRTHDAY */}
                      <section className="resignedList_details">
                        <h5>Birthday: </h5>
                        {e.birthday}
                      </section>
                      {/* GENDER */}
                      <section className="resignedList_details">
                        <h5>Gender: </h5>
                        {e.gender}
                      </section>
                      {/* ADDRESS */}
                      <section className="resignedList_details">
                        <h5>Address: </h5>
                        {e.address}
                      </section>
                    </section>
                    {/* ----------------- FOURTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* EMAIL */}
                      <section className="resignedList_details">
                        <h5>Email: </h5>
                        {e.email}
                      </section>
                      {/* POSITION */}
                      <section className="resignedList_details">
                        <h5>Position: </h5>
                        {e.position}
                      </section>
                      {/* CIVIL STATUS */}
                      <section className="resignedList_details">
                        <h5>Civil status: </h5>
                        {e.civil_status}
                      </section>
                    </section>
                    {/* ----------------- FIFTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* SPOUSE NAME */}
                      <section className="resignedList_details">
                        <h5>Spouse name: </h5>
                        {e.spouce_fullname}
                      </section>
                      {/* SPOUSE BIRTHDAY */}
                      <section className="resignedList_details">
                        <h5>Spouse birthday: </h5>
                        {e.spouce_birthday}
                      </section>
                      {/* SPOUSE CONTACT NUMBER */}
                      <section className="resignedList_details">
                        <h5>Spouse contact number: </h5>
                        {e.spouce_contact_number}
                      </section>
                    </section>
                    {/* ----------------- SIXTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* RELIGION */}
                      <section className="resignedList_details">
                        <h5>Religion: </h5>
                        {e.religion}
                      </section>
                      {/* BLOODTYPE */}
                      <section className="resignedList_details">
                        <h5>Bloodtype: </h5>
                        {e.bloodtype}
                      </section>
                      {/* HEIGHT */}
                      <section className="resignedList_details">
                        <h5>Height: </h5>
                        {e.height}
                      </section>
                    </section>
                    {/* ----------------- SEVENTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* WEIGHT */}
                      <section className="resignedList_details">
                        <h5>Weight: </h5>
                        {e.weight}
                      </section>
                      {/* GUARDIAN */}
                      <section className="resignedList_details">
                        <h5>Guardian: </h5>
                        {e.guardian}
                      </section>
                      {/* Education */}
                      <section className="resignedList_details">
                        <h5>Education: </h5>
                        {e.education}
                      </section>
                    </section>
                    {/* ----------------- EIGHT GROUP ------------------ */}
                    <section className="group_Details">
                      {/* HOBBIES */}
                      <section className="resignedList_details">
                        <h5>Hobbies: </h5>
                        {e.hobbies}
                      </section>
                      {/* LANGUAGE */}
                      <section className="resignedList_details">
                        <h5>Language: </h5>
                        {e.language}
                      </section>
                      {/* SKILLS */}
                      <section className="resignedList_details">
                        <h5>Skills: </h5>
                        {e.skills}
                      </section>
                    </section>
                    {/* ----------------- NINTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* DATE HIRED */}
                      <section className="resignedList_details">
                        <h5>Date hired: </h5>
                        {e.date_hired.substring(4, 14)}
                      </section>
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
