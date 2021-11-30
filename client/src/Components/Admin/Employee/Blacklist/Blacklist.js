import React, { useState, useEffect } from "react";
import axiosConfig from "../../../../ReusableFunctions/AxiosConfig/AxiosConfig";
import Header from "../Header/Header";

// component
import ProfileImage from "../../../../ReusableFunctions/ProfileImage/ProfileImage";

// css
import "./Blacklist.css";

const Blacklist = () => {
  // ------------------ STATE ---------------

  // blacklist employee container state
  const [blacklistEmployeeContainer, setBlacklistEmployeeContainer] = useState(
    []
  );

  // toggle search state
  const [toggleSearch, setToggleSearch] = useState(false);

  // search value state
  const [searchedValue, setSearchedValue] = useState("");

  // on search state
  const [onSearch, setOnSearch] = useState(false);

  // get blacklist employee
  useEffect(() => {
    const getBlacklistEmployee = async () => {
      const { data } = await axiosConfig.get("MoveTo/GetBlacklist");
      if (onSearch) {
        setBlacklistEmployeeContainer(data);
        return;
      }

      setBlacklistEmployeeContainer(data);
    };

    getBlacklistEmployee();

    return () => {
      setBlacklistEmployeeContainer((prev) => (prev = []));
    };
  }, [onSearch]);

  // handle filter blacklist container
  const handleFilterBlacklistContianer = (e) => {
    const empId = e.target.parentElement;
    const filtered = blacklistEmployeeContainer.filter(
      (e) => e.employee_id === empId.children[1].innerText
    );
    setBlacklistEmployeeContainer(filtered);
    setToggleSearch((prev) => !prev);
  };

  // handle toggle search
  const handleToggleSearch = () => {
    setToggleSearch((prev) => !prev);
    setOnSearch((prev) => !prev);
  };

  return (
    <div className="blacklist_Container">
      <Header
        searchSource={blacklistEmployeeContainer}
        toggleSearch={toggleSearch}
        searchedValue={searchedValue}
        setSearchedValue={setSearchedValue}
        handleToggleSearch={handleToggleSearch}
        handleFilterEmployeeContainer={handleFilterBlacklistContianer}
      />

      {/* BLACKLIST EMPLOYEE CONTAINER */}
      <section className="blacklist_Employee_Container">
        {blacklistEmployeeContainer.length > 0 &&
          blacklistEmployeeContainer.map((e) => {
            return (
              // BLACKLIST EMPLOYEE
              <section key={e.employee_id} className="blacklist_Employee">
                {/* BLACKLIST IMAGE */}
                <section className="image">
                  <ProfileImage
                    image={e.employee_image}
                    lastname={e.lastname}
                    firstname={e.firstname}
                  />
                </section>
                {/* BLACKLIST LASTNAME */}
                <section className="lastname">{e.lastname},</section>
                {/* BLACKLIST FIRSTNAME, MIDDLE */}
                <section className="firstname">{`${e.firstname} ${e.middle}.`}</section>
                {/* BLACKLIST EMPLOYEE DETAILS MODAL */}
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
                  {/* BLACKLISTED DETAILS */}
                  <section className="blacklisted_Details">
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

export default Blacklist;
