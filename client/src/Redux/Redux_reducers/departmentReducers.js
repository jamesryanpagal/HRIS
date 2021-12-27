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
      presidentDataObj.position = presidentData.position;

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
      administrationDataObj.position = administrationData.position;

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
      auditingDataObj.position = auditingData.position;

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
      cashierDataObj.position = cashierData.position;

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
      clinicDataObj.position = clinicData.position;

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
      communicationsDataObj.position = communicationsData.position;

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
      constructionDataObj.position = constructionData.position;

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
      engineeringDataObj.position = engineeringData.position;

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
      fabricationDataObj.position = fabricationData.position;

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
      gmsdDataObj.position = gmsdData.position;

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
      motorpoolDataObj.position = motorpoolData.position;

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
      humanResourceDataObj.position = humanResourceData.position;

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
      marketingDataObj.position = marketingData.position;

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
      itDataObj.position = itData.position;

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
      operationsDataObj.position = operationsData.position;

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
      ppcDataObj.position = ppcData.position;

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
      purchasingDataObj.position = purchasingData.position;

      return {
        ...state,
        purchasing: [...state.purchasing],
      };
    // -------------------- qaqc ---------------------
    case "QA/QC":
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
      const qaqcDataIndex = state.qaqc.findIndex(
        (e) => e.employee_id === qaqcData.employee_id
      );

      const qaqcDataObj = state.qaqc[qaqcDataIndex];

      qaqcDataObj.employee_image = qaqcData.employee_image;
      qaqcDataObj.position = qaqcData.position;

      return {
        ...state,
        qaqc: [...state.qaqc],
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
      warehouseDataObj.position = warehouseData.position;

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
      finishingDataObj.position = finishingData.position;

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
      securityDataObj.position = securityData.position;

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
      suitesDataObj.position = suitesData.position;

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

    case "UPDATE I.T":
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

    case "UPDATE QA/QC":
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
