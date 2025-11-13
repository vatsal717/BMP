import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import logo from "../assets/logo.png";

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const handleLogout = () => {
    const confirmSave = window.confirm("Are you sure you want to log out ?");
    if (!confirmSave) {
      return; // Exit the function if user does not confirm
    }
    localStorage.removeItem("userInfo");
    localStorage.removeItem("roleChecked");
    navigate("/");
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <nav className="flex flex-col lg:flex-row lg:items-center lg:justify-around bg-[##0076FF] shadow-2xl px-4 py-4 lg:px-6">
      {/* Left Section */}
      <div
        as={Link}
        to="/"
        className="flex flex-col lg:flex-row items-center text-white font-bold"
      >
        {location.pathname !== "/admin" && (
          <button
            onClick={handleBack}
            className="bg-[#0076FF] backdrop-blur-sm hover:bg-[#0076FF] rounded-full shadow-lg p-2.5 text-white font-medium m-3 transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white"
          >
            <svg
              xmlns="http://www.w3.org00/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        )}
        <img
          src={logo}
          alt="Scholarship Logo"
          className="w-20 h-auto lg:w-24 lg:h-30 animate-pulse-grow pl-0 lg:pl-10"
        />
        <span className="text-center text-black pl-3 text-2xl lg:text-left">
          OSP- Admin
        </span>
      </div>

      {/* Middle Section */}

      <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 mt-4 lg:mt-0">
        <Link
          to="/admin"
          className="bg-[#0076FF] backdrop-blur-sm hover:bg-[#0076FF] shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white"
        >
          Dashboard
        </Link>
        <Link
          className="bg-[#0076FF] backdrop-blur-sm hover:bg-[#0076FF] shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white"
          to="/admin/add-scholarship"
        >
          Add Scholarship
        </Link>
        <Link
          to="/admin/list-scholarships"
          className="bg-[#0076FF] backdrop-blur-sm hover:bg-[#0076FF] shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white"
        >
          View Applicants
        </Link>
        <Link
          to="/admin/profile"
          className="bg-[#0076FF] backdrop-blur-sm hover:bg-[#0076FF] shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white"
        >
          Admin Profile
        </Link>
      </div>

      {/* Right Section */}
      <div className="mt-4 lg:mt-0">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-red-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
