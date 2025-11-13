import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import BankDetails from "./BankDetails";
import CommunicationAddress from "./CommunicationAddress";
import PersonalDetails from "./PersonalDetails";
import CurrentAcademicDetails from "./CurrentAcademicDetails";
import Class10Details from "./Class10Details";
import Class12Details from "./Class12Details";
import CurrentEducationDetails from "./CurrentEducationDetails";
import { ToastContainer, toast, Slide, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/apiConfig";
var Femail = "";

const Profile = () => {
  const [pdfFiles, setPdfFiles] = useState({
    incomeCertificate: null,
    bankPassbook: null,
    aadharcard: null,
    tuitionFeeReceipt: null,
    nonTuitionFeeReceipt: null,
    class10MarkSheet: null,
    class12MarkSheet: null,
    currentEducationMarkSheet: null,
  });

  const [cloudinaryUrls, setCloudinaryUrls] = useState({
    incomeCertificate: "",
    bankPassbook: "",
    aadharcard: "",
    tuitionFeeReceipt: "",
    nonTuitionFeeReceipt: "",
    class10MarkSheet: "",
    class12MarkSheet: "",
    currentEducationMarkSheet: "",
  });
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    gender: "",
    category: "",
    email: "",
    mobileNumber: "",
    parentName: "",
    occupation: "",
    parentMobile: "",
    incomelimit: "",
    village: "",
    block: "",
    state: "",
    pin: "",
    bankAccount: "",
    ifscCode: "",
    bankName: "",
    bankBranch: "",
    courseLevel: "",
    courseName: "",
    tuitionFees: "",
    nonTuitionFees: "",
    class10Institute: "",
    class10PassingDate: "",
    class10MarksObtained: "",
    class10TotalMarks: "",
    class12Institute: "",
    class12PassingDate: "",
    class12MarksObtained: "",
    class12TotalMarks: "",
    currentEducationBatch: "",
    currentCgpaObtained: "",
    currentCgpaTotal: "",
    currentSemester: "",
  });

  const [class10ValidationError, setClass10ValidationError] = useState(false);
  const [class12ValidationError, setClass12ValidationError] = useState(false);
  const [educationdetailserror, setEducationdetailserror] = useState(false);
  const [Academicdetailserror, setAcademicdetailserror] = useState(false);
  const [Bankdetailserror, setBankdetailserror] = useState(false);
  const [communicationAddress, setcommunicationAddress] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const email = userInfo.email;

    Femail = email;

    setFormData((prev) => ({ ...prev, email: Femail }));

    var endpoint3 = buildApiUrl(API_ENDPOINTS.USER.GET_PDF_URLS);
    endpoint3 = endpoint3 + Femail;

    (async () => {
      try {
        const response = await fetch(endpoint3, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });

        if (response.ok) {
          const data = await response.json();

          const formattedPdfFiles = {
            incomeCertificate: String(data.incomeCertificate || ""),
            bankPassbook: String(data.bankPassbook || ""),
            aadharcard: String(data.aadharcard || ""),
            tuitionFeeReceipt: String(data.tuitionFeeReceipt || ""),
            nonTuitionFeeReceipt: String(data.nonTuitionFeeReceipt || ""),
            class10MarkSheet: String(data.class10MarkSheet || ""),
            class12MarkSheet: String(data.class12MarkSheet || ""),
            currentEducationMarkSheet: String(
              data.currentEducationMarkSheet || ""
            ),
          };

          setCloudinaryUrls({
            incomeCertificate: formattedPdfFiles.incomeCertificate,
            bankPassbook: formattedPdfFiles.bankPassbook,
            aadharcard: formattedPdfFiles.aadharcard,
            tuitionFeeReceipt: formattedPdfFiles.tuitionFeeReceipt,
            nonTuitionFeeReceipt: formattedPdfFiles.nonTuitionFeeReceipt,
            class10MarkSheet: formattedPdfFiles.class10MarkSheet,
            class12MarkSheet: formattedPdfFiles.class12MarkSheet,
            currentEducationMarkSheet:
              formattedPdfFiles.currentEducationMarkSheet,
          });
        }
      } catch (error) {
        console.error("can't find uploaded doctuments", error);
      }
    })();

    //console.log("f", Femail);

    const endpoint1 = buildApiUrl(API_ENDPOINTS.USER.GET_PROFILE);
    const id2 = endpoint1 + email;

    //console.log(id2);

    const fetchData = async () => {
      try {
        //console.log(id2);

        const response = await fetch(id2, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });

        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const data = await response.json();

          console.log(data);


          const formattedData = {
          firstname: String(data.first_name || ""),
          middlename: String(data.middle_name || ""),
          lastname: String(data.last_name || ""),
          dob: String(data.dob || ""),
          gender: String(data.gender || ""),
          category: String(data.category || ""),
          email: String(data.email || ""),
          mobileNumber: String(data.mobileNumber || ""),
          parentName: String(data.parent_name || ""),
          occupation: String(data.occupation || ""),
          parentMobile: String(data.parentMobile || ""),
          incomelimit: String(data.incomelimit || ""),
          village: String(data.village || ""),
          block: String(data.block || ""),
          state: String(data.state || ""),
          pin: String(data.pin || ""),
          bankAccount: String(data.bankAccount || ""),
          ifscCode: String(data.ifscCode || ""),
          bankName: String(data.bank_name || ""),
          bankBranch: String(data.branch_name || ""),
          courseLevel: String(data.courseLevel || ""),
          courseName: String(data.courseName || ""),
          tuitionFees: String(data.tuitionFees || ""),
          nonTuitionFees: String(data.nonTuitionFees || ""),
          class10Institute: String(data.class10Institute || ""),
          class10PassingDate: String(data.class10PassingDate || ""),
          class10MarksObtained: String(data.class10MarksObtained || ""),
          class10TotalMarks: String(data.class10TotalMarks || ""),
          class12Institute: String(data.class12Institute || ""),
          class12PassingDate: String(data.class12PassingDate || ""),
          class12MarksObtained: String(data.class12MarksObtained || ""),
          class12TotalMarks: String(data.class12TotalMarks || ""),
          currentEducationBatch: String(data.currentEducationBatch || ""),
          currentCgpaObtained: String(data.currentCgpaObtained || ""),
          currentCgpaTotal: String(data.currentCgpaTotal || ""),
          currentSemester: String(data.current_semester || ""),
        };


          console.log(formattedData);
          // console.log('3');

          setFormData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    const endpoint = buildApiUrl(API_ENDPOINTS.USER.GET_EMAIL);
    const id = endpoint + email;

    //console.log(email);

    (async () => {
      try {
        const response = await fetch(id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });

        if (response.ok) {
          //console.log("Email is present in the database.");
          fetchData();
        } else if (response.status === 404) {
          console.log("Email not found in the database.");
        } else {
          console.error("An error occurred while checking the email.");
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    })();
  }, []);

  const handlePdfUpload = async (e, key) => {
    // Add 'async' here
    const file = e.target.files[0];
    setPdfFiles((prev) => ({ ...prev, [key]: file }));

    if (file) {
      const formData2 = new FormData();
      formData2.append("file", file);

      const endpoint2 = buildApiUrl(`${API_ENDPOINTS.USER.PDF_UPLOAD}/${Femail}/${key}`);

      try {
        const response = await fetch(endpoint2, {
          // 'await' works because of 'async'
          method: "POST",
          body: formData2,
        });

        if (!response.ok) {
          throw new Error("File upload failed.");
        }

        const data = await response.json();
        const cloudinaryUrl = data.cloudinaryUrl;

        setCloudinaryUrls((prevState) => ({
          ...prevState,
          [key]: cloudinaryUrl,
        }));
      } catch (error) {
        //console.error("Error uploading file:", error);
        toast.error("Error uploading file: " + error.message);
      }
    }
  };

  const clearPdfFile = async (key) => {
    setPdfFiles((prev) => ({ ...prev, [key]: null }));
    setCloudinaryUrls((prevState) => ({
      ...prevState,
      [key]: "",
    }));

    const endpoint = buildApiUrl(`${API_ENDPOINTS.USER.CLEAR_PDF}/${Femail}/${key}/`);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON data format
        },
        body: JSON.stringify({}), // Convert the body to JSON
      });

      // Check if the response is not okay
      if (!response.ok) {
        const errorData = await response.json(); // Parse any server error details
        throw new Error(errorData.message || "Failed to clear the PDF file.");
      }
    } catch (error) {
      // Handle any errors during the request
      toast.error("Cannot clear PDF file: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const viewFile = (url) => {
    window.open(url, "_blank");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (class10ValidationError) {
      toast.error(
        "Please correct the errors in Class 10 details before saving."
      );
      return false;
    }

    if (class12ValidationError) {
      toast.error(
        "Please correct the errors in Class 12 details before saving."
      );
      return false;
    }

    if (educationdetailserror) {
      toast.error(
        "Please correct the Current Education Details before saving."
      );
      return false;
    }

    if (Academicdetailserror) {
      toast.error("Please correct the Academic details error before saving.");
      return false;
    }

    if (Bankdetailserror) {
      toast.error("Please correct the Bank details error before saving.");
      return false;
    }

    if (communicationAddress) {
      toast.error(
        "Please correct the Communication Address error details before saving."
      );
      return false;
    }

    const requiredDocs = [
      "incomeCertificate",
      "bankPassbook",
      "aadharcard",
      "tuitionFeeReceipt",
      "nonTuitionFeeReceipt",
      "class10MarkSheet",
      "class12MarkSheet",
      "currentEducationMarkSheet",
    ];

    // Check if any of the documents is missing (empty string)
    for (const doc of requiredDocs) {
      if (!cloudinaryUrls[doc]) {
        toast.error(
          `Please upload your ${doc.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false; // Return false if any document is missing
      }
    }

    try {
      const response = await fetch(
        buildApiUrl(API_ENDPOINTS.USER.PROFILE),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        //const profileData = { formData, image: preview, pdfFiles };
        toast.success("Profile saved successfully!");
      } else {
        toast.error("Login failed: " + response.data.message);
      }
    } catch (error) {
      // console.error("Login error:", error);
      toast.error("An error occurred while Profile save");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={2}
        newestOnTop={true}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-[#0076FF]/60 shadow-md p-8">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Student Details
          </h2>

          <form onSubmit={handleSave} className="text-white grid gap-6">
            {/* Other Components */}
            <div className="space-y-6">
              <PersonalDetails
                formData={formData}
                handleInputChange={handleInputChange}
              />
              <CommunicationAddress
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
                cloudinaryUrls={cloudinaryUrls}
                viewFile={viewFile}
                setValidationErrorStatus={setcommunicationAddress}
              />
              <BankDetails
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
                cloudinaryUrls={cloudinaryUrls}
                viewFile={viewFile}
                setValidationErrorStatus={setBankdetailserror}
              />
              <CurrentAcademicDetails
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
                cloudinaryUrls={cloudinaryUrls}
                viewFile={viewFile}
                setValidationErrorStatus={setAcademicdetailserror}
              />
              <Class10Details
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
                cloudinaryUrls={cloudinaryUrls}
                viewFile={viewFile}
                setValidationErrorStatus={setClass10ValidationError}
              />
              <Class12Details
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
                cloudinaryUrls={cloudinaryUrls}
                viewFile={viewFile}
                setValidationErrorStatus={setClass12ValidationError}
              />

              <CurrentEducationDetails
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
                cloudinaryUrls={cloudinaryUrls}
                viewFile={viewFile}
                setValidationErrorStatus={setEducationdetailserror}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-green-500 text-white  transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
