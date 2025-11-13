const { Applicant } = require("../models");

const fetchprofile = async (req, res) => {
  const email = req.params.email.toLowerCase();

  try {
    const applicant = await Applicant.findOne({ email });

    if (!applicant) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Transform the MongoDB document to match the expected frontend format
    const profileData = {
      first_name: applicant.first_name,
      middle_name: applicant.middle_name,
      last_name: applicant.last_name,
      dob: applicant.dob,
      gender: applicant.gender,
      category: applicant.category,
      email: applicant.email,
      mobileNumber: applicant.mobile_number,
      parent_name: applicant.parent_name,
      occupation: applicant.occupation,
      parentMobile: applicant.parent_mobile,
      incomelimit: applicant.income,
      village: applicant.address.street_address,
      block: applicant.address.district,
      state: applicant.address.state,
      pin: applicant.address.pin_code,
      bankAccount: applicant.bank_details.bank_account_no,
      ifscCode: applicant.bank_details.ifsc_code,
      bank_name: applicant.bank_details.bank_name,
      branch_name: applicant.bank_details.branch_name,
      courseLevel: applicant.education_details.department_name,
      courseName: applicant.education_details.program_name,
      tuitionFees: applicant.education_details.tuition_fees,
      nonTuitionFees: applicant.education_details.non_tuition_fees,
      class10Institute: applicant.class10_details.institute_name,
      class10PassingDate: applicant.class10_details.passing_date,
      class10MarksObtained: applicant.class10_details.marks_obtained,
      class10TotalMarks: applicant.class10_details.total_marks,
      class12Institute: applicant.class12_details.institute_name,
      class12PassingDate: applicant.class12_details.passing_date,
      class12MarksObtained: applicant.class12_details.marks_obtained,
      class12TotalMarks: applicant.class12_details.total_marks,
      currentEducationBatch: applicant.year_of_admission,
      currentCgpaObtained: applicant.current_cgpa_obtained,
      currentCgpaTotal: applicant.current_cgpa_total,
      current_semester: applicant.current_semester
    };

    return res.status(200).json(profileData);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { fetchprofile };
