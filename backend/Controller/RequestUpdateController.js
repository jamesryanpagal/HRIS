// --------- MODEL ---------
const RequestUpdate = require("../Model/RequestUpdateModel");
const GS_Users = require("../Model/Users_Model");

// create request
const createRequest = async (req, res) => {
  const { admin, adminImage, adminEmpNum } = req.body;
  const options = { new: true };
  try {
    // create request
    await RequestUpdate.create({
      Employee_number: adminEmpNum,
      Employee_image: adminImage,
      Username: admin,
    });

    // get admin
    const getUser = await GS_Users.findOne({
      Employee_number: adminEmpNum,
    });

    // set admin request to pending
    const setAdminRequestPending = await GS_Users.findByIdAndUpdate(
      getUser._id,
      { IsAuthorized: "Pending" },
      options
    );
    res.json(setAdminRequestPending);
  } catch (error) {
    res.json(error.message);
  }
};

// get request
const getRequest = async (req, res) => {
  try {
    const requests = await RequestUpdate.find();
    res.json(requests);
  } catch (error) {
    res.json(error.message);
  }
};

// authorized
const authorizedAdmin = async (req, res) => {
  const { id } = req.body;
  const options = { new: true };
  try {
    // get admin details
    const getAdmin = await GS_Users.findOne({ Employee_number: id });

    // authorized admin
    await GS_Users.findByIdAndUpdate(
      getAdmin._id,
      { IsAuthorized: "true" },
      options
    );

    // get request details
    const get_Request = await RequestUpdate.findOne({ Employee_number: id });

    // remove request
    const removeRequest = await RequestUpdate.findByIdAndDelete(
      get_Request._id
    );

    res.json(removeRequest);
  } catch (error) {
    res.json(error.message);
  }
};

// set to not authorized
const setToNotAuthorized = async (req, res) => {
  const { id } = req.body;
  const options = { new: true };
  try {
    // get admin details
    const getAdmin = await GS_Users.findOne({ Employee_number: id });

    // set admin to not authorized
    const setnotAuthorized = await GS_Users.findByIdAndUpdate(
      getAdmin._id,
      { IsAuthorized: "false" },
      options
    );
    res.json(setnotAuthorized);
  } catch (error) {
    res.json(error.message);
  }
};

// not authorized
const notAuthorized = async (req, res) => {
  const { id } = req.body;
  const options = { new: true };
  try {
    // get admin details
    const getAdmin = await GS_Users.findOne({ Employee_number: id });

    // set admin to not authorized
    await GS_Users.findByIdAndUpdate(
      getAdmin._id,
      { IsAuthorized: "false" },
      options
    );

    // get request details
    const getReq = await RequestUpdate.findOne({ Employee_number: id });

    // remove request
    const removeReq = await RequestUpdate.findByIdAndDelete(getReq._id);

    res.json(removeReq);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createRequest,
  getRequest,
  authorizedAdmin,
  setToNotAuthorized,
  notAuthorized,
};
