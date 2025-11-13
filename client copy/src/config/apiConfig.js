// Backend API Configuration
// This file centralizes all backend API endpoints

const config = {
  // Backend URL - can be overridden by environment variables
  BACKEND_URL:  "http://localhost:8080",
  
  // API Endpoints
  API_ENDPOINTS: {
    // User endpoints
    USER: {
      LOGIN: "/api/user/login",
      REGISTER: "/api/user/register",
      PROFILE: "/api/user/profile",
      GET_PROFILE: "/api/user/getprofile/",
      UPDATE_PROFILE: "/api/user/updateuserprofile/",
      GET_USER_PROFILE: "/api/user/getuserprofile/",
      GET_EMAIL: "/api/user/getemail/",
      GET_APPLICANT_ID: "/api/user/getApplicantId/",
      GET_PDF_URLS: "/api/user/getpdfurls/",
      PDF_UPLOAD: "/api/user/pdf",
      CLEAR_PDF: "/api/user/clearpdf",
      GET_LIST_FOR_APPLY: "/api/user/getlistforApplyscholarships/",
      GET_APPLIED_SCHOLARSHIPS: "/api/user/getAppliedScholarships",
      APPLY_FOR_SCHOLARSHIP: "/api/user/applyForScholarship",
      VIEW_SCHOLARSHIP: "/api/user/viewscholarship"
    },
    
    // Scholarship endpoints
    SCHOLARSHIP: {
      GET_SCHOLARSHIPS: "/api/scholarship/getScholarships",
      ADD_SCHOLARSHIP: "/api/scholarship/addScholarship",
      EDIT_SCHOLARSHIP: "/api/scholarship/editScholarship",
      DELETE_SCHOLARSHIP: "/api/scholarship/deleteScholarship",
      GET_SCHOLARSHIP: "/api/scholarship/getScholarship",
      GET_APPLICANTS: "/api/scholarship",
      GET_APPLICANT_DATA: "/api/scholarship/getApplicantData",
      STATUS_UPDATE: "/api/scholarship/statusUpdate"
    },
    
    // Password reset endpoints
    PASSWORD_RESET: {
      SEND_EMAIL: "/api/passwordreset/sendemail",
      VALIDATE_OTP: "/api/passwordreset/validateotp",
      SET_PASSWORD: "/api/passwordreset/setpassword"
    }
  }
};

// Helper function to build full URL
export const buildApiUrl = (endpoint) => {
  return `${config.BACKEND_URL}${endpoint}`;
};

// Helper function to get backend URL
export const getBackendUrl = () => {
  return config.BACKEND_URL;
};

// Export the config object
export const API_ENDPOINTS = config.API_ENDPOINTS;
export const backendUrl = config.BACKEND_URL;
export default config;
