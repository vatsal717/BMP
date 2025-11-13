const express = require("express");
const { addScholarship } = require("../controller/addScholarship");
const { getScholarships } = require("../controller/getScholarships");
const { deleteScholarship } = require("../controller/deleteScholarship");
const { editScholarship } = require("../controller/editScholarship");
const { getScholarship } = require("../controller/getScholarship");
const {
  getApplicantsByScholarshipId,
} = require("../controller/ApplicantController");
const protect = require("../middleware/authMiddleware");
const { getApplicantData } = require("../controller/getApplicantsData");
const { statusUpdate } = require("../controller/statusUpdate");

const router = express.Router();

// router.route("/getApplicantData").get(protect,getApplicantData);
// router.route("/statusUpdate").put(protect,statusUpdate);

// router.route("/addScholarship").post(protect,addScholarship);
// router.route("/getScholarships").get(protect,getScholarships);
// router.route("/:scholarship_id").get(protect,getScholarship);
// router.route("/editScholarship/:scholarship_id").put(protect,editScholarship);
// router.route("/deleteScholarship/:scholarship_id").delete(protect,deleteScholarship);

router.route("/getApplicantData").get(protect, getApplicantData);
router.route("/statusUpdate").put(protect, statusUpdate);

router.route("/addScholarship").post(protect, addScholarship);
router.route("/getScholarships").get(protect, getScholarships);
router.route("/:scholarship_id").get(protect, getScholarship);
router.route("/editScholarship/:scholarship_id").put(protect, editScholarship);
router
  .route("/deleteScholarship/:scholarship_id")
  .delete(protect, deleteScholarship);
router.route("/:id/applicants").get(getApplicantsByScholarshipId);

module.exports = router;
