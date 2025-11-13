import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./Navbar";
import { ToastContainer, toast, Slide, Bounce } from "react-toastify";
import { buildApiUrl, API_ENDPOINTS } from "../../config/apiConfig.js";

const AdminAddScholarship = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const education_levels = ["B.Tech", "M.Tech", "M.Sc", "M.Des", "Ph.D"];
  const eligible_coursesOptions = {
    "B.Tech": ["B.Tech ICT", "B.Tech ICT with CS", "B.Tech MnC", "B.Tech EVD"],
    "M.Tech": [
      "M.Tech Machine Learning",
      "M.Tech Software Systems",
      "M.Tech VLSI and Embedded Systems",
    ],
    "M.Sc": ["M.Sc IT", "M.Sc AA", "M.Sc DS"],
    "M.Des": ["M.Des CD"],
    "Ph.D": ["Ph.D Regular", "Ph.D Rolling"],
  };
  const [formData, setFormData] = useState({
    scholarship_name: "",
    amount: "",
    end_date: "",
    description: "",
    education_level: "",
    eligible_courses: [],
    min_percentage: "",
    annual_family_income: "",
    benefits: "",
    note: "",
  });

  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    if (formData.education_level) {
      setAvailableCourses(eligible_coursesOptions[formData.education_level]);
    } else {
      setAvailableCourses([]);
    }
  }, [formData.education_level]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "amount" || name === "annual_family_income") && value < 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: 0,
      }));
      return;
    }

    if (name === "min_percentage") {
      const numericValue = parseFloat(value);
      if (
        numericValue < 0 ||
        numericValue > 10 ||
        !/^\d*(\.\d{0,2})?$/.test(value)
      ) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;

    if (!formData.eligible_courses.includes(selectedCourse)) {
      setFormData((prevData) => ({
        ...prevData,
        eligible_courses: [...prevData.eligible_courses, selectedCourse],
      }));
    }
  };

  const removeCourse = (courseToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      eligible_courses: prevData.eligible_courses.filter(
        (course) => course !== courseToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let form = formData;
      form.eligible_courses = JSON.stringify(form.eligible_courses);
      const formct = JSON.stringify(form);
      const response = await fetch(
        buildApiUrl(API_ENDPOINTS.SCHOLARSHIP.ADD_SCHOLARSHIP),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userInfo.token}`,
          },
          body: formct,
        }
      );

      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        toast.success("Added Scholarship Successfully");
        setTimeout(() => {
          navigate("/admin");
        }, 100);
      } else {
        toast.error("Submission failed: " + data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred while submitting.");
    }
  };

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const istDate = tomorrow.toLocaleString("en-IN", options);
    const [day, month, year] = istDate.split("/");
    return `${year}-${month}-${day}`;
  };

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
      <div className="flex-col p-8 min-h-screen flex items-center justify-center bg-[#0076FF] ">
        <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Add Scholarship
        </h1>
        <div className="bg-[#FFFFFF] rounded-3xl p-8 shadow-xl w-full max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scholarship Name */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2 required">
                  Scholarship Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="scholarship_name"
                  value={formData.scholarship_name}
                  onChange={handleChange}
                  required
                  className=" bg-white backdrop-blur-sm text-black p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Amount */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2 required">
                  Amount<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "+") {
                      e.preventDefault();
                    }
                  }}
                  min="0"
                  required
                  className=" bg-white backdrop-blur-sm text-black p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2 required">
                  End Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  min={getTomorrowDate()}
                  required
                  className=" bg-white backdrop-blur-sm text-black p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Description */}
              <div className="col-span-1 md:col-span-2 flex flex-col">
                <label className="text-black font-medium mb-2 required">
                  Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className=" bg-white backdrop-blur-sm text-black p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            <h3 className="text-xl font-medium text-black">
              Eligibility Criteria
            </h3>

            {/* Eligibility Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education Level */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2 required">
                  Education Level
                </label>
                <select
                  name="education_level"
                  value={formData.education_level}
                  onChange={handleChange}
                  required
                  className="bg-white backdrop-blur-sm text-black p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="" disabled>
                    Select Education Level
                  </option>
                  {education_levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Eligible Courses */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2 required ">
                  Select Eligible Courses
                </label>
                <select
                  onChange={handleCourseChange}
                  value=""
                  disabled={!formData.education_level}
                  className="bg-[#FFFFFF]  backdrop-blur-sm text-black p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="" disabled>
                    {formData.education_level
                      ? "Select a course"
                      : "Select Education Level first"}
                  </option>
                  {availableCourses.map((course) => (
                    <option key={course} value={course} className="">
                      {course}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(formData.eligible_courses) &&
                    formData.eligible_courses.map((course) => (
                      <span
                        key={course}
                        className="bg-white text-black py-1 px-3 rounded-lg shadow-md flex items-center gap-2"
                      >
                        {course}
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeCourse(course)}
                        >
                          x
                        </button>
                      </span>
                    ))}
                </div>
              </div>

              {/* Minimum Percentage */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2 required">
                  Minimum Percentage (CPI)
                </label>
                <input
                  type="number"
                  name="min_percentage"
                  value={formData.min_percentage}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "+") {
                      e.preventDefault();
                    }
                  }}
                  min="0"
                  max="10"
                  step="0.01"
                  required
                  className=" bg-white backdrop-blur-sm text-black p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Annual Family Income */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2 required">
                  Annual Family Income
                </label>
                <input
                  type="number"
                  name="annual_family_income"
                  value={formData.annual_family_income}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "+") {
                      e.preventDefault();
                    }
                  }}
                  min="0"
                  required
                  className=" bg-white backdrop-blur-sm text-black p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col">
              <label className="text-black font-medium mb-2">Benefits</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                className=" bg-white backdrop-blur-sm text-black p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Note */}
            <div className="flex flex-col">
              <label className="text-black font-medium mb-2">Note</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className=" bg-white backdrop-blur-sm text-black p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className=" hover: bg-[#0d80f6] backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddScholarship;
