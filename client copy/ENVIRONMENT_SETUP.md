# Frontend Environment Setup Guide

## Environment Variables Setup

Create a `.env` file in your `client copy` directory with the following content:

```env
# Backend API URL - Change this to your backend URL
REACT_APP_BACKEND_URL=https://group7-osp.onrender.com

# For local development, you can use:
# REACT_APP_BACKEND_URL=http://localhost:8080

# For production, use your deployed backend URL:
# REACT_APP_BACKEND_URL=https://your-backend-url.com
```

## Usage

The backend URL is now centralized in `/src/config/apiConfig.js`. All components will automatically use the environment variable `REACT_APP_BACKEND_URL` if set, otherwise it will fallback to the default URL.

## Benefits

1. **Centralized Configuration**: All API endpoints are defined in one place
2. **Environment-based**: Different URLs for development, staging, and production
3. **Easy Maintenance**: Change the backend URL in one place
4. **Type Safety**: Helper functions for building URLs

## Files Updated

All frontend files have been updated to use the centralized configuration:
- LoginRegister.jsx
- Profile.jsx
- viewScholarshipStudent.jsx
- StudentDashboard.jsx
- Apply_Dashboard.jsx
- Admin components
- And more...

## Testing

After updating the `.env` file, restart your React development server:

```bash
npm start
```

The application will now use the backend URL from your environment variables.
