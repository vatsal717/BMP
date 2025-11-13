import FileUpload from "./FileUpload";
import React, { useState } from 'react';

const CommunicationAddress = ({
    formData,
    handleInputChange,
    pdfFiles,
    handlePdfUpload,
    clearPdfFile,
    cloudinaryUrls,
    viewFile,
    setValidationErrorStatus
  }) => {


    const [validationError, setValidationError] = useState('');

    const handleValidatedInputChange = (e) => {
      const { name, value } = e.target;
      
      
      if (name === 'pin') {

        const numericOnly = value.replace(/\D/g, '').slice(0, 6);
        const limitedLength = numericOnly.slice(0, 6);

        handleInputChange({ 
          target: { 
            name, 
            value: numericOnly.slice(0, 6) 
          } 
        });

        if (limitedLength.length != 6) {
          setValidationError('PIN code must be at 6 digits.');
          setValidationErrorStatus(true);
        } 
        else 
        {
          setValidationError('');
          setValidationErrorStatus(false);
        }
        
      }
      else{
        handleInputChange(e);
      }

    };
  
    
    return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-black font-semibold text-lg mb-6">
          Communication Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
          {[
            {
              label: "Village / Area / Locality",
              name: "village",
              required: true,
            },
            {
              label: "Block / Taluka / Sub-district / Town",
              name: "block",
              required: true,
            },
            { label: "State", name: "state", required: true },
            { label: "PIN", name: "pin", required: true },
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
        </div>

        {validationError && (
                <p className="text-red-500 text-sm mt-1">{validationError}</p>
              )}
  
        <div>
          <FileUpload
            label="Upload Aadharcard (PDF)"
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e, "aadharcard")}
            file={pdfFiles.aadharcard}
            clearFile={() => clearPdfFile("aadharcard")}
            className="text-black"
            cURL={cloudinaryUrls.aadharcard}
            document_name = {"aadharcard"}
            viewFile = {viewFile}
          />
        </div>
  
        <div>
          <FileUpload
            label="Upload Income Certificate (PDF)"
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e, "incomeCertificate")}
            file={pdfFiles.aadharcard}
            clearFile={() => clearPdfFile("incomeCertificate")}
            className="text-black"
            cURL={cloudinaryUrls.incomeCertificate}
            document_name = {"incomeCertificate"}
            viewFile = {viewFile}
          />
        </div>
  
      </div>
    </>
  );}

  
export default CommunicationAddress;