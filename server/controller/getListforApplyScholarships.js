const { Scholarship } = require("../models");

const getListforApplyscholarships = async (req, res) => {
  console.log("Reached getListforApplyScholarships");

  try {
    const scholarships = await Scholarship.find({})
      .select('scholarship_id scholarship_name end_date amount')
      .lean();

    // Transform MongoDB _id to scholarship_id for frontend compatibility
    const transformedScholarships = scholarships.map(scholarship => ({
      scholarship_id: scholarship._id,
      scholarship_name: scholarship.scholarship_name,
      end_date: scholarship.end_date,
      amount: scholarship.amount
    }));

    res.status(200).json(transformedScholarships);
  } catch (error) {
    console.error("Error getting scholarship list:", error);
    res.status(500).json({
      errMsg: "Internal Server Error",
    });
  }
};

module.exports = { getListforApplyscholarships };
