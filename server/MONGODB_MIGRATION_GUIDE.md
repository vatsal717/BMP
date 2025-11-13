# MongoDB Schema for Online Scholarship Portal

## Overview
This document provides the complete MongoDB schema design for the Online Scholarship Portal, converted from PostgreSQL. The schema uses embedded documents and references to maintain data relationships while leveraging MongoDB's document-based structure.

## Environment Setup

### 1. Install MongoDB Dependencies
```bash
cd server
npm install mongoose
```

### 2. Environment Variables
Update your `.env` file to include MongoDB connection string:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/osp
# or for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/osp

# Keep existing environment variables
PORT=8080
user=your_email@gmail.com
pass=your_app_password
```

### 3. Database Connection
The application will automatically connect to MongoDB when the server starts.

## Collections and Schemas

### 1. Users Collection
**Purpose**: Store user authentication information
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  username: String (required),
  password: String (required),
  role: String (required, enum: ["student", "admin"]),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ email: 1 }` (unique)
- `{ role: 1 }`

### 2. Scholarships Collection
**Purpose**: Store scholarship information
```javascript
{
  _id: ObjectId,
  scholarship_name: String (required),
  amount: Number (required),
  end_date: Date (required),
  description: String (required),
  education_level: String (required),
  eligible_courses: String (required),
  min_percentage: Number (required),
  annual_family_income: Number (required),
  benefits: String,
  note: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ scholarship_name: 1 }`
- `{ end_date: 1 }`
- `{ education_level: 1 }`

### 3. Applicants Collection
**Purpose**: Store comprehensive applicant information with embedded documents
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  first_name: String (required),
  middle_name: String,
  last_name: String (required),
  dob: String (required),
  gender: String (required),
  category: String (required),
  mobile_number: String (required),
  parent_name: String (required),
  occupation: String,
  income: String (required),
  parent_mobile: String,
  current_semester: String (required),
  year_of_admission: String (required),
  current_cgpa_obtained: String (required),
  current_cgpa_total: String (required),
  
  // Embedded Address Document
  address: {
    street_address: String (required),
    pin_code: String (required),
    district: String (required),
    state: String (required)
  },
  
  // Embedded Bank Details Document
  bank_details: {
    bank_account_no: String (required),
    ifsc_code: String (required),
    bank_name: String (required),
    branch_name: String (required)
  },
  
  // Embedded Education Details Document
  education_details: {
    department_name: String (required),
    program_name: String (required),
    tuition_fees: Number (required),
    non_tuition_fees: Number (required)
  },
  
  // Embedded Class 10 Details Document
  class10_details: {
    institute_name: String (required),
    passing_date: String (required),
    marks_obtained: Number (required),
    total_marks: Number (required)
  },
  
  // Embedded Class 12 Details Document
  class12_details: {
    institute_name: String (required),
    passing_date: String (required),
    marks_obtained: Number (required),
    total_marks: Number (required)
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ email: 1 }` (unique)
- `{ category: 1 }`
- `{ "address.state": 1, "address.district": 1 }`

### 4. Applicant Documents Collection
**Purpose**: Store document URLs for applicants
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  income_certificate: String,
  bank_passbook: String,
  aadhar_card: String,
  tuition_fee_receipt: String,
  non_tuition_fee_receipt: String,
  class_10_mark_sheet: String,
  class_12_mark_sheet: String,
  current_education_mark_sheet: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ email: 1 }` (unique)

### 5. Applications Collection
**Purpose**: Track scholarship applications
```javascript
{
  _id: ObjectId,
  scholarship_id: ObjectId (required, references Scholarships._id),
  applicant_id: ObjectId (required, references Applicants._id),
  applied_date: Date (required),
  status: String (required, enum: ["pending", "approved", "rejected", "under_review"]),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ scholarship_id: 1, applicant_id: 1 }` (unique compound)
- `{ applicant_id: 1 }`
- `{ scholarship_id: 1 }`
- `{ status: 1 }`

### 6. Received Scholarships Collection
**Purpose**: Track scholarship disbursements
```javascript
{
  _id: ObjectId,
  scholarship_id: ObjectId (required, references Scholarships._id),
  applicant_id: ObjectId (required, references Applicants._id),
  amount_received: Number (required, min: 0),
  received_date: Date (required),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ scholarship_id: 1, applicant_id: 1 }` (unique compound)
- `{ applicant_id: 1 }`

