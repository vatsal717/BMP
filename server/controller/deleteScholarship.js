const { Scholarship, Application } = require("../models");

const deleteScholarship = async (req, res) => {
  console.log("Reached deleteScholarship");

  const scholarship_id = req.params.scholarship_id;

  try {
    // First delete all applications for this scholarship
    await Application.deleteMany({ scholarship_id: scholarship_id });
    
    // Then delete the scholarship
    const scholarship = await Scholarship.findByIdAndDelete(scholarship_id);

    if (!scholarship) {
      console.error("Scholarship not found");
      return res.status(404).json("Scholarship not found");
    }

    console.log(`Deleted scholarship with ID: ${scholarship_id}`);
    res.status(200).json({
      message: "Scholarship deleted successfully",
      scholarship_id,
    });
  } catch (error) {
    console.error("Error deleting scholarship:", error.message);
    res.status(500).json({
      errMsg: "Internal Server Error",
    });
  }
};

module.exports = { deleteScholarship };
