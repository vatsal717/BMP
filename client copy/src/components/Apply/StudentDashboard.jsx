import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContextState } from "../../context/userProvider";
import "../../index.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/apiConfig";
// import data from "./Data.json";

const ScholarshipList = () => {
  const [loading, setLoading] = useState(true);
  const { id, sid } = useParams();
  const { baseURL } = useContextState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [scholarships, setScholarships] = useState();

  useEffect(() => {
    const fetchApplicants = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo);
      try {
        const response = await fetch(
          buildApiUrl(API_ENDPOINTS.USER.GET_APPLIED_SCHOLARSHIPS),
          {
            method: "GET",
            headers: {
              email: userInfo.email,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setScholarships(data);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id, userInfo.token]);

  return (
    <div className="h-screen  mx-auto px-4 py-6 bg-white ">
      {loading ? (
        <p>Loading scholarships...</p>
      ) : scholarships.length === 0 ? (
        <div className="min-h-2 text-white">
          <span className="bg-[#0076FF] rounded-2xl py-3 px-4 border-b border-blue-600 text-left text-xl font-medium">
            You have not applied for any scholarships yet.
          </span>
        </div>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#0076FF] text-white">
            <tr>
              <th className="py-3 px-4 border-b border-blue-800 text-left text-sm font-medium">
                No
              </th>
              <th className="py-3 px-4 border-b border-blue-800 text-left text-sm font-medium">
                Scholarship Name
              </th>
              <th className="py-3 px-4 border-b border-blue-800 text-left text-sm font-medium">
                Applied Date
              </th>
              <th className="py-3 px-4 border-b border-blue-800 text-left text-sm font-medium">
                Amount
              </th>

              <th className="py-3 px-4 border-b border-blue-800 text-left text-sm font-medium">
                End Date
              </th>
              <th className="py-3 px-4 border-b border-blue-800 text-left text-sm font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship, index) => (
              <tr
                key={scholarship.id}
                className={`${
                  index % 2 === 0 ? "bg-[#0076FF]" : "bg-[#0076FF]"
                } hover:bg-blue-700 transition-colors`}
              >
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  {index + 1}
                </td>
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  {scholarship.scholarship_name}
                </td>
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  {new Date(scholarship.applied_date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  {scholarship.amount}
                </td>
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  {new Date(scholarship.end_date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  {scholarship.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScholarshipList;
