const { Scholarship, Application } = require("../models");

const getScholarships = async (req, res) => {
  console.log("Reached getScholarships");

  try {
    const scholarships = await Scholarship.aggregate([
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "scholarship_id",
          as: "applications"
        }
      },
      {
        $project: {
          scholarship_id: "$_id",
          scholarship_name: 1,
          amount: 1,
          end_date: 1,
          applicants_count: { $size: "$applications" }
        }
      },
      {
        $sort: { applicants_count: -1 }
      }
    ]);

    res.status(200).json(scholarships);
  } catch (error) {
    console.error("Error getting scholarship list:", error);
    res.status(500).json({
      errMsg: "Internal Server Error",
    });
  }
};

module.exports = { getScholarships };
