const router = require("express").Router();

// Controller
const {
  createRequest,
  getRequest,
  authorizedAdmin,
  setToNotAuthorized,
  notAuthorized,
} = require("../Controller/RequestUpdateController");

// create request
router.route("/").post(createRequest);

// get request
router.route("/getRequest").get(getRequest);

// authorized admin
router.route("/authorized").post(authorizedAdmin);

// not authorized
router.route("/notauthorized").post(notAuthorized);

// back to not authorized
router.route("/setToNotAuthorized").post(setToNotAuthorized);

module.exports = router;
