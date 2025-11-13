const { Application } = require("../models");

const applyForScholarship = async (req, res) => {
  console.log("Reached applyForScholarship");

  // Destructuring the request body
  const { scholarship_id, applicant_id, applied_date, status } = req.body;
  console.log("Okay ", scholarship_id, applicant_id, applied_date, status);
  
  // Input validation
  if (!scholarship_id || !applicant_id || !applied_date || !status) {
    console.error("Please Input all the Fields");
    return res.status(400).json("Please Input all the Fields");
  }

  try {
    const newApplication = new Application({
      scholarship_id,
      applicant_id,
      applied_date,
      status: status.toLowerCase()
    });

    const application = await newApplication.save();
    
    console.log(`Inserted Application into Scholarship: ${scholarship_id}`);
    res.status(200).json({
      message: "Application added successfully",
      scholarship_id,
    });
  } catch (error) {
    console.error("Error inserting Application:", error.message);
    
    // Handle duplicate key error (MongoDB equivalent of PostgreSQL unique constraint)
    if (error.code === 11000) {
      return res.status(500).json({
        errMsg: "Application already exists for this scholarship",
        errCode: 400,
      });
    }
    
    res.status(500).json({
      errMsg: "Internal Server Error",
    });
  }
};

module.exports = { applyForScholarship };
