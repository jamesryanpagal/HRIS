import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// images
import presidentIcon from "../../../PublicImages/1President.png";
import administrationIcon from "../../../PublicImages/2Administration.png";
import auditingIcon from "../../../PublicImages/3Auditing.png";
import cashierIcon from "../../../PublicImages/4Cashier.png";
import clinicIcon from "../../../PublicImages/5Clinic.jpg";
import communicationsIcon from "../../../PublicImages/6Communications.png";
import constructionIcon from "../../../PublicImages/7Construction.png";
import engineeringIcon from "../../../PublicImages/8Engineering.png";
import fabricationIcon from "../../../PublicImages/9Fabrication.png";
import humanresourceIcon from "../../../PublicImages/12HumanResource.png";
import marketingIcon from "../../../PublicImages/13Marketing.jpg";
import itIcon from "../../../PublicImages/14I.T.png";
import operationsIcon from "../../../PublicImages/15Operations.png";
import purchasingIcon from "../../../PublicImages/17Purchasing.png";
import qaqcIcon from "../../../PublicImages/18QAQC.png";
import warehouseIcon from "../../../PublicImages/19Warehouse.png";
import finishingIcon from "../../../PublicImages/20Finishing.png";
import securityIcon from "../../../PublicImages/21Security.png";
import motorpoolIcon from "../../../PublicImages/motorpool.png";
import suiteIcon from "../../../PublicImages/suite.png";
import ppcIcon from "../../../PublicImages/PPC.png";
import gmsdIcon from "../../../PublicImages/gmsd.png";
import empty from "../../../PublicImages/empty.png";

// component
import ProfileImage from "../../../ReusableFunctions/ProfileImage/ProfileImage";

// css
import "./Department.css";

// -------------------- department modal ----------------------
const DepartmentModal = ({ departmentName, setViewDepartmentModal }) => {
  // --------------- state ------------------
  // department employee details state
  const [departmentEmployee, setDepartmentEmployee] = useState([]);

  // toggle search state
  const [toggleSearch, setToggleSearch] = useState(false);

  // search state
  const [inputSearch, setInputSearch] = useState("");

  // selector
  const department = useSelector((state) => state.department);

  // get department
  useEffect(() => {
    const dname = departmentName.toLowerCase();
    for (let key in department) {
      if (key === dname) {
        setDepartmentEmployee([...department[key]]);
      }
    }
  }, [department, departmentName]);

  return (
    <div className="department_Modal_Container">
      {/* header */}
      <section className="department_Header_Modal">
        {/* -------------------- search ----------------- */}
        <section className={toggleSearch ? "toggleSearch" : "search"}>
          {/* search icon */}
          <section
            className="search_Icon_Container"
            onClick={() => setToggleSearch((prev) => !prev)}
          >
            {toggleSearch ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-search"></i>
            )}
          </section>
          {/* search input */}
          <section className="search_Input_Container">
            <input
              type="text"
              name="search"
              onChange={(e) => setInputSearch(e.target.value)}
            />
          </section>
        </section>
        {/* ---------------- refresh ------------------ */}
        <section className="refresh" onClick={() => window.location.reload()}>
          <i className="fas fa-sync-alt"></i>
        </section>
        {/* close department */}
        <section
          className="close_Department"
          onClick={() => setViewDepartmentModal(false)}
        >
          <i className="fas fa-times"></i>
        </section>
      </section>
      {/* employee list container */}
      <section className="employee_List_Container">
        {/* employee list */}
        <section className="employee_List">
          {departmentEmployee.length === 0 ? (
            <section className="empty_Department">
              <img src={empty} alt="" />
              <h4>There are no employee for this department !</h4>
            </section>
          ) : inputSearch.length === 0 ? (
            departmentEmployee.map((e) => {
              // get position
              const departmentArr = e.position.split("");
              const departmentIndex = departmentArr.findIndex((c) => c === "(");
              const getPosition = e.position.substring(0, departmentIndex);
              return (
                // employee
                <section key={e._id} className="employee">
                  {/* employee image */}
                  <section className="image">
                    <ProfileImage
                      image={e.employee_image}
                      lastname={e.lastname}
                      firstname={e.firstname}
                    />
                  </section>
                  {/* employee name */}
                  <section className="name">
                    <h4>{`${e.lastname}, ${e.firstname} ${e.middle}`}</h4>
                  </section>
                  {/* id and position group */}
                  <section className="other_Details">
                    {/* employee id */}
                    <section className="id">
                      {/* header */}
                      <h4>Id</h4>
                      {/* id */}
                      <section>{e.employee_id}</section>
                    </section>
                    {/* employee position */}
                    <section className="position">
                      {/* header */}
                      <h4>Position</h4>
                      {/* position */}
                      <section>{getPosition}</section>
                    </section>
                  </section>
                </section>
              );
            })
          ) : (
            departmentEmployee
              .filter((e) =>
                e.lastname.toLowerCase().includes(inputSearch.toLowerCase())
              )
              .map((e) => {
                // get position
                const departmentArr = e.position.split("");
                const departmentIndex = departmentArr.findIndex(
                  (c) => c === "("
                );
                const getPosition = e.position.substring(0, departmentIndex);
                return (
                  // employee
                  <section key={e._id} className="employee">
                    {/* employee image */}
                    <section className="image">
                      <ProfileImage
                        image={e.employee_image}
                        lastname={e.lastname}
                        firstname={e.firstname}
                      />
                    </section>
                    {/* employee name */}
                    <section className="name">
                      <h4>{`${e.lastname}, ${e.firstname} ${e.middle}`}</h4>
                    </section>
                    {/* id and position group */}
                    <section className="other_Details">
                      {/* employee id */}
                      <section className="id">
                        {/* header */}
                        <h4>Id</h4>
                        {/* id */}
                        <section>{e.employee_id}</section>
                      </section>
                      {/* employee position */}
                      <section className="position">
                        {/* header */}
                        <h4>Position</h4>
                        {/* position */}
                        <section>{getPosition}</section>
                      </section>
                    </section>
                  </section>
                );
              })
          )}
        </section>
      </section>
    </div>
  );
};

