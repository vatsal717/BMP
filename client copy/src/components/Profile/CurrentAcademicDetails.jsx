import FileUpload from "./FileUpload";
import React, { useState } from "react";

const CurrentAcademicDetails = ({
    formData,
    handleInputChange,
    pdfFiles,
    handlePdfUpload,
    clearPdfFile,
    cloudinaryUrls,
    viewFile,
    setValidationErrorStatus
  }) => {
    const calculateTotalFees = () => {
      const tuitionFees = parseFloat(formData.tuitionFees) || 0;
      const nonTuitionFees = parseFloat(formData.nonTuitionFees) || 0;
      return tuitionFees + nonTuitionFees;
    };

    const [validationError, setValidationError] = useState("");

    const handleValidatedInputChange = (e) => {
      const { name, value } = e.target;

      if (parseFloat(value) < 0) {
        setValidationError("Negative Fees are not allowed.");
        setValidationErrorStatus(true);
        return;
      }
      else
      {
        setValidationError("");
        setValidationErrorStatus(false);
      }
      handleInputChange(e);
    };
  
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-black mb-6">
          Current Academic Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Course Level <span className="text-red-500">*</span>
            </label>
            <select
              name="courseLevel"
              value={formData.courseLevel || ""}
              onChange={handleInputChange}
              required
              className="block w-full bg-white text-black border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select Course Level
              </option>
              {["UG", "PG", "PhD", "Diploma"].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Course Name <span className="text-red-500">*</span>
            </label>
            <select
              name="courseName"
              value={formData.courseName || ""}
              onChange={handleInputChange}
              required
              className="block w-full bg-white text-black border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select Course Name
              </option>
              {[
                "ICT",
                "ICT with CS",
                "MNC",
                "EVD",
                "MSC IT",
                "Msc Data Science",
                "Mtech",
                "MSC in Agriculture",
                "PhD",
              ].map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
  
          {[
            { label: "Tuition Fees", name: "tuitionFees", required: true },
            { label: "Non-Tuition Fees", name: "nonTuitionFees" },
          ].map(({ label, name, required }) => (
            <div key={name} className="text-black">
              <label className="block text-sm font-medium text-black mb-1">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                name={name}
                value={formData[name] || ""}
                onChange={handleValidatedInputChange}
                required={required}
                className="block w-full bg-white text-black border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
  
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black mb-1">
              Total Current Fees <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="totalCurrentFees"
              value={calculateTotalFees()}
              readOnly
              className="block w-full bg-white text-gray-400 border border-gray-700 rounded-lg p-2.5 cursor-not-allowed"
            />
          </div>

          {validationError && (
                <p className="text-red-500 text-sm mt-1">{validationError}</p>
              )}
  
          <div className="md:col-span-2">
            <FileUpload
              label="Upload Tuition Fee Receipt/Fee Structure (PDF)"
              accept="application/pdf"
              onChange={(e) => handlePdfUpload(e, "tuitionFeeReceipt")}
              file={pdfFiles.tuitionFeeReceipt}
              clearFile={() => clearPdfFile("tuitionFeeReceipt")}
              className="text-black"
              cURL={cloudinaryUrls.tuitionFeeReceipt}
              document_name = {"tuitionFeeReceipt"}
              viewFile = {viewFile}
            />
          </div>
  
          <div className="md:col-span-2">
            <FileUpload
              label="Upload Non-Tuition Fee Receipt (PDF)"
              accept="application/pdf"
              onChange={(e) => handlePdfUpload(e, "nonTuitionFeeReceipt")}
              file={pdfFiles.nonTuitionFeeReceipt}
              clearFile={() => clearPdfFile("nonTuitionFeeReceipt")}
              className="text-black"
              cURL={cloudinaryUrls.nonTuitionFeeReceipt}
              document_name = {"nonTuitionFeeReceipt"}
              viewFile = {viewFile}
            />
          </div>
  
        </div>
  
      </div>
    );
  };

export default CurrentAcademicDetails;