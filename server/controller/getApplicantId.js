const { Applicant } = require("../models");

const getApplicantId = async (req, res) => {
  console.log("Reached getApplicant ID");

  const email = req.headers.email;

  try {
    const applicant = await Applicant.findOne({ email: email.toLowerCase() });
    
    if (!applicant) {
      return res.status(404).json({ 
        errMsg: "Applicant not found" 
      });
    }
    
    console.log(applicant);
    return res.status(200).json({ applicant: { applicant_id: applicant._id } });
  } catch (error) {
    console.error("Error getting Applicant ID:", error);
    return res.status(500).json({ errMsg: "Internal Server Error" });
  }
};

module.exports = { getApplicantId };
