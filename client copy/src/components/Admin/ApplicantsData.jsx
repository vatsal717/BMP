import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContextState } from "../../context/userProvider";
import NavbarAdmin from "./Navbar";
import { ToastContainer, toast, Slide, Bounce } from "react-toastify";
import { buildApiUrl, API_ENDPOINTS } from "../../config/apiConfig";

const ApplicantData = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id, sid } = useParams();
  const { baseURL } = useContextState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(
          buildApiUrl(`${API_ENDPOINTS.SCHOLARSHIP.GET_APPLICANT_DATA}?id=${id}&scholarship_id=${sid}`),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const { data } = await response.json();
         console.log(data);
        setApplicants(data);
        const initialStatus = data.reduce((acc, applicant) => {
          acc[applicant._id] = applicant.status;
          return acc;
        }, {});
        setSelectedStatus(initialStatus);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id, userInfo.token]);

  const handleStatusChange = (applicantId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [applicantId]: status,
    }));
  };

  const handleSaveStatus = async (applicantId) => {
    const status = selectedStatus[applicantId];
    try {
      const response = await fetch(
        buildApiUrl(API_ENDPOINTS.SCHOLARSHIP.STATUS_UPDATE),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify({
            applicant_id: applicantId,
            scholarship_id: sid,
            statusToUpdate: status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedApplicants = [...applicants];
      const index = updatedApplicants.findIndex(
        (applicant) => applicant._id === applicantId
      );
      if (index !== -1) {
        updatedApplicants[index].status = status;
        setApplicants(updatedApplicants);
      }

      toast.success("Status updated successfully!");
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavbarAdmin />
      <ToastContainer
        position="top-right"
        limit={2}
        newestOnTop={true}
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="min-h-screen bg-gray-100 px-6 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Applicant Details
        </h2>
        <div className="space-y-8">
          {applicants.map((applicant) => (
            <div
              key={applicant._id}
              className="bg-blue-300 shadow-md rounded-lg p-6"
            >
              <table className="w-full table-auto border-collapse">
                <tbody>
                  {[
                    ["ID", applicant._id || "No data uploaded"],
                    [
                      "Name",
                      applicant.first_name ||
                      applicant.middle_name ||
                      applicant.last_name
                        ? `${applicant.first_name} ${
                            applicant.middle_name || ""
                          } ${applicant.last_name}`
                        : "No data uploaded",
                    ],
                    [
                      "DOB",
                      applicant.dob
                        ? new Date(applicant.dob).toLocaleDateString()
                        : "No data uploaded",
                    ],
                    ["Gender", applicant.gender || "No data uploaded"],
                    ["Category", applicant.category || "No data uploaded"],
                    ["Email", applicant.email || "No data uploaded"],
                    ["Mobile", applicant.mobile_number || "No data uploaded"],
                    [
                      "Parent Name",
                      applicant.parent_name || "No data uploaded",
                    ],
                    ["Occupation", applicant.occupation || "No data uploaded"],
                    ["Income", applicant.income || "No data uploaded"],
                    [
                      "Parent Mobile",
                      applicant.parent_mobile || "No data uploaded",
                    ],
                    [
                      "Current Semester",
                      applicant.current_semester || "No data uploaded",
                    ],
                    [
                      "Year of Admission",
                      applicant.year_of_admission || "No data uploaded",
                    ],
                    [
                      "Street Address",
                      applicant.address.street_address || "No data uploaded",
                    ],
                    ["Pin Code", applicant.address.pin_code || "No data uploaded"],
                    ["District", applicant.address.district || "No data uploaded"],
                    [
                      "Department",
                      applicant.education_details.department_name || "No data uploaded",
                    ],
                    [
                      "Tuition Fees",
                      applicant.education_details.tuition_fees || "No data uploaded",
                    ],
                    [
                      "Non-Tuition Fees",
                      applicant.education_details.non_tuition_fees || "No data uploaded",
                    ],
                    ["Status", applicant.status || "No data uploaded"],
                    [
                      "Income Certificate",
                      applicant.documents.income_certificate ? (
                        <a
                          href={applicant.documents.income_certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        "No data uploaded"
                      ),
                    ],
                    [
                      "Bank Passbook",
                      applicant.documents.bank_passbook ? (
                        <a
                          href={applicant.documents.bank_passbook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        "No data uploaded"
                      ),
                    ],
                    [
                      "Aadhar Card",
                      applicant.documents.aadhar_card ? (
                        <a
                          href={applicant.documents.aadhar_card}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        "No data uploaded"
                      ),
                    ],
                    [
                      "Tuition Fee Receipt",
                      applicant.documents.tuition_fee_receipt ? (
                        <a
                          href={applicant.documents.tuition_fee_receipt}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        "No data uploaded"
                      ),
                    ],
                    [
                      "Non-Tuition Fee Receipt",
                      applicant.documents.non_tuition_fee_receipt ? (
                        <a
                          href={applicant.documents.non_tuition_fee_receipt}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        "No data uploaded"
                      ),
                    ],
                    [
                      "Class 10 Marksheet",
                      applicant.documents.class_10_mark_sheet ? (
                        <a
                          href={applicant.documents.class_10_mark_sheet}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        "No data uploaded"
                      ),
                    ],
                    [
                      "Class 12 Marksheet",
                      applicant.documents.class_12_mark_sheet ? (
                        <a
                          href={applicant.documents.class_12_mark_sheet}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        "No data uploaded"
                      ),
                    ],
                    [
                      "Current Education Marksheet",
                      applicant.documents.current_education_mark_sheet ? (
                        <a
                          href={applicant.documents.current_education_mark_sheet}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        "No data uploaded"
                      ),
                    ],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b">
                      <th className="text-left py-2 px-4 font-medium w-1/3">
                        {label}
                      </th>
                      <td className="py-2 px-4 w-2/3">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex items-center justify-between">
                <div className="relative">
                  <select
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none cursor-pointer"
                    value={
                      selectedStatus[applicant._id] || applicant.status
                    }
                    onChange={(e) =>
                      handleStatusChange(applicant._id, e.target.value)
                    }
                  >
                    {[
                      "Accepted",
                      "Rejected",
                      "Under Review",
                      "Documents Verified",
                      "Status",
                    ].map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="bg-gray-200 text-black"
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedStatus[applicant._id] === "Accepted"
                      ? "bg-green-500 text-white"
                      : selectedStatus[applicant._id] === "Rejected"
                      ? "bg-red-500 text-white"
                      : selectedStatus[applicant._id] ===
                        "Under Review"
                      ? "bg-yellow-300"
                      : selectedStatus[applicant._id] ===
                        "Documents Verified"
                      ? "bg-orange-400"
                      : "bg-gray-300"
                  }`}
                >
                  {selectedStatus[applicant._id] || applicant.status}
                </span>
                <button
                  onClick={() => handleSaveStatus(applicant._id)}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ApplicantData;
