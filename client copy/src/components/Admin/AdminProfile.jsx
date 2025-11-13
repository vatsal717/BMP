import React, { useState, useEffect } from "react";
import "./AdminProfile.css";
import axios from "axios";
import { FaLockOpen, FaLock } from "react-icons/fa";
import NavbarAdmin from "./Navbar.jsx";
import { buildApiUrl, API_ENDPOINTS } from "../../config/apiConfig";
const AdminProfile = () => {
  // State to hold profile information

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    photo:
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
  });

  // State to toggle between edit and view modes
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("Reached adminProfile");
      try {
        // Get the logged-in user's email from local storage
        const obj = JSON.parse(localStorage.getItem("userInfo"));
        console.log(obj.email);
        const response = await axios.get(
          buildApiUrl(API_ENDPOINTS.USER.GET_USER_PROFILE),
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userInfo.token}`,
            },
            params: { email: obj.email }, // Pass the dynamic email as a query parameter
          }
        );

        const { email: userEmail, username } = response.data;
        setProfile((prevProfile) => ({
          ...prevProfile,
          name: username,
          email: userEmail,
        }));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Save profile changes
  const handleSave = async () => {
    console.log("Profile saved:", profile);
    try {
      const obj = JSON.parse(localStorage.getItem("userInfo")); // Get the logged-in user's email

      // Ensure that the name field is not empty
      if (!profile.name) {
        console.error("Name cannot be empty");
        return;
      }

      // Send a POST request to update the username only
      const response = await axios.post(
        buildApiUrl(API_ENDPOINTS.USER.UPDATE_PROFILE),
        {
          email: obj.email, // Use the existing email to identify the user
          name: profile.name, // Only update the username
        }
      );

      console.log("Profile updated successfully:", response.data);
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container mt-5">
        <div className="card">
          <div className="card-body text-center">
            <img
              src={profile.photo}
              alt="Admin"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }}
            />
            {isEditing ? (
              <>
                <div className="edit-box">
                  <div className="input-container">
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="form-control mb-2"
                      placeholder="Name"
                    />
                    <FaLockOpen className="icon" />
                  </div>
                </div>
                <div className="edit-box">
                  <div className="input-container">
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      disabled
                      className="form-control mb-3"
                      placeholder="Email (cannot be changed)"
                    />
                    <FaLock className="icon" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3>{profile.name}</h3>
                <p>{profile.email}</p>
              </>
            )}

            <button
              className={`btn ${isEditing ? "btn-success" : "btn-primary"}`}
              onClick={isEditing ? handleSave : toggleEditMode}
            >
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
