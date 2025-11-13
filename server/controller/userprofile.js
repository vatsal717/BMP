const { Applicant, ApplicantDocument } = require("../models");

const handelprofiledata = async (req, res) => {
  const formData = req.body;

  try {
    const email = formData.email.toLowerCase();
    
    // Prepare applicant data with embedded documents
    const applicantData = {
      email,
      first_name: formData.firstname,
      middle_name: formData.middlename,
      last_name: formData.lastname,
      dob: formData.dob,
      gender: formData.gender,
      category: formData.category,
      mobile_number: formData.mobileNumber,
      parent_name: formData.parentName,
      occupation: formData.occupation,
      income: formData.incomelimit,
      parent_mobile: formData.parentMobile,
      current_semester: formData.currentSemester,
      year_of_admission: formData.currentEducationBatch,
      current_cgpa_obtained: formData.currentCgpaObtained,
      current_cgpa_total: formData.currentCgpaTotal,
      
      // Embedded Address Document
      address: {
        street_address: formData.village,
        pin_code: formData.pin,
        district: formData.block,
        state: formData.state
      },
      
      // Embedded Bank Details Document
      bank_details: {
        bank_account_no: formData.bankAccount,
        ifsc_code: formData.ifscCode,
        bank_name: formData.bankName,
        branch_name: formData.bankBranch
      },
      
      // Embedded Education Details Document
      education_details: {
        department_name: formData.courseName,
        program_name: formData.courseLevel,
        tuition_fees: formData.tuitionFees,
        non_tuition_fees: formData.nonTuitionFees
      },
      
      // Embedded Class 10 Details Document
      class10_details: {
        institute_name: formData.class10Institute,
        passing_date: formData.class10PassingDate,
        marks_obtained: formData.class10MarksObtained,
        total_marks: formData.class10TotalMarks
      },
      
      // Embedded Class 12 Details Document
      class12_details: {
        institute_name: formData.class12Institute,
        passing_date: formData.class12PassingDate,
        marks_obtained: formData.class12MarksObtained,
        total_marks: formData.class12TotalMarks
      }
    };

    // Use upsert to create or update applicant
    const applicant = await Applicant.findOneAndUpdate(
      { email },
      applicantData,
      { 
        upsert: true, 
        new: true, 
        runValidators: true 
      }
    );

    console.log("Profile saved to MongoDB successfully");

    return res.status(200).json({
      message: "Profile saved successfully!",
      success: true,
      applicant_id: applicant._id
    });

  } catch (error) {
    console.error("Error saving profile:", error);
    return res.status(500).json({
      message: "Error saving profile",
      success: false,
      error: error.message
    });
  }
};

module.exports = { handelprofiledata };
