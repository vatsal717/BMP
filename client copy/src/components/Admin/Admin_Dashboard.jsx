import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import "../../index.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/apiConfig";
const Admin_Dashboard = () => {
  const navigate = useNavigate();
  const {
    data: scholarships,
    ispending,
    error,
  } = useFetch(
    buildApiUrl(API_ENDPOINTS.SCHOLARSHIP.GET_SCHOLARSHIPS)
  );
  const [showOptions, setShowOptions] = useState(null);

  const handleViewScholarship = (scholarship_id) => {
    navigate(`/admin/viewscholarship/${scholarship_id}`);
  };

  const toggleOptions = (id) => {
    setShowOptions((prevId) => (prevId === id ? null : id));
  };

  const handleViewApplicats = () => {
    navigate(`/admin/list-scholarships`, { state: scholarships });
  };

  return (
    <div className="p-8 bg-white  min-h-screen">
      {ispending && (
        <div className="text-slate-100 text-center py-4">Loading...</div>
      )}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}
      {scholarships && (
        <div>
          <h1 className="text-4xl font-bold text-black mb-8 text-center drop-shadow-sm">
            Manage Scholarships
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarships.map((scholarship) => (
              <div className="p-8 bg-[#0076FF]/40 rounded-3xl shadow-lg">
                <div
                  key={scholarship.scholarship_id}
                  className="group w-full max-w-sm  bg-white rounded-3xl p-8 flex flex-col items-center relative overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-px hover:shadow-2xl shadow-blue-500/60 border border-white/20 mx-auto"
                >
                  {/* Overlay gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />

                  {/* Image */}
                  <img
                    src="./imgdaiict.jpg"
                    alt="Scholarship Logo"
                    className="w-24 h-24 object-cover rounded-full mb-6 shadow-lg border-4 border-white/30 transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-black mb-4 text-center line-clamp-2 w-full">
                    {scholarship.scholarship_name}
                  </h2>

                  {/* Content Container */}
                  <div className="flex flex-col items-center  space-y-3 mb-6">
                    {/* Amount */}
                    <span className="text-black text-2xl font-semibold">
                      ₹ {scholarship.amount}
                    </span>

                    {/* Date */}
                    <span className="text-black/90 text-lg px-4 py-1.5 rounded-full backdrop-blur-sm">
                      End Date:{" "}
                      {new Date(scholarship.end_date).toLocaleDateString()}
                    </span>
                  </div>

                  <button
                    className="bg-[#0076FF]/90 backdrop-blur-sm shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white/20"
                    onClick={() =>
                      handleViewScholarship(scholarship.scholarship_id)
                    }
                  >
                    View Scholarship Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_Dashboard;