### 7. Forgot Password Collection
**Purpose**: Store OTP for password reset
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  otp: String (required),
  created_at: Date (required),
  expires_at: Date (required)
}
```

**Indexes**:
- `{ email: 1 }` (unique)
- `{ expires_at: 1 }` (TTL index for automatic cleanup)

## Key Changes from PostgreSQL

### 1. **Denormalization Strategy**
- **Address, Bank, Education Details**: Embedded in Applicants collection
- **Class 10/12 Details**: Embedded in Applicants collection
- **Benefits**: Reduces joins, improves query performance, maintains data consistency

### 2. **Reference Management**
- **Applications**: Uses ObjectId references to Scholarships and Applicants
- **Received Scholarships**: Uses ObjectId references for tracking disbursements

### 3. **Data Type Conversions**
- **SERIAL fields** → **ObjectId** (MongoDB's primary key)
- **DATE fields** → **Date** (maintained)
- **VARCHAR fields** → **String** (maintained)
- **INTEGER fields** → **Number** (maintained)

### 4. **Constraint Handling**
- **Unique constraints** → **Unique indexes**
- **Foreign key constraints** → **Application-level validation**
- **Check constraints** → **Schema validation**

## Migration Benefits

### 1. **Performance Improvements**
- **No complex JOINs**: Embedded documents eliminate need for joins
- **Faster queries**: Single document retrieval vs multiple table joins
- **Better caching**: Document-based caching is more efficient

### 2. **Scalability**
- **Horizontal scaling**: MongoDB supports sharding
- **Flexible schema**: Easy to add new fields without migrations
- **Document-based**: Natural fit for JSON APIs

### 3. **Development Benefits**
- **Simplified queries**: No complex SQL joins
- **Better error handling**: MongoDB provides detailed error messages
- **Flexible data modeling**: Easy to modify schema as requirements change

## Sample Queries

### 1. **Get Applicant with All Details**
```javascript
const applicant = await Applicant.findOne({ email: "user@example.com" });
// Returns complete applicant data with embedded documents
```

### 2. **Get Scholarships with Application Count**
```javascript
const scholarships = await Scholarship.aggregate([
  {
    $lookup: {
      from: "applications",
      localField: "_id",
      foreignField: "scholarship_id",
      as: "applications"
    }
  },
  {
    $project: {
      scholarship_name: 1,
      amount: 1,
      end_date: 1,
      applicants_count: { $size: "$applications" }
    }
  }
]);
```

### 3. **Get Applications for a User**
```javascript
const applications = await Application.aggregate([
  {
    $lookup: {
      from: "scholarships",
      localField: "scholarship_id",
      foreignField: "_id",
      as: "scholarship"
    }
  },
  {
    $lookup: {
      from: "applicants",
      localField: "applicant_id",
      foreignField: "_id",
      as: "applicant"
    }
  },
  {
    $match: {
      "applicant.email": "user@example.com"
    }
  }
]);
```

## Installation and Setup

### 1. **Install MongoDB**
```bash
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

### 2. **Start MongoDB**
```bash
# macOS/Linux
mongod

# Windows
mongod.exe
```

### 3. **Install Dependencies**
```bash
cd server
npm install
```

### 4. **Run the Application**
```bash
npm start
```

## Testing the Migration

### 1. **Test User Registration**
```bash
curl -X POST http://localhost:8080/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### 2. **Test User Login**
```bash
curl -X POST http://localhost:8080/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","role":"student"}'
```

### 3. **Test Scholarship Creation**
```bash
curl -X POST http://localhost:8080/api/scholarship/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"scholarship_name":"Test Scholarship","amount":50000,"end_date":"2024-12-31","description":"Test description","education_level":"Undergraduate","eligible_courses":"Engineering","min_percentage":75,"annual_family_income":500000}'
```

## Troubleshooting

### 1. **Connection Issues**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env` file
- Verify MongoDB port (default: 27017)

### 2. **Schema Validation Errors**
- Check required fields in model definitions
- Ensure data types match schema expectations
- Review embedded document structure

### 3. **Index Issues**
- Verify unique indexes are properly created
- Check for duplicate key errors
- Ensure TTL indexes are working correctly

## Conclusion

The migration from PostgreSQL to MongoDB provides significant benefits in terms of performance, scalability, and development flexibility. The embedded document approach reduces complexity while maintaining data integrity through proper schema design and validation.

All controller functions have been updated to use MongoDB operations, and the application maintains the same API interface, ensuring seamless integration with the existing frontend.
