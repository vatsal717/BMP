const { Scholarship } = require("../models");

const getScholarship = async (req, res) => {
  console.log("Reached getScholarship hooray\n");
  const s_id = req.params.scholarship_id;
  
  try {
    const scholarship = await Scholarship.findById(s_id);
    
    if (!scholarship) {
      return res.status(404).json({
        errMsg: "Scholarship not found"
      });
    }
    
    res.status(200).json(scholarship);
  } catch (error) {
    console.error("Error getting scholarship:", error.message);
    res.status(500).json({
      errMsg: "Internal Server Error",
    });
  }
};

module.exports = { getScholarship };
