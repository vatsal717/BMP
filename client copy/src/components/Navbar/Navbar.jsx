import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import logo from "../assets/logo.png";

const NavbarStudent = () => {
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
    <nav className="flex items-center  bg-white shadow-xl px-6 py-4">
      {location.pathname !== "/student" && (
        <button
          onClick={handleBack}
          className="bg-[#0076FF] backdrop-blur-sm rounded-full shadow-lg px-2.5 py-2.5 text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
      <div as={Link} to="/">
        <img
          src={logo}
          alt="Scholarship Logo"
          className="w-24 h-30 animate-pulse-grow pl-10"
        />
      </div>
      <div className="whitespace-nowrap text-2xl font-bold pl-4 text-black drop-shadow-sm">
        OSP-Student 
      </div>

      <div className="flex items-center gap-6 ml-6">
        <Link
          className="bg-[#0076FF] backdrop-blur-sm m-1 shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white/20"
          to="/student"
        >
          Dashboard
        </Link>

        <Link
          to="/student/scholarship"
          className="bg-[#0076FF] backdrop-blur-sm m-1 shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white/20"
        >
          Apply For Scholarship
        </Link>

        <Link
          to="/student/profile"
          className="bg-[#0076FF] backdrop-blur-sm m-1 shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white/20"
        >
          Profile
        </Link>
        <Link
          to="/faqs"
          className="bg-[#0076FF] backdrop-blur-sm m-1 shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white/20"
        >
          FAQs
        </Link>

        <button
          onClick={handleLogout}
          className=" pl-72 bg-red-500 hover:bg-red-600 px-5 py-2.5 justify-content:right rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-red-400/20"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavbarStudent;
