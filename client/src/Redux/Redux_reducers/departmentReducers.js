// -------------------------- DEPARTMENTS REDUCERS --------------------
export const departmentReducers = (
  state = {
    presidentsoffice: [],
    administration: [],
    auditing: [],
    cashier: [],
    clinic: [],
    communications: [],
    construction: [],
    engineering: [],
    fabrication: [],
    gmsd: [],
    motorpool: [],
    humanresource: [],
    marketing: [],
    it: [],
    operations: [],
    ppc: [],
    purchasing: [],
    qaqc: [],
    warehouse: [],
    finishing: [],
    security: [],
    suites: [],
  },
  action
) => {
  switch (action.type) {
    // -------------------- clear department ---------------------
    case "CLEAR_DEPARTMENT":
      return {
        ...state,
        presidentsoffice: [],
        administration: [],
        auditing: [],
        cashier: [],
        clinic: [],
        communications: [],
        construction: [],
        engineering: [],
        fabrication: [],
        gmsd: [],
        motorpool: [],
        humanresource: [],
        marketing: [],
        it: [],
        operations: [],
        ppc: [],
        purchasing: [],
        qaqc: [],
        warehouse: [],
        finishing: [],
        security: [],
        suites: [],
      };

    // -------------------- president ---------------------
    case "PRESIDENTS OFFICE":
      const presidentData = action.payload.departmentPayload;

      state.presidentsoffice.filter(
        (e) => e.employee_id === presidentData.employee_id
      );

      // check if data already exist
      const presidentDataExist = state.presidentsoffice.find(
        (e) => e.employee_id === presidentData.employee_id
      );

      if (!presidentDataExist) {
        return {
          ...state,
          presidentsoffice: [...state.presidentsoffice, presidentData],
        };
      }

      // find index of each data
      const presidentDataIndex = state.presidentsoffice.findIndex(
        (e) => e.employee_id === presidentData.employee_id
      );

      const presidentDataObj = state.presidentsoffice[presidentDataIndex];

      presidentDataObj.employee_image = presidentData.employee_image;
      presidentDataObj.email = presidentData.email;
      presidentDataObj.position = presidentData.position;
      presidentDataObj.height = presidentData.height;
      presidentDataObj.weight = presidentData.weight;
      presidentDataObj.civil_status = presidentData.civil_status;
      presidentDataObj.spouce_fullname = presidentData.spouce_fullname;
      presidentDataObj.spouce_birthday = presidentData.spouce_birthday;
      presidentDataObj.spouce_contact_number =
        presidentData.spouce_contact_number;
      presidentDataObj.address = presidentData.address;
      presidentDataObj.language = presidentData.language;
      presidentDataObj.hobbies = presidentData.hobbies;
      presidentDataObj.skills = presidentData.skills;

      return {
        ...state,
        presidentsoffice: [...state.presidentsoffice],
      };
    // -------------------- administration ---------------------
    case "ADMINISTRATION":
      const administrationData = action.payload.departmentPayload;

      state.administration.filter(
        (e) => e.employee_id === administrationData.employee_id
      );

      // check if data already exist
      const administrationDataExist = state.administration.find(
        (e) => e.employee_id === administrationData.employee_id
      );

      if (!administrationDataExist) {
        return {
          ...state,
          administration: [...state.administration, administrationData],
        };
      }

      // find index of each data
      const administrationDataIndex = state.administration.findIndex(
        (e) => e.employee_id === administrationData.employee_id
      );

      const administrationDataObj =
        state.administration[administrationDataIndex];

      administrationDataObj.employee_image = administrationData.employee_image;
      administrationDataObj.email = administrationData.email;
      administrationDataObj.position = administrationData.position;
      administrationDataObj.height = administrationData.height;
      administrationDataObj.weight = administrationData.weight;
      administrationDataObj.civil_status = administrationData.civil_status;
      administrationDataObj.spouce_fullname =
        administrationData.spouce_fullname;
      administrationDataObj.spouce_birthday =
        administrationData.spouce_birthday;
      administrationDataObj.spouce_contact_number =
        administrationData.spouce_contact_number;
      administrationDataObj.address = administrationData.address;
      administrationDataObj.language = administrationData.language;
      administrationDataObj.hobbies = administrationData.hobbies;
      administrationDataObj.skills = administrationData.skills;

      return {
        ...state,
        administration: [...state.administration],
      };
    // -------------------- auditing ---------------------
    case "AUDITING":
      const auditingData = action.payload.departmentPayload;

      state.auditing.filter((e) => e.employee_id === auditingData.employee_id);

      // check if data already exist
      const auditingDataExist = state.auditing.find(
        (e) => e.employee_id === auditingData.employee_id
      );

      if (!auditingDataExist) {
        return {
          ...state,
          auditing: [...state.auditing, auditingData],
        };
      }

      // find index of each data
      const auditingDataIndex = state.auditing.findIndex(
        (e) => e.employee_id === auditingData.employee_id
      );

      const auditingDataObj = state.auditing[auditingDataIndex];

      auditingDataObj.employee_image = auditingData.employee_image;
      auditingDataObj.email = auditingData.email;
      auditingDataObj.position = auditingData.position;
      auditingDataObj.height = auditingData.height;
      auditingDataObj.weight = auditingData.weight;
      auditingDataObj.civil_status = auditingData.civil_status;
      auditingDataObj.spouce_fullname = auditingData.spouce_fullname;
      auditingDataObj.spouce_birthday = auditingData.spouce_birthday;
      auditingDataObj.spouce_contact_number =
        auditingData.spouce_contact_number;
      auditingDataObj.address = auditingData.address;
      auditingDataObj.language = auditingData.language;
      auditingDataObj.hobbies = auditingData.hobbies;
      auditingDataObj.skills = auditingData.skills;

      return {
        ...state,
        auditing: [...state.auditing],
      };
    // -------------------- cashier ---------------------
    case "CASHIER":
      const cashierData = action.payload.departmentPayload;

      state.cashier.filter((e) => e.employee_id === cashierData.employee_id);

      // check if data already exist
      const cashierDataExist = state.cashier.find(
        (e) => e.employee_id === cashierData.employee_id
      );

      if (!cashierDataExist) {
        return {
          ...state,
          cashier: [...state.cashier, cashierData],
        };
      }

      // find index of each data
      const cashierDataIndex = state.cashier.findIndex(
        (e) => e.employee_id === cashierData.employee_id
      );

      const cashierDataObj = state.cashier[cashierDataIndex];

      cashierDataObj.employee_image = cashierData.employee_image;
      cashierDataObj.email = cashierData.email;
      cashierDataObj.position = cashierData.position;
      cashierDataObj.height = cashierData.height;
      cashierDataObj.weight = cashierData.weight;
      cashierDataObj.civil_status = cashierData.civil_status;
      cashierDataObj.spouce_fullname = cashierData.spouce_fullname;
      cashierDataObj.spouce_birthday = cashierData.spouce_birthday;
      cashierDataObj.spouce_contact_number = cashierData.spouce_contact_number;
      cashierDataObj.address = cashierData.address;
      cashierDataObj.language = cashierData.language;
      cashierDataObj.hobbies = cashierData.hobbies;
      cashierDataObj.skills = cashierData.skills;

      return {
        ...state,
        cashier: [...state.cashier],
      };
    // -------------------- clinic ---------------------
    case "CLINIC":
      const clinicData = action.payload.departmentPayload;

      state.clinic.filter((e) => e.employee_id === clinicData.employee_id);

      // check if data already exist
      const clinicDataExist = state.clinic.find(
        (e) => e.employee_id === clinicData.employee_id
      );

      if (!clinicDataExist) {
        return {
          ...state,
          clinic: [...state.clinic, clinicData],
        };
      }

      // find index of each data
      const clinicDataIndex = state.clinic.findIndex(
        (e) => e.employee_id === clinicData.employee_id
      );

      const clinicDataObj = state.clinic[clinicDataIndex];

      clinicDataObj.employee_image = clinicData.employee_image;
      clinicDataObj.email = clinicData.email;
      clinicDataObj.position = clinicData.position;
      clinicDataObj.height = clinicData.height;
      clinicDataObj.weight = clinicData.weight;
      clinicDataObj.civil_status = clinicData.civil_status;
      clinicDataObj.spouce_fullname = clinicData.spouce_fullname;
      clinicDataObj.spouce_birthday = clinicData.spouce_birthday;
      clinicDataObj.spouce_contact_number = clinicData.spouce_contact_number;
      clinicDataObj.address = clinicData.address;
      clinicDataObj.language = clinicData.language;
      clinicDataObj.hobbies = clinicData.hobbies;
      clinicDataObj.skills = clinicData.skills;

      return {
        ...state,
        clinic: [...state.clinic],
      };
    // -------------------- communications ---------------------
    case "COMMUNICATIONS":
      const communicationsData = action.payload.departmentPayload;

      state.communications.filter(
        (e) => e.employee_id === communicationsData.employee_id
      );

      // check if data already exist
      const communicationsDataExist = state.communications.find(
        (e) => e.employee_id === communicationsData.employee_id
      );

      if (!communicationsDataExist) {
        return {
          ...state,
          communications: [...state.communications, communicationsData],
        };
      }

      // find index of each data
      const communicationsDataIndex = state.communications.findIndex(
        (e) => e.employee_id === communicationsData.employee_id
      );

      const communicationsDataObj =
        state.communications[communicationsDataIndex];

      communicationsDataObj.employee_image = communicationsData.employee_image;
      communicationsDataObj.email = communicationsData.email;
      communicationsDataObj.position = communicationsData.position;
      communicationsDataObj.height = communicationsData.height;
      communicationsDataObj.weight = communicationsData.weight;
      communicationsDataObj.civil_status = communicationsData.civil_status;
      communicationsDataObj.spouce_fullname =
        communicationsData.spouce_fullname;
      communicationsDataObj.spouce_birthday =
        communicationsData.spouce_birthday;
      communicationsDataObj.spouce_contact_number =
        communicationsData.spouce_contact_number;
      communicationsDataObj.address = communicationsData.address;
      communicationsDataObj.language = communicationsData.language;
      communicationsDataObj.hobbies = communicationsData.hobbies;
      communicationsDataObj.skills = communicationsData.skills;

      return {
        ...state,
        communications: [...state.communications],
      };
    // -------------------- construction ---------------------
    case "CONSTRUCTION":
      const constructionData = action.payload.departmentPayload;

      state.construction.filter(
        (e) => e.employee_id === constructionData.employee_id
      );

      // check if data already exist
      const constructionDataExist = state.construction.find(
        (e) => e.employee_id === constructionData.employee_id
      );

      if (!constructionDataExist) {
        return {
          ...state,
          construction: [...state.construction, constructionData],
        };
      }

      // find index of each data
      const constructionDataIndex = state.construction.findIndex(
        (e) => e.employee_id === constructionData.employee_id
      );

      const constructionDataObj = state.construction[constructionDataIndex];

      constructionDataObj.employee_image = constructionData.employee_image;
      constructionDataObj.email = constructionData.email;
      constructionDataObj.position = constructionData.position;
      constructionDataObj.height = constructionData.height;
      constructionDataObj.weight = constructionData.weight;
      constructionDataObj.civil_status = constructionData.civil_status;
      constructionDataObj.spouce_fullname = constructionData.spouce_fullname;
      constructionDataObj.spouce_birthday = constructionData.spouce_birthday;
      constructionDataObj.spouce_contact_number =
        constructionData.spouce_contact_number;
      constructionDataObj.address = constructionData.address;
      constructionDataObj.language = constructionData.language;
      constructionDataObj.hobbies = constructionData.hobbies;
      constructionDataObj.skills = constructionData.skills;

      return {
        ...state,
        construction: [...state.construction],
      };
    // -------------------- engineering ---------------------
    case "ENGINEERING":
      const engineeringData = action.payload.departmentPayload;

      state.engineering.filter(
        (e) => e.employee_id === engineeringData.employee_id
      );

      // check if data already exist
      const engineeringDataExist = state.engineering.find(
        (e) => e.employee_id === engineeringData.employee_id
      );

      if (!engineeringDataExist) {
        return {
          ...state,
          engineering: [...state.engineering, engineeringData],
        };
      }

      // find index of each data
      const engineeringDataIndex = state.engineering.findIndex(
        (e) => e.employee_id === engineeringData.employee_id
      );

      const engineeringDataObj = state.engineering[engineeringDataIndex];

      engineeringDataObj.employee_image = engineeringData.employee_image;
      engineeringDataObj.email = engineeringData.email;
      engineeringDataObj.position = engineeringData.position;
      engineeringDataObj.height = engineeringData.height;
      engineeringDataObj.weight = engineeringData.weight;
      engineeringDataObj.civil_status = engineeringData.civil_status;
      engineeringDataObj.spouce_fullname = engineeringData.spouce_fullname;
      engineeringDataObj.spouce_birthday = engineeringData.spouce_birthday;
      engineeringDataObj.spouce_contact_number =
        engineeringData.spouce_contact_number;
      engineeringDataObj.address = engineeringData.address;
      engineeringDataObj.language = engineeringData.language;
      engineeringDataObj.hobbies = engineeringData.hobbies;
      engineeringDataObj.skills = engineeringData.skills;

      return {
        ...state,
        engineering: [...state.engineering],
      };
    // -------------------- fabrication ---------------------
    case "FABRICATION":
      const fabricationData = action.payload.departmentPayload;

      state.fabrication.filter(
        (e) => e.employee_id === fabricationData.employee_id
      );

      // check if data already exist
      const fabricationDataExist = state.fabrication.find(
        (e) => e.employee_id === fabricationData.employee_id
      );

      if (!fabricationDataExist) {
        return {
          ...state,
          fabrication: [...state.fabrication, fabricationData],
        };
      }

      // find index of each data
      const fabricationDataIndex = state.fabrication.findIndex(
        (e) => e.employee_id === fabricationData.employee_id
      );

      const fabricationDataObj = state.fabrication[fabricationDataIndex];

      fabricationDataObj.employee_image = fabricationData.employee_image;
      fabricationDataObj.email = fabricationData.email;
      fabricationDataObj.position = fabricationData.position;
      fabricationDataObj.height = fabricationData.height;
      fabricationDataObj.weight = fabricationData.weight;
      fabricationDataObj.civil_status = fabricationData.civil_status;
      fabricationDataObj.spouce_fullname = fabricationData.spouce_fullname;
      fabricationDataObj.spouce_birthday = fabricationData.spouce_birthday;
      fabricationDataObj.spouce_contact_number =
        fabricationData.spouce_contact_number;
      fabricationDataObj.address = fabricationData.address;
      fabricationDataObj.language = fabricationData.language;
      fabricationDataObj.hobbies = fabricationData.hobbies;
      fabricationDataObj.skills = fabricationData.skills;

      return {
        ...state,
        fabrication: [...state.fabrication],
      };
    // -------------------- gmsd ---------------------
    case "GMSD":
      const gmsdData = action.payload.departmentPayload;

      state.gmsd.filter((e) => e.employee_id === gmsdData.employee_id);

      // check if data already exist
      const gmsdDataExist = state.gmsd.find(
        (e) => e.employee_id === gmsdData.employee_id
      );

      if (!gmsdDataExist) {
        return {
          ...state,
          gmsd: [...state.gmsd, gmsdData],
        };
      }

      // find index of each data
      const gmsdDataIndex = state.gmsd.findIndex(
        (e) => e.employee_id === gmsdData.employee_id
      );

      const gmsdDataObj = state.gmsd[gmsdDataIndex];

      gmsdDataObj.employee_image = gmsdData.employee_image;
      gmsdDataObj.email = gmsdData.email;
      gmsdDataObj.position = gmsdData.position;
      gmsdDataObj.height = gmsdData.height;
      gmsdDataObj.weight = gmsdData.weight;
      gmsdDataObj.civil_status = gmsdData.civil_status;
      gmsdDataObj.spouce_fullname = gmsdData.spouce_fullname;
      gmsdDataObj.spouce_birthday = gmsdData.spouce_birthday;
      gmsdDataObj.spouce_contact_number = gmsdData.spouce_contact_number;
      gmsdDataObj.address = gmsdData.address;
      gmsdDataObj.language = gmsdData.language;
      gmsdDataObj.hobbies = gmsdData.hobbies;
      gmsdDataObj.skills = gmsdData.skills;

      return {
        ...state,
        gmsd: [...state.gmsd],
      };
    // -------------------- motorpool ---------------------
    case "MOTORPOOL":
      const motorpoolData = action.payload.departmentPayload;

      state.motorpool.filter(
        (e) => e.employee_id === motorpoolData.employee_id
      );

      // check if data already exist
      const motorpoolDataExist = state.motorpool.find(
        (e) => e.employee_id === motorpoolData.employee_id
      );

      if (!motorpoolDataExist) {
        return {
          ...state,
          motorpool: [...state.motorpool, motorpoolData],
        };
      }

      // find index of each data
      const motorpoolDataIndex = state.motorpool.findIndex(
        (e) => e.employee_id === motorpoolData.employee_id
      );

      const motorpoolDataObj = state.motorpool[motorpoolDataIndex];

      motorpoolDataObj.employee_image = motorpoolData.employee_image;
      motorpoolDataObj.email = motorpoolData.email;
      motorpoolDataObj.position = motorpoolData.position;
      motorpoolDataObj.height = motorpoolData.height;
      motorpoolDataObj.weight = motorpoolData.weight;
      motorpoolDataObj.civil_status = motorpoolData.civil_status;
      motorpoolDataObj.spouce_fullname = motorpoolData.spouce_fullname;
      motorpoolDataObj.spouce_birthday = motorpoolData.spouce_birthday;
      motorpoolDataObj.spouce_contact_number =
        motorpoolData.spouce_contact_number;
      motorpoolDataObj.address = motorpoolData.address;
      motorpoolDataObj.language = motorpoolData.language;
      motorpoolDataObj.hobbies = motorpoolData.hobbies;
      motorpoolDataObj.skills = motorpoolData.skills;

      return {
        ...state,
        motorpool: [...state.motorpool],
      };
    // -------------------- human resource ---------------------
    case "HUMAN RESOURCE":
      const humanResourceData = action.payload.departmentPayload;

      state.humanresource.filter(
        (e) => e.employee_id === humanResourceData.employee_id
      );

      // check if data already exist
      const humanResourceDataExist = state.humanresource.find(
        (e) => e.employee_id === humanResourceData.employee_id
      );

      if (!humanResourceDataExist) {
        return {
          ...state,
          humanresource: [...state.humanresource, humanResourceData],
        };
      }

      // find index of each data
      const humanResourceDataIndex = state.humanresource.findIndex(
        (e) => e.employee_id === humanResourceData.employee_id
      );

      const humanResourceDataObj = state.humanresource[humanResourceDataIndex];

      humanResourceDataObj.employee_image = humanResourceData.employee_image;
      humanResourceDataObj.email = humanResourceData.email;
      humanResourceDataObj.position = humanResourceData.position;
      humanResourceDataObj.height = humanResourceData.height;
      humanResourceDataObj.weight = humanResourceData.weight;
      humanResourceDataObj.civil_status = humanResourceData.civil_status;
      humanResourceDataObj.spouce_fullname = humanResourceData.spouce_fullname;
      humanResourceDataObj.spouce_birthday = humanResourceData.spouce_birthday;
      humanResourceDataObj.spouce_contact_number =
        humanResourceData.spouce_contact_number;
      humanResourceDataObj.address = humanResourceData.address;
      humanResourceDataObj.language = humanResourceData.language;
      humanResourceDataObj.hobbies = humanResourceData.hobbies;
      humanResourceDataObj.skills = humanResourceData.skills;

      return {
        ...state,
        humanresource: [...state.humanresource],
      };
    // -------------------- marketing ---------------------
    case "MARKETING":
      const marketingData = action.payload.departmentPayload;

      state.marketing.filter(
        (e) => e.employee_id === marketingData.employee_id
      );

      // check if data already exist
      const marketingDataExist = state.marketing.find(
        (e) => e.employee_id === marketingData.employee_id
      );

      if (!marketingDataExist) {
        return {
          ...state,
          marketing: [...state.marketing, marketingData],
        };
      }

      // find index of each data
      const marketingDataIndex = state.marketing.findIndex(
        (e) => e.employee_id === marketingData.employee_id
      );

      const marketingDataObj = state.marketing[marketingDataIndex];

      marketingDataObj.employee_image = marketingData.employee_image;
      marketingDataObj.email = marketingData.email;
      marketingDataObj.position = marketingData.position;
      marketingDataObj.height = marketingData.height;
      marketingDataObj.weight = marketingData.weight;
      marketingDataObj.civil_status = marketingData.civil_status;
      marketingDataObj.spouce_fullname = marketingData.spouce_fullname;
      marketingDataObj.spouce_birthday = marketingData.spouce_birthday;
      marketingDataObj.spouce_contact_number =
        marketingData.spouce_contact_number;
      marketingDataObj.address = marketingData.address;
      marketingDataObj.language = marketingData.language;
      marketingDataObj.hobbies = marketingData.hobbies;
      marketingDataObj.skills = marketingData.skills;

      return {
        ...state,
        marketing: [...state.marketing],
      };
    // -------------------- I.T ---------------------
    case "I.T":
      const itData = action.payload.departmentPayload;

      state.it.filter((e) => e.employee_id === itData.employee_id);

      // check if data already exist
      const itDataExist = state.it.find(
        (e) => e.employee_id === itData.employee_id
      );

      if (!itDataExist) {
        return {
          ...state,
          it: [...state.it, itData],
        };
      }

      // find index of each data
      const itDataIndex = state.it.findIndex(
        (e) => e.employee_id === itData.employee_id
      );

      const itDataObj = state.it[itDataIndex];

      itDataObj.employee_image = itData.employee_image;
      itDataObj.email = itData.email;
      itDataObj.position = itData.position;
      itDataObj.height = itData.height;
      itDataObj.weight = itData.weight;
      itDataObj.civil_status = itData.civil_status;
      itDataObj.spouce_fullname = itData.spouce_fullname;
      itDataObj.spouce_birthday = itData.spouce_birthday;
      itDataObj.spouce_contact_number = itData.spouce_contact_number;
      itDataObj.address = itData.address;
      itDataObj.language = itData.language;
      itDataObj.hobbies = itData.hobbies;
      itDataObj.skills = itData.skills;

      return {
        ...state,
        it: [...state.it],
      };
    // -------------------- operations ---------------------
    case "OPERATIONS":
      const operationsData = action.payload.departmentPayload;

      state.operations.filter(
        (e) => e.employee_id === operationsData.employee_id
      );

      // check if data already exist
      const operationsDataExist = state.operations.find(
        (e) => e.employee_id === operationsData.employee_id
      );

      if (!operationsDataExist) {
        return {
          ...state,
          operations: [...state.operations, operationsData],
        };
      }

      // find index of each data
      const operationsDataIndex = state.operations.findIndex(
        (e) => e.employee_id === operationsData.employee_id
      );

      const operationsDataObj = state.operations[operationsDataIndex];

      operationsDataObj.employee_image = operationsData.employee_image;
      operationsDataObj.email = operationsData.email;
      operationsDataObj.position = operationsData.position;
      operationsDataObj.height = operationsData.height;
      operationsDataObj.weight = operationsData.weight;
      operationsDataObj.civil_status = operationsData.civil_status;
      operationsDataObj.spouce_fullname = operationsData.spouce_fullname;
      operationsDataObj.spouce_birthday = operationsData.spouce_birthday;
      operationsDataObj.spouce_contact_number =
        operationsData.spouce_contact_number;
      operationsDataObj.address = operationsData.address;
      operationsDataObj.language = operationsData.language;
      operationsDataObj.hobbies = operationsData.hobbies;
      operationsDataObj.skills = operationsData.skills;

      return {
        ...state,
        operations: [...state.operations],
      };
    // -------------------- ppc ---------------------
    case "PPC":
      const ppcData = action.payload.departmentPayload;

      state.ppc.filter((e) => e.employee_id === ppcData.employee_id);

      // check if data already exist
      const ppcDataExist = state.ppc.find(
        (e) => e.employee_id === ppcData.employee_id
      );

      if (!ppcDataExist) {
        return {
          ...state,
          ppc: [...state.ppc, ppcData],
        };
      }

      // find index of each data
      const ppcDataIndex = state.ppc.findIndex(
        (e) => e.employee_id === ppcData.employee_id
      );

      const ppcDataObj = state.ppc[ppcDataIndex];

      ppcDataObj.employee_image = ppcData.employee_image;
      ppcDataObj.email = ppcData.email;
      ppcDataObj.position = ppcData.position;
      ppcDataObj.height = ppcData.height;
      ppcDataObj.weight = ppcData.weight;
      ppcDataObj.civil_status = ppcData.civil_status;
      ppcDataObj.spouce_fullname = ppcData.spouce_fullname;
      ppcDataObj.spouce_birthday = ppcData.spouce_birthday;
      ppcDataObj.spouce_contact_number = ppcData.spouce_contact_number;
      ppcDataObj.address = ppcData.address;
      ppcDataObj.language = ppcData.language;
      ppcDataObj.hobbies = ppcData.hobbies;
      ppcDataObj.skills = ppcData.skills;

      return {
        ...state,
        ppc: [...state.ppc],
      };
    // -------------------- purchasing ---------------------
    case "PURCHASING":
      const purchasingData = action.payload.departmentPayload;

      state.purchasing.filter(
        (e) => e.employee_id === purchasingData.employee_id
      );

      // check if data already exist
      const purchasingDataExist = state.purchasing.find(
        (e) => e.employee_id === purchasingData.employee_id
      );

      if (!purchasingDataExist) {
        return {
          ...state,
          purchasing: [...state.purchasing, purchasingData],
        };
      }

      // find index of each data
      const purchasingDataIndex = state.purchasing.findIndex(
        (e) => e.employee_id === purchasingData.employee_id
      );

      const purchasingDataObj = state.purchasing[purchasingDataIndex];

      purchasingDataObj.employee_image = purchasingData.employee_image;
      purchasingDataObj.email = purchasingData.email;
      purchasingDataObj.position = purchasingData.position;
      purchasingDataObj.height = purchasingData.height;
      purchasingDataObj.weight = purchasingData.weight;
      purchasingDataObj.civil_status = purchasingData.civil_status;
      purchasingDataObj.spouce_fullname = purchasingData.spouce_fullname;
      purchasingDataObj.spouce_birthday = purchasingData.spouce_birthday;
      purchasingDataObj.spouce_contact_number =
        purchasingData.spouce_contact_number;
      purchasingDataObj.address = purchasingData.address;
      purchasingDataObj.language = purchasingData.language;
      purchasingDataObj.hobbies = purchasingData.hobbies;
      purchasingDataObj.skills = purchasingData.skills;

      return {
        ...state,
        purchasing: [...state.purchasing],
      };
    // -------------------- qaqc ---------------------
    case "QAQC":
      const qaqcData = action.payload.departmentPayload;

      state.qaqc.filter((e) => e.employee_id === qaqcData.employee_id);

      // check if data already exist
      const qaqcDataExist = state.qaqc.find(
        (e) => e.employee_id === qaqcData.employee_id
      );

      if (!qaqcDataExist) {
        return {
          ...state,
          qaqc: [...state.qaqc, qaqcData],
        };
      }

      // find index of each data
      const qaqcDataIndex = state.purchasing.findIndex(
        (e) => e.employee_id === qaqcData.employee_id
      );

      const qaqcDataObj = state.purchasing[qaqcDataIndex];

      qaqcDataObj.employee_image = qaqcData.employee_image;
      qaqcDataObj.email = qaqcData.email;
      qaqcDataObj.position = qaqcData.position;
      qaqcDataObj.height = qaqcData.height;
      qaqcDataObj.weight = qaqcData.weight;
      qaqcDataObj.civil_status = qaqcData.civil_status;
      qaqcDataObj.spouce_fullname = qaqcData.spouce_fullname;
      qaqcDataObj.spouce_birthday = qaqcData.spouce_birthday;
      qaqcDataObj.spouce_contact_number = qaqcData.spouce_contact_number;
      qaqcDataObj.address = qaqcData.address;
      qaqcDataObj.language = qaqcData.language;
      qaqcDataObj.hobbies = qaqcData.hobbies;
      qaqcDataObj.skills = qaqcData.skills;

      return {
        ...state,
        purchasing: [...state.purchasing],
      };
    // -------------------- warehouse ---------------------
    case "WAREHOUSE":
      const warehouseData = action.payload.departmentPayload;

      state.warehouse.filter(
        (e) => e.employee_id === warehouseData.employee_id
      );

      // check if data already exist
      const warehouseDataExist = state.warehouse.find(
        (e) => e.employee_id === warehouseData.employee_id
      );

      if (!warehouseDataExist) {
        return {
          ...state,
          warehouse: [...state.warehouse, warehouseData],
        };
      }

      // find index of each data
      const warehouseDataIndex = state.warehouse.findIndex(
        (e) => e.employee_id === warehouseData.employee_id
      );

      const warehouseDataObj = state.warehouse[warehouseDataIndex];

      warehouseDataObj.employee_image = warehouseData.employee_image;
      warehouseDataObj.email = warehouseData.email;
      warehouseDataObj.position = warehouseData.position;
      warehouseDataObj.height = warehouseData.height;
      warehouseDataObj.weight = warehouseData.weight;
      warehouseDataObj.civil_status = warehouseData.civil_status;
      warehouseDataObj.spouce_fullname = warehouseData.spouce_fullname;
      warehouseDataObj.spouce_birthday = warehouseData.spouce_birthday;
      warehouseDataObj.spouce_contact_number =
        warehouseData.spouce_contact_number;
      warehouseDataObj.address = warehouseData.address;
      warehouseDataObj.language = warehouseData.language;
      warehouseDataObj.hobbies = warehouseData.hobbies;
      warehouseDataObj.skills = warehouseData.skills;

      return {
        ...state,
        warehouse: [...state.warehouse],
      };
    // -------------------- finishing ---------------------
    case "FINISHING":
      const finishingData = action.payload.departmentPayload;

      state.finishing.filter(
        (e) => e.employee_id === finishingData.employee_id
      );

      // check if data already exist
      const finishingDataExist = state.finishing.find(
        (e) => e.employee_id === finishingData.employee_id
      );

      if (!finishingDataExist) {
        return {
          ...state,
          finishing: [...state.finishing, finishingData],
        };
      }

      // find index of each data
      const finishingDataIndex = state.finishing.findIndex(
        (e) => e.employee_id === finishingData.employee_id
      );

      const finishingDataObj = state.finishing[finishingDataIndex];

      finishingDataObj.employee_image = finishingData.employee_image;
      finishingDataObj.email = finishingData.email;
      finishingDataObj.position = finishingData.position;
      finishingDataObj.height = finishingData.height;
      finishingDataObj.weight = finishingData.weight;
      finishingDataObj.civil_status = finishingData.civil_status;
      finishingDataObj.spouce_fullname = finishingData.spouce_fullname;
      finishingDataObj.spouce_birthday = finishingData.spouce_birthday;
      finishingDataObj.spouce_contact_number =
        finishingData.spouce_contact_number;
      finishingDataObj.address = finishingData.address;
      finishingDataObj.language = finishingData.language;
      finishingDataObj.hobbies = finishingData.hobbies;
      finishingDataObj.skills = finishingData.skills;

      return {
        ...state,
        finishing: [...state.finishing],
      };
    // -------------------- security ---------------------
    case "SECURITY":
      const securityData = action.payload.departmentPayload;

      state.security.filter((e) => e.employee_id === securityData.employee_id);

      // check if data already exist
      const securityDataExist = state.security.find(
        (e) => e.employee_id === securityData.employee_id
      );

      if (!securityDataExist) {
        return {
          ...state,
          security: [...state.security, securityData],
        };
      }

      // find index of each data
      const securityDataIndex = state.security.findIndex(
        (e) => e.employee_id === securityData.employee_id
      );

      const securityDataObj = state.security[securityDataIndex];

      securityDataObj.employee_image = securityData.employee_image;
      securityDataObj.email = securityData.email;
      securityDataObj.position = securityData.position;
      securityDataObj.height = securityData.height;
      securityDataObj.weight = securityData.weight;
      securityDataObj.civil_status = securityData.civil_status;
      securityDataObj.spouce_fullname = securityData.spouce_fullname;
      securityDataObj.spouce_birthday = securityData.spouce_birthday;
      securityDataObj.spouce_contact_number =
        securityData.spouce_contact_number;
      securityDataObj.address = securityData.address;
      securityDataObj.language = securityData.language;
      securityDataObj.hobbies = securityData.hobbies;
      securityDataObj.skills = securityData.skills;

      return {
        ...state,
        security: [...state.security],
      };
    // -------------------- suites ---------------------
    case "SUITES":
      const suitesData = action.payload.departmentPayload;

      state.suites.filter((e) => e.employee_id === suitesData.employee_id);

      // check if data already exist
      const suitesDataExist = state.suites.find(
        (e) => e.employee_id === suitesData.employee_id
      );

      if (!suitesDataExist) {
        return {
          ...state,
          suites: [...state.suites, suitesData],
        };
      }

      // find index of each data
      const suitesDataIndex = state.suites.findIndex(
        (e) => e.employee_id === suitesData.employee_id
      );

      const suitesDataObj = state.suites[suitesDataIndex];

      suitesDataObj.employee_image = suitesData.employee_image;
      suitesDataObj.email = suitesData.email;
      suitesDataObj.position = suitesData.position;
      suitesDataObj.height = suitesData.height;
      suitesDataObj.weight = suitesData.weight;
      suitesDataObj.civil_status = suitesData.civil_status;
      suitesDataObj.spouce_fullname = suitesData.spouce_fullname;
      suitesDataObj.spouce_birthday = suitesData.spouce_birthday;
      suitesDataObj.spouce_contact_number = suitesData.spouce_contact_number;
      suitesDataObj.address = suitesData.address;
      suitesDataObj.language = suitesData.language;
      suitesDataObj.hobbies = suitesData.hobbies;
      suitesDataObj.skills = suitesData.skills;

      return {
        ...state,
        suites: [...state.suites],
      };

    // --------------- update department ----------------
    case "UPDATE PRESIDENTSOFFICE":
      const presidentsofficeDepartmentData =
        action.payload.departmentEmployeeId;

      return {
        ...state,
        presidentsoffice: state.presidentsoffice.filter(
          (e) => e.employee_id !== presidentsofficeDepartmentData
        ),
      };

    case "UPDATE ADMINISTRATION":
      const administrationDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        administration: state.administration.filter(
          (e) => e.employee_id !== administrationDepartmentData
        ),
      };
    case "UPDATE AUDITING":
      const auditingDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        auditing: state.auditing.filter(
          (e) => e.employee_id !== auditingDepartmentData
        ),
      };

    case "UPDATE CASHIER":
      const cashierDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        cashier: state.cashier.filter(
          (e) => e.employee_id !== cashierDepartmentData
        ),
      };

    case "UPDATE CLINIC":
      const clinicDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        clinic: state.clinic.filter(
          (e) => e.employee_id !== clinicDepartmentData
        ),
      };

    case "UPDATE COMMUNICATIONS":
      const communicationsDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        communications: state.communications.filter(
          (e) => e.employee_id !== communicationsDepartmentData
        ),
      };

    case "UPDATE CONSTRUCTION":
      const ConstructionDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        construction: state.construction.filter(
          (e) => e.employee_id !== ConstructionDepartmentData
        ),
      };

    case "UPDATE ENGINEERING":
      const engineeringDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        engineering: state.engineering.filter(
          (e) => e.employee_id !== engineeringDepartmentData
        ),
      };

    case "UPDATE FABRICATION":
      const fabricationDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        fabrication: state.fabrication.filter(
          (e) => e.employee_id !== fabricationDepartmentData
        ),
      };

    case "UPDATE GMSD":
      const gmsdDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        gmsd: state.gmsd.filter((e) => e.employee_id !== gmsdDepartmentData),
      };

    case "UPDATE MOTORPOOL":
      const motorpoolDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        motorpool: state.motorpool.filter(
          (e) => e.employee_id !== motorpoolDepartmentData
        ),
      };

    case "UPDATE HUMANRESOURCE":
      const humanresourceDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        humanresource: state.humanresource.filter(
          (e) => e.employee_id !== humanresourceDepartmentData
        ),
      };

    case "UPDATE MARKETING":
      const marketingDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        marketing: state.marketing.filter(
          (e) => e.employee_id !== marketingDepartmentData
        ),
      };

    case "UPDATE IT":
      const itDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        it: state.it.filter((e) => e.employee_id !== itDepartmentData),
      };

    case "UPDATE OPERATIONS":
      const operationsDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        operations: state.operations.filter(
          (e) => e.employee_id !== operationsDepartmentData
        ),
      };

    case "UPDATE PPC":
      const ppcDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        ppc: state.ppc.filter((e) => e.employee_id !== ppcDepartmentData),
      };

    case "UPDATE PURCHASING":
      const purchasingDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        purchasing: state.purchasing.filter(
          (e) => e.employee_id !== purchasingDepartmentData
        ),
      };

    case "UPDATE QAQC":
      const qaqcDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        qaqc: state.qaqc.filter((e) => e.employee_id !== qaqcDepartmentData),
      };

    case "UPDATE WAREHOUSE":
      const warehouseDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        warehouse: state.warehouse.filter(
          (e) => e.employee_id !== warehouseDepartmentData
        ),
      };

    case "UPDATE FINISHING":
      const finishingDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        finishing: state.finishing.filter(
          (e) => e.employee_id !== finishingDepartmentData
        ),
      };

    case "UPDATE SECURITY":
      const securityDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        security: state.security.filter(
          (e) => e.employee_id !== securityDepartmentData
        ),
      };

    case "UPDATE SUITES":
      const suitesDepartmentData = action.payload.departmentEmployeeId;

      return {
        ...state,
        suites: state.suites.filter(
          (e) => e.employee_id !== suitesDepartmentData
        ),
      };

    default:
      return state;
  }
};
