const express = require("express");
const { registerUser } = require("../controller/registerUser");
const { authUser, authRole } = require("../controller/authUser");
const protect = require("../middleware/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controller/getUserProfile");
const { getListOfScholarships } = require("../controller/ApplicantController");

//client side
const { handelemail } = require("../controller/handelemail");
const { fetchprofile } = require("../controller/fetchprofile");
const { handelprofiledata } = require("../controller/userprofile");
const { handeluploads } = require("../controller/uploadpdfs");

const upload = require("../config/multer");
const {
  getListforApplyscholarships,
} = require("../controller/getListforApplyScholarships");
const { applyForScholarship } = require("../controller/applyForScholarship");
const { getScholarship } = require("../controller/getScholarship");
const { getApplicantId } = require("../controller/getApplicantId");
const { handelpdfurls } = require("../controller/handelpdfurls");
const { handelclearpdf } = require("../controller/handelclearpdf");

const {
  getAppliedScholarships,
} = require("../controller/getAppliedScholarships");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/authRole").post(authRole);

router.get("/getuserprofile", getUserProfile);
router.get("/getApplicantId", getApplicantId);

router.route("/updateuserprofile").post(updateUserProfile);
router.route("/viewscholarship/:scholarship_id").get(getScholarship);
router.route("/getlistofscholarships").get(getListOfScholarships);
router.route("/getlistforApplyscholarships").get(getListforApplyscholarships);
router.route("/applyForScholarship/:scholarship_id").post(applyForScholarship);
router.route("/getAppliedScholarships").get(getAppliedScholarships);

//client side
router.get("/getemail/:email", handelemail);
router.get("/getprofile/:email", fetchprofile);
router.get("/getpdfurls/:email", handelpdfurls);
router.post("/profile", handelprofiledata);
router.post("/clearpdf/:email/:id", handelclearpdf);
router.post("/pdf/:email/:key", upload.single("file"), handeluploads);

module.exports = router;
