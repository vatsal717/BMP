import React from 'react';

const PersonalDetails = ({ formData, handleInputChange }) => {

  const handleValidatedInputChange = (e) => {
    const { name, value } = e.target;

    
    const alphabetsOnlyFields = [
      'firstname', 
      'middlename', 
      'lastname', 
      'category', 
      'parentName', 
      'occupation'
    ];

    
    const numericOnlyFields = [
      'mobileNumber', 
      'parentMobile', 
      'incomelimit'
    ];

    if (alphabetsOnlyFields.includes(name)) {
      
      const alphabetsOnly = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      handleInputChange({ target: { name, value: alphabetsOnly } });
    } else if (numericOnlyFields.includes(name)) {
      
      const numericOnly = value.replace(/\D/g, '');
      
      if (['mobileNumber', 'parentMobile'].includes(name)) {
        handleInputChange({ 
          target: { 
            name, 
            value: numericOnly.slice(0, 10) 
          } 
        });
      } else {
        handleInputChange({ target: { name, value: numericOnly } });
      }
    } else {
      handleInputChange(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "First Name", name: "firstname", required: true },
          { label: "Middle Name", name: "middlename", required: true },
          { label: "Last Name", name: "lastname", required: true },
          { label: "Date of Birth", name: "dob", type: "date", required: true },
          {
            label: "Gender",
            name: "gender",
            type: "select",
            options: ["Male", "Female", "Other"],
            required: true,
          },
          { label: "Category", name: "category", required: true},
          { label: "Mobile Number", name: "mobileNumber", required: true },
          { label: "Parent's Full Name", name: "parentName" },
          { label: "Occupation", name: "occupation" },
          { label: "Parent's Mobile No", name: "parentMobile" },
          { label: "Income", name: "incomelimit" },
        ].map(({ label, name, type = "text", options, required, pattern }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-black mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            {type === "select" ? (
              <select
                name={name}
                value={formData[name] || ""}
                onChange={handleInputChange}
                required={required}
                className="block w-full bg-white text-black border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name] || ""}
                onChange={handleValidatedInputChange}
                required={required}
                pattern={pattern?.source}
                className="block w-full bg-white text-black border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-black mb-1">
            Email
          </label>
          <input
            type="text"
            value={formData.email || ""}
            readOnly
            className="block w-full bg-white text-gray-400 border border-gray-700 rounded-lg p-2.5 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
