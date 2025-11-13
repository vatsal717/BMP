const { Applicant, Application, ApplicantDocument } = require("../models");

const getApplicantData = async (req, res) => {
  console.log("Reached getApplicantData");

  const student_id = req.query.id;
  const scholarship_id = req.query.scholarship_id;

  try {
    const applicant = await Applicant.findById(student_id);
    
    if (!applicant) {
      return res.status(404).json({ 
        errMsg: "Applicant not found" 
      });
    }

    // Get application status for this scholarship
    const application = await Application.findOne({
      applicant_id: student_id,
      scholarship_id: scholarship_id
    });

    // Get applicant documents
    const documents = await ApplicantDocument.findOne({
      email: applicant.email
    });

    // Combine all data
    const applicantData = {
      ...applicant.toObject(),
      status: application ? application.status : null,
      documents: documents || {}
    };

    return res.status(200).json({ data: [applicantData] });
  } catch (error) {
    console.error("Error getting Applicants data:", error);
    return res.status(500).json({ errMsg: "Internal Server Error" });
  }
};

module.exports = { getApplicantData };
