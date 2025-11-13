const { ApplicantDocument } = require("../models");

const handelpdfurls = async (req, res) => {
  const { email } = req.params; // Get the email ID from the URL parameters

  try {
    // Query the database for the document URLs
    const documents = await ApplicantDocument.findOne({ 
      email: email.toLowerCase() 
    });

    if (!documents) {
      // No documents found for the given email
      return res
        .status(404)
        .json({ message: "No documents found for this email ID." });
    }

    // Map the database fields to the client-side state structure
    const responseJson = {
      incomeCertificate: documents.income_certificate || null,
      bankPassbook: documents.bank_passbook || null,
      aadharcard: documents.aadhar_card || null,
      tuitionFeeReceipt: documents.tuition_fee_receipt || null,
      nonTuitionFeeReceipt: documents.non_tuition_fee_receipt || null,
      class10MarkSheet: documents.class_10_mark_sheet || null,
      class12MarkSheet: documents.class_12_mark_sheet || null,
      currentEducationMarkSheet: documents.current_education_mark_sheet || null,
    };

    // Send the response
    res.status(200).json(responseJson);
  } catch (error) {
    console.error("Error fetching document URLs:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { handelpdfurls };
