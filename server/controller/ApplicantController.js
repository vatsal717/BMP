const { Scholarship, Application, Applicant } = require("../models");
const mongoose = require("mongoose");

const getListOfScholarships = async (req, res) => {
  console.log("Reached getListOfScholarships");
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
          id: "$_id",
          name: "$scholarship_name",
          numApplicants: { $size: "$applications" },
          start_date: "$createdAt",
          end_date: 1,
          status: { $arrayElemAt: ["$applications.status", -1] }
        }
      },
      {
        $sort: { id: 1 }
      }
    ]);
    
    res.json(scholarships);
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getApplicantsByScholarshipId = async (req, res) => {
  const scholarshipId = req.params.id; 
  console.log("In application controller, get scholarship by id");
  console.log(scholarshipId);
  try {
    const applicants = await Application.aggregate([
      {
        $match: { scholarship_id: new mongoose.Types.ObjectId(scholarshipId) }
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
          from: "scholarships",
          localField: "scholarship_id",
          foreignField: "_id",
          as: "scholarship"
        }
      },
      {
        $project: {
          id: "$applicant_id",
          student_name: {
            $concat: [
              { $arrayElemAt: ["$applicant.first_name", 0] },
              " ",
              { $ifNull: [{ $arrayElemAt: ["$applicant.middle_name", 0] }, ""] },
              " ",
              { $arrayElemAt: ["$applicant.last_name", 0] }
            ]
          },
          applied_date: 1,
          end_date: { $arrayElemAt: ["$scholarship.end_date", 0] },
          status: 1
        }
      },
      {
        $sort: { applied_date: 1 }
      }
    ]);
    
    res.status(200).json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ error: "Failed to fetch applicants." });
  }
};

module.exports = {
  getListOfScholarships,
  getApplicantsByScholarshipId
};
