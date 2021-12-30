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
                      <section className="blackList_details">
                        <h5>Lastname: </h5>
                        <p>{e.lastname}</p>
                      </section>
                      {/* FIRSTNAME */}
                      <section className="blackList_details">
                        <h5>Firstname: </h5>
                        <p>{e.firstname}</p>
                      </section>
                      {/* MIDDLE */}
                      <section className="blackList_details">
                        <h5>Middle: </h5>
                        <p>{e.middle}</p>
                      </section>
                    </section>
                    {/* ----------------- SECOND GROUP ------------------ */}
                    <section className="group_Details">
                      {/* EMPLOYEE ID */}
                      <section className="blackList_details">
                        <h5>Employee id: </h5>
                        <p>{e.employee_id}</p>
                      </section>
                      {/* PHONE */}
                      <section className="blackList_details">
                        <h5>Phone: </h5>
                        <p>{e.phone}</p>
                      </section>
                      {/* CONTRACT */}
                      <section className="blackList_details">
                        <h5>Contract: </h5>
                        <p>{e.contract}</p>
                      </section>
                    </section>
                    {/* ----------------- THIRD GROUP ------------------ */}
                    <section className="group_Details">
                      {/* BIRTHDAY */}
                      <section className="blackList_details">
                        <h5>Birthday: </h5>
                        <p>{e.birthday}</p>
                      </section>
                      {/* GENDER */}
                      <section className="blackList_details">
                        <h5>Gender: </h5>
                        <p>{e.gender}</p>
                      </section>
                      {/* ADDRESS */}
                      <section className="blackList_details">
                        <h5>Address: </h5>
                        <p>{e.address}</p>
                      </section>
                    </section>
                    {/* ----------------- FOURTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* EMAIL */}
                      <section className="blackList_details">
                        <h5>Email: </h5>
                        <p>{e.email}</p>
                      </section>
                      {/* POSITION */}
                      <section className="blackList_details">
                        <h5>Position: </h5>
                        <p>{e.position}</p>
                      </section>
                      {/* CIVIL STATUS */}
                      <section className="blackList_details">
                        <h5>Civil status: </h5>
                        <p>{e.civil_status}</p>
                      </section>
                    </section>
                    {/* ----------------- FIFTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* SPOUSE NAME */}
                      <section className="blackList_details">
                        <h5>Spouse name: </h5>
                        <p>{e.spouce_fullname}</p>
                      </section>
                      {/* SPOUSE BIRTHDAY */}
                      <section className="blackList_details">
                        <h5>Spouse birthday: </h5>
                        <p>{e.spouce_birthday}</p>
                      </section>
                      {/* SPOUSE CONTACT NUMBER */}
                      <section className="blackList_details">
                        <h5>Spouse contact number: </h5>
                        <p>{e.spouce_contact_number}</p>
                      </section>
                    </section>
                    {/* ----------------- SIXTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* RELIGION */}
                      <section className="blackList_details">
                        <h5>Religion: </h5>
                        <p>{e.religion}</p>
                      </section>
                      {/* BLOODTYPE */}
                      <section className="blackList_details">
                        <h5>Bloodtype: </h5>
                        <p>{e.bloodtype}</p>
                      </section>
                      {/* HEIGHT */}
                      <section className="blackList_details">
                        <h5>Height: </h5>
                        <p>{e.height}</p>
                      </section>
                    </section>
                    {/* ----------------- SEVENTH GROUP ------------------ */}
                    <section className="group_Details">
                      {/* WEIGHT */}
                      <section className="blackList_details">
                        <h5>Weight: </h5>
                        <p>{e.weight}</p>
                      </section>
                      {/* GUARDIAN */}
                      <section className="blackList_details">
                        <h5>Guardian: </h5>
                        <p>{e.guardian}</p>
                      </section>
                      {/* DATE HIRED */}
                      <section className="blackList_details">
                        <h5>Date hired: </h5>
                        <p>{e.datehired}</p>
                      </section>
                    </section>
                  </section>
                  {/* BLACKLISTED DETAILS */}
                  <section className="blacklisted_Details">
                    {/* HEADER */}
                    <h4>Reason</h4>
                    {/* REASON */}
                    <section className="reason_Container">
                      <p>{e.reason}</p>
                    </section>
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
