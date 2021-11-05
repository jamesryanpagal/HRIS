import React from "react";

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

// css
import "./Department.css";

const Department = () => {
  return (
    <div className="department_Container">
      {/* department list */}
      <section className="department_List">
        {/* president's office */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={presidentIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">President's Office</section>
          </section>
        </section>
        {/* Admininstration */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={administrationIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Admininstration</section>
          </section>
        </section>
        {/* Auditing */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={auditingIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Auditing</section>
          </section>
        </section>
        {/* Cashier */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={cashierIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Cashier</section>
          </section>
        </section>
        {/* Clinic */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={clinicIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Clinic</section>
          </section>
        </section>
        {/* Communications */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={communicationsIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Communications</section>
          </section>
        </section>
        {/* Construction */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={constructionIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Construction</section>
          </section>
        </section>
        {/* Engineering */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={engineeringIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Engineering</section>
          </section>
        </section>
        {/* Fabrication */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={fabricationIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Fabrication</section>
          </section>
        </section>
        {/* GMSD */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={gmsdIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">GMSD</section>
          </section>
        </section>
        {/* Motorpool */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={motorpoolIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Motorpool</section>
          </section>
        </section>
        {/* Human Resource */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={humanresourceIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Human Resource</section>
          </section>
        </section>
        {/* Marketing */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={marketingIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Merketing</section>
          </section>
        </section>
        {/* I.T */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={itIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">department interface</section>
          </section>
        </section>
        {/* Operations */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={operationsIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Operations</section>
          </section>
        </section>
        {/* PPC */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={ppcIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">PPC</section>
          </section>
        </section>
        {/* Purchasing */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={purchasingIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Purchasing</section>
          </section>
        </section>
        {/* QA/QC */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={qaqcIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">QA/QC</section>
          </section>
        </section>
        {/* Warehouse */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={warehouseIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Warehouse</section>
          </section>
        </section>
        {/* Finishing */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={finishingIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Finishing</section>
          </section>
        </section>
        {/* Security */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={securityIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Security</section>
          </section>
        </section>
        {/* Suites */}
        <section className="department">
          {/* department interface */}
          <section className="department_Interface_Container">
            {/* department logo */}
            <section className="department_Logo">
              <img src={suiteIcon} alt="" />
            </section>
            {/* department title */}
            <section className="department_Title">Suites</section>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Department;
