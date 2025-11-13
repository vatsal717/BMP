# MongoDB Schema Design for Online Scholarship Portal

## Overview
This document outlines the MongoDB schema design converted from the PostgreSQL relational database schema. The design uses embedded documents and references to maintain data relationships while leveraging MongoDB's document-based structure.

## Collections

### 1. Users Collection
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

### 2. Scholarships Collection
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

### 3. Applicants Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required, references Users.email),
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

### 4. Applicant Documents Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required, references Users.email),
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

### 5. Applications Collection (Applied_in)
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

### 6. Received Scholarships Collection (Received_From)
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

### 7. Forgot Password Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  otp: String (required),
  created_at: Date (required, default: Date.now),
  expires_at: Date (required, default: Date.now + 10 minutes)
}
```

## Indexes

### Users Collection
- `{ email: 1 }` (unique)
- `{ role: 1 }`

### Scholarships Collection
- `{ scholarship_name: 1 }`
- `{ end_date: 1 }`
- `{ education_level: 1 }`

### Applicants Collection
- `{ email: 1 }` (unique)
- `{ category: 1 }`
- `{ "address.state": 1, "address.district": 1 }`

### Applications Collection
- `{ scholarship_id: 1, applicant_id: 1 }` (unique compound)
- `{ applicant_id: 1 }`
- `{ scholarship_id: 1 }`
- `{ status: 1 }`

### Received Scholarships Collection
- `{ scholarship_id: 1, applicant_id: 1 }` (unique compound)
- `{ applicant_id: 1 }`

### Forgot Password Collection
- `{ email: 1 }` (unique)
- `{ expires_at: 1 }` (TTL index for automatic cleanup)

## Migration Notes

1. **Denormalization**: Address, bank, and education details are embedded in the Applicants collection to reduce the need for joins and improve query performance.

2. **References**: Applications and received scholarships use ObjectId references to maintain relationships while allowing for efficient queries.

3. **Data Types**: PostgreSQL SERIAL fields are converted to MongoDB ObjectId. Date fields maintain their Date type.

4. **Constraints**: Unique constraints are maintained through MongoDB unique indexes.

5. **Validation**: Application-level validation will be implemented in the controllers to maintain data integrity.

6. **Performance**: Embedded documents reduce the need for complex joins while maintaining data consistency.

## Benefits of MongoDB Schema

1. **Simplified Queries**: No complex JOINs required
2. **Better Performance**: Embedded documents reduce database round trips
3. **Flexible Schema**: Easy to add new fields without migrations
4. **Horizontal Scaling**: Better support for sharding and replication
5. **Document-based**: Natural fit for JSON-based APIs
