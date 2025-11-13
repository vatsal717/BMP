const mongoose = require("mongoose");
const { Application } = require("../models");

const statusUpdate = async (req, res) => {
  console.log("Reached statusUpdate");
  console.log(req.body);

  const { applicant_id, scholarship_id, statusToUpdate } = req.body;

  console.log(applicant_id, scholarship_id, statusToUpdate);

  try {
    const application = await Application.findOneAndUpdate(
      { 
        applicant_id: new mongoose.Types.ObjectId(applicant_id),  
        scholarship_id: new mongoose.Types.ObjectId(scholarship_id) 
        
      },
      { 
        status: statusToUpdate.toLowerCase() 
      },
      { new: true }
    );

    console.log(application);

    if (!application) {
      return res.status(404).json({ 
        errMsg: "Application not found" 
      });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ errMsg: "Internal Server Error" });
  }
};

module.exports = { statusUpdate };
