const { Scholarship } = require("../models");

const editScholarship = async (req, res) => {
  console.log("Reached editScholarship");
  const scholarship_id = req.params.scholarship_id;

  // Destructuring the request body
  const scholarship_name = req.body.scholarshipName;
  const amount = req.body.amount;
  const end_date = req.body.endDate;
  const description = req.body.description;
  const education_level = req.body.educationLevel;
  const eligible_courses = req.body.eligibleCourses;
  const min_percentage = req.body.minPercentage;
  const annual_family_income = req.body.annualFamilyIncome;
  const benefits = req.body.benefits;
  const note = req.body.note;

  // Input validation
  if (
    !scholarship_name ||
    !amount ||
    !end_date ||
    !description ||
    !education_level ||
    !eligible_courses ||
    !min_percentage ||
    !annual_family_income
  ) {
    console.error("Please Input all the Fields");
    return res.status(400).json("Please Input all the Fields");
  }

  try {
    const updateData = {
      scholarship_name,
      amount,
      end_date,
      description,
      education_level,
      eligible_courses,
      min_percentage,
      annual_family_income,
      benefits: benefits || "",
      note: note || ""
    };

    const scholarship = await Scholarship.findByIdAndUpdate(
      scholarship_id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!scholarship) {
      console.error("Scholarship not found");
      return res.status(404).json("Scholarship not found");
    }

    console.log(`Updated scholarship: ${scholarship_name}`);
    res.status(200).json({
      message: "Scholarship updated successfully",
      scholarship_id,
    });
  } catch (error) {
    console.error("Error updating scholarship:", error.message);
    res.status(500).json({
      errMsg: "Internal Server Error",
    });
  }
};

module.exports = { editScholarship };
