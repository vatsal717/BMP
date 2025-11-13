const { Scholarship } = require("../models");

const addScholarship = async (req, res) => {
  console.log("Reached addScholarship");
  // Destructuring the request body
  const {
    scholarship_name,
    amount,
    end_date,
    description,
    education_level,
    eligible_courses,
    min_percentage,
    annual_family_income,
    benefits,
    note,
  } = req.body;
  
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
    const newScholarship = new Scholarship({
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
    });

    const scholarship = await newScholarship.save();
    
    console.log(`Inserted scholarship: ${scholarship_name}`);
    res.status(200).json({
      message: "Scholarship added successfully",
      scholarship_id: scholarship._id,
    });
  } catch (error) {
    console.error("Error inserting scholarship:", error.message);
    res.status(500).json({
      errMsg: "Internal Server Error",
    });
  }
};

module.exports = { addScholarship };
