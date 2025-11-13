import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAdmin from "./Navbar";
import { buildApiUrl, API_ENDPOINTS } from "../../config/apiConfig";

const ViewApplicants = () => {
  const { id } = useParams(); // Get scholarship ID from URL
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(
          buildApiUrl(`${API_ENDPOINTS.SCHOLARSHIP.GET_APPLICANTS}/${id}/applicants`),
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        setApplicants(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [id]);

  const handleViewDetails = (applicantId) => {
    navigate(`/applicant-details/${applicantId}/${id}`);
  };

  return (
    <>
      <NavbarAdmin />

      <div className="h-screen bg-white mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          List of Applicants
        </h1>
        <div className="overflow-x-auto shadow-md rounded-lg bg-[#0076FF]">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-[#0076FF] text-white">
                <th className="p-3 w-1/12 hidden sm:table-cell">No</th>
                <th className="p-3 w-2/12 text-xs sm:text-sm">Student ID</th>
                <th className="p-3 w-3/12 text-xs sm:text-sm">Student Name</th>
                <th className="p-3 w-2/12 text-xs sm:text-sm">Applied Date</th>
                <th className="p-3 w-2/12 text-xs sm:text-sm">End Date</th>
                <th className="p-3 w-2/12 text-xs sm:text-sm">Status</th>
                <th className="p-3 w-2/12 hidden md:table-cell">Details</th>
              </tr>
            </thead>
            <tbody>
              {applicants.length ? (
                applicants.map((applicant, index) => (
                  <tr
                    key={applicant.id}
                    className={`${
                      index % 2 === 0 ? "bg-[#0076FF]" : "bg-[#0076FF]"
                    } hover:bg-[#0076FF] transition-colors`}
                  >
                    <td className="py-3 px-4 border-b border-blue-800 text-sm text-white hidden sm:table-cell">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 border-b border-blue-800 text-xs sm:text-sm text-white">
                      {applicant.id}
                    </td>
                    <td className="py-3 px-4 border-b border-blue-800 text-xs sm:text-sm text-white">
                      {applicant.student_name}
                    </td>
                    <td className="py-3 px-4 border-b border-blue-800 text-xs sm:text-sm text-white">
                      {new Date(applicant.applied_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b border-blue-800 text-xs sm:text-sm text-white">
                      {new Date(applicant.end_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b border-blue-800 text-xs sm:text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          applicant.status === "Accepted"
                            ? "bg-green-500 text-white"
                            : applicant.status === "Rejected"
                            ? "bg-red-500 text-white"
                            : applicant.status === "Under Review"
                            ? "bg-yellow-300"
                            : applicant.status === "Documents Verified"
                            ? "bg-orange-400"
                            : "bg-gray-300"
                        }`}
                      >
                        {applicant.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-blue-800 text-sm hidden md:table-cell">
                      <button
                        onClick={() => handleViewDetails(applicant.id)}
                        className="bg-[#0076FF] hover:bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-white">
                    No applicants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewApplicants;
