import React, { useState } from "react";
import FileUpload from "./FileUpload";

const BankDetails = ({
  formData,
  handleInputChange,
  pdfFiles,
  handlePdfUpload,
  clearPdfFile,
  cloudinaryUrls,
  viewFile,
  setValidationErrorStatus,
}) => {
  const [validationError, setValidationError] = useState("");

  const handleValidatedInputChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);
    // handleInputChange(e);

    if (name === "bankAccount") {
      const numericOnly = value.replace(/\D/g, "");
      const limitedLength = numericOnly.slice(0, 18);

      handleInputChange({
        target: {
          name,
          value: numericOnly.slice(0, 18),
        },
      });

      if (limitedLength.length < 9) {
        setValidationError("Bank Account Number must be at least 9 digits.");
        setValidationErrorStatus(true);
      } else {
        setValidationError("");
        setValidationErrorStatus(false);
        //handleInputChange({ target: { name, value: limitedLength } });
      }
    } else if (name === "ifscCode") {
      const numericOnly = value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 11);
      const limitedLength = numericOnly.slice(0, 11);

      handleInputChange({
        target: {
          name,
          value: numericOnly.slice(0, 11),
        },
      });

      if (limitedLength.length != 11) {
        setValidationError("IFSC code must be at 11 digits.");
        setValidationErrorStatus(true);
      } else {
        setValidationError("");
        setValidationErrorStatus(false);
      }
    } else if (["bankName", "bankBranch"].includes(name)) {
      const alphabetsOnly = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
      handleInputChange({ target: { name, value: alphabetsOnly } });
    } else {
      handleInputChange(e);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-black font-bold">Bank Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: "Savings Bank Account Number",
              name: "bankAccount",
              required: true,
            },
            { label: "IFSC Code", name: "ifscCode", required: true },
            { label: "Bank Name", name: "bankName", required: true },
            { label: "Bank Branch", name: "bankBranch", required: true },
          ].map(({ label, name, required }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-black mb-2">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                name={name}
                value={formData[name] || ""}
                onChange={handleValidatedInputChange}
                required={required}
                className="block w-full bg-white text-black border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}

          {validationError && (
            <p className="text-red-500 text-sm mt-1">{validationError}</p>
          )}

          <div className="flex">
            <FileUpload
              label="Upload Bank Passbook (PDF)"
              accept="application/pdf"
              onChange={(e) => handlePdfUpload(e, "bankPassbook")}
              file={pdfFiles.bankPassbook}
              clearFile={() => clearPdfFile("bankPassbook")}
              cURL={cloudinaryUrls.bankPassbook}
              document_name={"bankPassbook"}
              viewFile={viewFile}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BankDetails;
