const { Application, Scholarship, Applicant, User } = require("../models");

const getAppliedScholarships = async (req, res) => {
  console.log("Reached getAppliedScholarships");
  const email = req.headers.email;

  try {
    const applications = await Application.aggregate([
      {
        $lookup: {
          from: "scholarships",
          localField: "scholarship_id",
          foreignField: "_id",
          as: "scholarship"
        }
      },
      {
        $lookup: {
          from: "applicants",
          localField: "applicant_id",
          foreignField: "_id",
          as: "applicant"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "applicant.email",
          foreignField: "email",
          as: "user"
        }
      },
      {
        $match: {
          "user.email": email
        }
      },
      {
        $project: {
          scholarship_id: "$scholarship_id",
          scholarship_name: { $arrayElemAt: ["$scholarship.scholarship_name", 0] },
          amount: { $arrayElemAt: ["$scholarship.amount", 0] },
          applied_date: 1,
          status: 1,
          applicant_id: "$applicant_id",
          end_date: { $arrayElemAt: ["$scholarship.end_date", 0] }
        }
      }
    ]);

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error getting scholarships list:", error);
    res.status(500).json({
      errMsg: "Internal Server Error",
    });
  }
};

module.exports = { getAppliedScholarships };