// ---------------- MAIN -----------------------
const Department = () => {
  // ------------------ STATE -----------
  const [viewDepartmentModal, setViewDepartmentModal] = useState(false);

  // department name state
  const [departmentName, setDepartmentName] = useState("");

  // handleViewDepartment
  const handleViewDepartment = (e) => {
    const target = e.target.children[0].children[2].innerText;
    setDepartmentName(target);
    setViewDepartmentModal(true);
  };

  return (
    <div className="department_Container">
      {/* TOGGLE DEPARTMENT MODAL */}
      {viewDepartmentModal && (
        <DepartmentModal
          departmentName={departmentName}
          setViewDepartmentModal={setViewDepartmentModal}
        />
      )}
      {/* department header */}
      <section className="department_Header">
        <section className="refresh" onClick={() => window.location.reload()}>
          <i className="fas fa-sync-alt"></i>
        </section>
      </section>
      {/* department list */}
      <section className="department_List">
        {/* president's office */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={presidentIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">President's Office</section>
            <span>PRESIDENTSOFFICE</span>
          </section>
        </section>
        {/* Admininstration */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={administrationIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Admininstration</section>
            <span>ADMINISTRATION</span>
          </section>
        </section>
        {/* Auditing */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={auditingIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Auditing</section>
            <span>AUDITING</span>
          </section>
        </section>
        {/* Cashier */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={cashierIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Cashier</section>
            <span>CASHIER</span>
          </section>
        </section>
        {/* Clinic */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={clinicIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Clinic</section>
            <span>CLINIC</span>
          </section>
        </section>
        {/* Communications */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={communicationsIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Communications</section>
            <span>COMMUNICATIONS</span>
          </section>
        </section>
        {/* Construction */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={constructionIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Construction</section>
            <span>CONSTRUCTION</span>
          </section>
        </section>
        {/* Engineering */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={engineeringIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Engineering</section>
            <span>ENGINEERING</span>
          </section>
        </section>
        {/* Fabrication */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={fabricationIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Fabrication</section>
            <span>FABRICATION</span>
          </section>
        </section>
        {/* GMSD */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={gmsdIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">GMSD</section>
            <span>GMSD</span>
          </section>
        </section>
        {/* Motorpool */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={motorpoolIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Motorpool</section>
            <span>MOTORPOOL</span>
          </section>
        </section>
        {/* Human Resource */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={humanresourceIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Human Resource</section>
            <span>HUMANRESOURCE</span>
          </section>
        </section>
        {/* Marketing */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={marketingIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Marketing</section>
            <span>MARKETING</span>
          </section>
        </section>
        {/* I.T */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={itIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">I.T</section>
            <span>IT</span>
          </section>
        </section>
        {/* Operations */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={operationsIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Operations</section>
            <span>OPERATIONS</span>
          </section>
        </section>
        {/* PPC */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={ppcIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">PPC</section>
            <span>PPC</span>
          </section>
        </section>
        {/* Purchasing */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={purchasingIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Purchasing</section>
            <span>PURCHASING</span>
          </section>
        </section>
        {/* QA/QC */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={qaqcIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">QA/QC</section>
            <span>QAQC</span>
          </section>
        </section>
        {/* Warehouse */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={warehouseIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Warehouse</section>
            <span>WAREHOUSE</span>
          </section>
        </section>
        {/* Finishing */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={finishingIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Finishing</section>
            <span>FINISHING</span>
          </section>
        </section>
        {/* Security */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={securityIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Security</section>
            <span>SECURITY</span>
          </section>
        </section>
        {/* Suites */}
        <section className="department" onClick={handleViewDepartment}>
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={suiteIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Suites</section>
            <span>SUITES</span>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Department;
