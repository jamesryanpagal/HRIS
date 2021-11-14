// ------------------ model -----------
const PresidentsOffice = require("../Model/PresidentsOffice_Model");
const Administration = require("../Model/Administration_Model");
const Auditing = require("../Model/Auditing_Model");
const Cashier = require("../Model/Cashier_Model");
const Clinic = require("../Model/Clinic_Model");
const Communication = require("../Model/Communication_Model");
const Construction = require("../Model/Construction_Model");
const Engineering = require("../Model/Engineering_Model");
const Fabrication = require("../Model/Fabrication_Model");
const GMSD = require("../Model/GMSD_Model");
const Motorpool = require("../Model/Motorpool_Model");
const HumanResource = require("../Model/HumanResource_Model");
const Marketing = require("../Model/Marketing_Model");
const it = require("../Model/I.T_Model");
const Operations = require("../Model/Operations_Model");
const PPC = require("../Model/PPC_Model");
const Purchasing = require("../Model/Purchasing_Model");
const QAQC = require("../Model/QAQC_Model");
const Warehouse = require("../Model/Warehouse_Model");
const Finishing = require("../Model/Finishing_Model");
const Security = require("../Model/Security_Model");
const Suites = require("../Model/Suites_Model");

const date = new Date();

const addToDepartment = async (req, res) => {
  const employee = req.body;
  try {
    // --------------- PRESIDENT -----------------
    // FILTER PRESIDENT
    const filterPresident = employee.filter((e) =>
      e.position.includes("(PRESIDENTS OFFICE)")
    );
    filterPresident.map(async (e) => {
      try {
        await PresidentsOffice.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- ADMINISTRATION -----------------
    // FILTER ADMINISTRATION
    const filterAdministration = employee.filter((e) =>
      e.position.includes("(ADMINISTRATION)")
    );
    filterAdministration.map(async (e) => {
      try {
        await Administration.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- AUDITING -----------------
    // FILTER AUDITING
    const filterAuditing = employee.filter((e) =>
      e.position.includes("(AUDITING)")
    );
    filterAuditing.map(async (e) => {
      try {
        await Auditing.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- CASHIER -----------------
    // FILTER CASHIER
    const filterCashier = employee.filter((e) =>
      e.position.includes("(CASHIER)")
    );
    filterCashier.map(async (e) => {
      try {
        await Cashier.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- CLINIC -----------------
    // FILTER CLINIC
    const filterClinic = employee.filter((e) =>
      e.position.includes("(CLINIC)")
    );
    filterClinic.map(async (e) => {
      try {
        await Clinic.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- COMMUNICATIONS -----------------
    // FILTER COMMUNICATIONS
    const filterCommunication = employee.filter((e) =>
      e.position.includes("(COMMUNICATIONS)")
    );
    filterCommunication.map(async (e) => {
      try {
        await Communication.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- CONSTRUCTION -----------------
    // FILTER CONSTRUCTION
    const filterConstruction = employee.filter((e) =>
      e.position.includes("(CONSTRUCTION)")
    );
    filterConstruction.map(async (e) => {
      try {
        await Construction.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- ENGINEERING -----------------
    // FILTER ENGINEERING
    const filterEngineering = employee.filter((e) =>
      e.position.includes("(ENGINEERING)")
    );
    filterEngineering.map(async (e) => {
      try {
        await Engineering.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- FABRICATION -----------------
    // FILTER FABRICATION
    const filterFabrication = employee.filter((e) =>
      e.position.includes("(FABRICATION)")
    );
    filterFabrication.map(async (e) => {
      try {
        await Fabrication.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- GMSD -----------------
    // FILTER GMSD
    const filterGmsd = employee.filter((e) => e.position.includes("(GMSD)"));
    filterGmsd.map(async (e) => {
      try {
        await GMSD.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- MOTORPOOL -----------------
    // FILTER MOTORPOOL
    const filterMotorpool = employee.filter((e) =>
      e.position.includes("(MOTORPOOL)")
    );
    filterMotorpool.map(async (e) => {
      try {
        await Motorpool.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- HUMAN RESOURCE -----------------
    // FILTER HUMAN RESOURCE
    const filterHumanResource = employee.filter((e) =>
      e.position.includes("(HUMAN RESOURCE)")
    );
    filterHumanResource.map(async (e) => {
      try {
        await HumanResource.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- MARKETING -----------------
    // FILTER MARKETING
    const filterMarketing = employee.filter((e) =>
      e.position.includes("(MARKETING)")
    );
    filterMarketing.map(async (e) => {
      try {
        await Marketing.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- I.T -----------------
    // FILTER I.T
    const filterIt = employee.filter((e) => e.position.includes("(I.T)"));
    filterIt.map(async (e) => {
      try {
        await it.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- OPERATIONS -----------------
    // FILTER OPERATIONS
    const filterOperations = employee.filter((e) =>
      e.position.includes("(OPERATIONS)")
    );
    filterOperations.map(async (e) => {
      try {
        await Operations.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- PPC -----------------
    // FILTER PPC
    const filterPpc = employee.filter((e) => e.position.includes("(PPC)"));
    filterPpc.map(async (e) => {
      try {
        await PPC.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- PURCHASING -----------------
    // FILTER PURCHASING
    const filterPurchasing = employee.filter((e) =>
      e.position.includes("(PURCHASING)")
    );
    filterPurchasing.map(async (e) => {
      try {
        await Purchasing.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- QA/QC -----------------
    // FILTER QA/QC
    const filterQaqc = employee.filter((e) => e.position.includes("(QA/QC)"));
    filterQaqc.map(async (e) => {
      try {
        await QAQC.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- WAREHOUSE -----------------
    // FILTER WAREHOUSE
    const filterWarehouse = employee.filter((e) =>
      e.position.includes("(WAREHOUSE)")
    );
    filterWarehouse.map(async (e) => {
      try {
        await Warehouse.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- FINISHING -----------------
    // FILTER FINISHING
    const filterFinishing = employee.filter((e) =>
      e.position.includes("(FINISHING)")
    );
    filterFinishing.map(async (e) => {
      try {
        await Finishing.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- SECURITY -----------------
    // FILTER SECURITY
    const filterSecurity = employee.filter((e) =>
      e.position.includes("(SECURITY)")
    );
    filterSecurity.map(async (e) => {
      try {
        await Security.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    // --------------- SUITES -----------------
    // FILTER SUITES
    const filterSuites = employee.filter((e) =>
      e.position.includes("(SUITES)")
    );
    filterSuites.map(async (e) => {
      try {
        await Suites.create({
          employee_id: e.employee_id,
          employee_image: e.employee_image,
          lastname: e.lastname,
          firstname: e.firstname,
          middle: e.middle,
          phone: e.phone,
          birthday: e.birthday,
          gender: e.gender,
          address: e.address,
          email: e.email,
          position: e.position,
          civil_status: e.civil_status,
          spouce_fullname: e.spouce_fullname,
          spouce_birthday: e.spouce_birthday,
          spouce_contact_number: e.spouce_contact_number,
          religion: e.religion,
          bloodtype: e.bloodtype,
          height: e.height,
          weight: e.weight,
          guardian: e.guardian,
          education: e.education,
          hobbies: e.hobbies,
          language: e.language,
          skills: e.skills,
          date_hired: date.toString(),
        });
      } catch (error) {
        if (error.message.includes("duplicate")) {
          return;
        }
        console.log({ error: true, message: error.message });
      }
    });
    res.json("hello world");
  } catch (error) {
    res.json(error.message);
  }
};

// get department employee
const getDepartmentEmployee = async (req, res) => {
  let employees = [];
  try {
    const getPresidentsOfficeEmployee = await PresidentsOffice.find();
    const getAdministrationEmployee = await Administration.find();
    const getAuditingEmployee = await Auditing.find();
    const getCashierEmployee = await Cashier.find();
    const getClinicEmployee = await Clinic.find();
    const getCommunicationEmployee = await Communication.find();
    const getConstructionEmployee = await Construction.find();
    const getEngineeringEmployee = await Engineering.find();
    const getFabricationEmployee = await Fabrication.find();
    const getGMSDEmployee = await GMSD.find();
    const getMotorpoolEmployee = await Motorpool.find();
    const getHumanResourceEmployee = await HumanResource.find();
    const getMarketingEmployee = await Marketing.find();
    const getitEmployee = await it.find();
    const getOperationsEmployee = await Operations.find();
    const getPPCEmployee = await PPC.find();
    const getPurchasingEmployee = await Purchasing.find();
    const getQAQCEmployee = await QAQC.find();
    const getWarehouseEmployee = await Warehouse.find();
    const getFinishingEmployee = await Finishing.find();
    const getSecurityEmployee = await Security.find();
    const getSuitesEmployee = await Suites.find();
    employees = [
      ...employees,
      ...getPresidentsOfficeEmployee,
      ...getAdministrationEmployee,
      ...getAuditingEmployee,
      ...getCashierEmployee,
      ...getClinicEmployee,
      ...getCommunicationEmployee,
      ...getConstructionEmployee,
      ...getEngineeringEmployee,
      ...getFabricationEmployee,
      ...getGMSDEmployee,
      ...getMotorpoolEmployee,
      ...getHumanResourceEmployee,
      ...getMarketingEmployee,
      ...getitEmployee,
      ...getOperationsEmployee,
      ...getPPCEmployee,
      ...getPurchasingEmployee,
      ...getQAQCEmployee,
      ...getWarehouseEmployee,
      ...getFinishingEmployee,
      ...getSecurityEmployee,
      ...getSuitesEmployee,
    ];
    res.json(employees);
  } catch (error) {
    res.json(error.message);
  }
};

// ---------------- update employee department ---------------------
// update employee department PresidentsOffice
const updateEmployeeDepartment_PresidentsOffice = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await PresidentsOffice.findById(id);
    if (employeeExist) {
      await PresidentsOffice.findByIdAndDelete(id);
      res.json("Employee has been remove to PresidentsOffice department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department Administration
const updateEmployeeDepartment_Administration = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Administration.findById(id);
    if (employeeExist) {
      await Administration.findByIdAndDelete(id);
      res.json("Employee has been remove to Administration department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};
// update employee department Auditing
const updateEmployeeDepartment_Auditing = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Auditing.findById(id);
    if (employeeExist) {
      await Auditing.findByIdAndDelete(id);
      res.json("Employee has been remove to Auditing department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department cashier
const updateEmployeeDepartment_Cashier = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Cashier.findById(id);
    if (employeeExist) {
      await Cashier.findByIdAndDelete(id);
      res.json("Employee has been remove to cashier department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};
// update employee department Clinic
const updateEmployeeDepartment_Clinic = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Clinic.findById(id);
    if (employeeExist) {
      await Clinic.findByIdAndDelete(id);
      res.json("Employee has been remove to Clinic department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department Communication
const updateEmployeeDepartment_Communications = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Communication.findById(id);
    if (employeeExist) {
      await Communication.findByIdAndDelete(id);
      res.json("Employee has been remove to Communication department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};
// update employee department Construction
const updateEmployeeDepartment_Construction = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Construction.findById(id);
    if (employeeExist) {
      await Construction.findByIdAndDelete(id);
      res.json("Employee has been remove to Construction department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department Engineering
const updateEmployeeDepartment_Engineering = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Engineering.findById(id);
    if (employeeExist) {
      await Engineering.findByIdAndDelete(id);
      res.json("Employee has been remove to Engineering department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};
// update employee department Fabrication
const updateEmployeeDepartment_Fabrication = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Fabrication.findById(id);
    if (employeeExist) {
      await Fabrication.findByIdAndDelete(id);
      res.json("Employee has been remove to Fabrication department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department GMSD
const updateEmployeeDepartment_GMSD = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await GMSD.findById(id);
    if (employeeExist) {
      await GMSD.findByIdAndDelete(id);
      res.json("Employee has been remove to GMSD department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};
// update employee department Motorpool
const updateEmployeeDepartment_Motorpool = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Motorpool.findById(id);
    if (employeeExist) {
      await Motorpool.findByIdAndDelete(id);
      res.json("Employee has been remove to Motorpool department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department HumanResource
const updateEmployeeDepartment_HumanResource = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await HumanResource.findById(id);
    if (employeeExist) {
      await HumanResource.findByIdAndDelete(id);
      res.json("Employee has been remove to HumanResource department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};
// update employee department Marketing
const updateEmployeeDepartment_Marketing = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Marketing.findById(id);
    if (employeeExist) {
      await Marketing.findByIdAndDelete(id);
      res.json("Employee has been remove to Marketing department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department it
const updateEmployeeDepartment_it = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await it.findById(id);
    if (employeeExist) {
      await it.findByIdAndDelete(id);
      res.json("Employee has been remove to it department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};
// update employee department Operations
const updateEmployeeDepartment_Operations = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Operations.findById(id);
    if (employeeExist) {
      await Operations.findByIdAndDelete(id);
      res.json("Employee has been remove to Operations department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department PPC
const updateEmployeeDepartment_PPC = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await PPC.findById(id);
    if (employeeExist) {
      await PPC.findByIdAndDelete(id);
      res.json("Employee has been remove to PPC department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};
// update employee department Purchasing
const updateEmployeeDepartment_Purchasing = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Purchasing.findById(id);
    if (employeeExist) {
      await Purchasing.findByIdAndDelete(id);
      res.json("Employee has been remove to Purchasing department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department QAQC
const updateEmployeeDepartment_QAQC = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await QAQC.findById(id);
    if (employeeExist) {
      await QAQC.findByIdAndDelete(id);
      res.json("Employee has been remove to QAQC department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department Warehouse
const updateEmployeeDepartment_Warehouse = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Warehouse.findById(id);
    if (employeeExist) {
      await Warehouse.findByIdAndDelete(id);
      res.json("Employee has been remove to Warehouse department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};
// update employee department Finishing
const updateEmployeeDepartment_Finishing = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Finishing.findById(id);
    if (employeeExist) {
      await Finishing.findByIdAndDelete(id);
      res.json("Employee has been remove to Finishing department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department Security
const updateEmployeeDepartment_Security = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Security.findById(id);
    if (employeeExist) {
      await Security.findByIdAndDelete(id);
      res.json("Employee has been remove to Security department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// update employee department Suites
const updateEmployeeDepartment_Suites = async (req, res) => {
  const id = req.params.id;
  try {
    const employeeExist = await Suites.findById(id);
    if (employeeExist) {
      await Suites.findByIdAndDelete(id);
      res.json("Employee has been remove to Suites department");
      return;
    }

    res.json("Employee not exist!");
  } catch (error) {
    res.json(error.message);
  }
};

// ------------------- update employee details --------------------
// update employee details PRESIDENTSOFFICE
const updateEmployeeDetails_PRESIDENTSOFFICE = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await PresidentsOffice.findOne({ employee_id: id });
    const updateEmployeeDetails = await PresidentsOffice.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details ADMINISTRATION
const updateEmployeeDetails_ADMINISTRATION = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Administration.findOne({ employee_id: id });
    const updateEmployeeDetails = await Administration.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details AUDITING
const updateEmployeeDetails_AUDITING = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Auditing.findOne({ employee_id: id });
    const updateEmployeeDetails = await Auditing.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details CASHIER
const updateEmployeeDetails_CASHIER = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Cashier.findOne({ employee_id: id });
    const updateEmployeeDetails = await Cashier.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details CLINIC
const updateEmployeeDetails_CLINIC = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Clinic.findOne({ employee_id: id });
    const updateEmployeeDetails = await Clinic.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details COMMUNICATIONS
const updateEmployeeDetails_COMMUNICATIONS = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Communication.findOne({ employee_id: id });
    const updateEmployeeDetails = await Communication.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details CONSTRUCTION
const updateEmployeeDetails_CONSTRUCTION = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Construction.findOne({ employee_id: id });
    const updateEmployeeDetails = await Construction.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details ENGINEERING
const updateEmployeeDetails_ENGINEERING = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Engineering.findOne({ employee_id: id });
    const updateEmployeeDetails = await Engineering.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details FABRICATION
const updateEmployeeDetails_FABRICATION = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Fabrication.findOne({ employee_id: id });
    const updateEmployeeDetails = await Fabrication.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details GMSD
const updateEmployeeDetails_GMSD = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await GMSD.findOne({ employee_id: id });
    const updateEmployeeDetails = await GMSD.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details MOTORPOOL
const updateEmployeeDetails_MOTORPOOL = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Motorpool.findOne({ employee_id: id });
    const updateEmployeeDetails = await Motorpool.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details HUMANRESOURCE
const updateEmployeeDetails_HUMANRESOURCE = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await HumanResource.findOne({ employee_id: id });
    const updateEmployeeDetails = await HumanResource.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details MARKETING
const updateEmployeeDetails_MARKETING = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Marketing.findOne({ employee_id: id });
    const updateEmployeeDetails = await Marketing.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details IT
const updateEmployeeDetails_IT = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await it.findOne({ employee_id: id });
    const updateEmployeeDetails = await it.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details OPERATIONS
const updateEmployeeDetails_OPERATIONS = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Operations.findOne({ employee_id: id });
    const updateEmployeeDetails = await Operations.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details PPC
const updateEmployeeDetails_PPC = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await PPC.findOne({ employee_id: id });
    const updateEmployeeDetails = await PPC.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details PURCHASING
const updateEmployeeDetails_PURCHASING = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Purchasing.findOne({ employee_id: id });
    const updateEmployeeDetails = await Purchasing.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details QAQC
const updateEmployeeDetails_QAQC = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await QAQC.findOne({ employee_id: id });
    const updateEmployeeDetails = await QAQC.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details WAREHOUSE
const updateEmployeeDetails_WAREHOUSE = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Warehouse.findOne({ employee_id: id });
    const updateEmployeeDetails = await Warehouse.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details FINISHING
const updateEmployeeDetails_FINISHING = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Finishing.findOne({ employee_id: id });
    const updateEmployeeDetails = await Finishing.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details SECURITY
const updateEmployeeDetails_SECURITY = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Security.findOne({ employee_id: id });
    const updateEmployeeDetails = await Security.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

// update employee details SUITES
const updateEmployeeDetails_SUITES = async (req, res) => {
  const id = req.params.id;
  let updates = req.body;
  delete updates._id;
  const options = { new: true };
  try {
    const employee = await Suites.findOne({ employee_id: id });
    const updateEmployeeDetails = await Suites.findByIdAndUpdate(
      employee._id,
      updates,
      options
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  addToDepartment,
  getDepartmentEmployee,
  updateEmployeeDepartment_PresidentsOffice,
  updateEmployeeDepartment_Administration,
  updateEmployeeDepartment_Auditing,
  updateEmployeeDepartment_Cashier,
  updateEmployeeDepartment_Clinic,
  updateEmployeeDepartment_Communications,
  updateEmployeeDepartment_Construction,
  updateEmployeeDepartment_Engineering,
  updateEmployeeDepartment_Fabrication,
  updateEmployeeDepartment_GMSD,
  updateEmployeeDepartment_Motorpool,
  updateEmployeeDepartment_HumanResource,
  updateEmployeeDepartment_Marketing,
  updateEmployeeDepartment_it,
  updateEmployeeDepartment_Operations,
  updateEmployeeDepartment_PPC,
  updateEmployeeDepartment_Purchasing,
  updateEmployeeDepartment_QAQC,
  updateEmployeeDepartment_Warehouse,
  updateEmployeeDepartment_Finishing,
  updateEmployeeDepartment_Security,
  updateEmployeeDepartment_Suites,
  updateEmployeeDetails_PRESIDENTSOFFICE,
  updateEmployeeDetails_ADMINISTRATION,
  updateEmployeeDetails_AUDITING,
  updateEmployeeDetails_CASHIER,
  updateEmployeeDetails_CLINIC,
  updateEmployeeDetails_COMMUNICATIONS,
  updateEmployeeDetails_CONSTRUCTION,
  updateEmployeeDetails_ENGINEERING,
  updateEmployeeDetails_FABRICATION,
  updateEmployeeDetails_GMSD,
  updateEmployeeDetails_MOTORPOOL,
  updateEmployeeDetails_HUMANRESOURCE,
  updateEmployeeDetails_MARKETING,
  updateEmployeeDetails_IT,
  updateEmployeeDetails_OPERATIONS,
  updateEmployeeDetails_PPC,
  updateEmployeeDetails_PURCHASING,
  updateEmployeeDetails_QAQC,
  updateEmployeeDetails_WAREHOUSE,
  updateEmployeeDetails_FINISHING,
  updateEmployeeDetails_SECURITY,
  updateEmployeeDetails_SUITES,
};
