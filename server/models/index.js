const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "admin"],
    default: "student"
  }
}, {
  timestamps: true
});

// Scholarship Schema
const scholarshipSchema = new mongoose.Schema({
  scholarship_name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  end_date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  education_level: {
    type: String,
    required: true
  },
  eligible_courses: {
    type: String,
    required: true
  },
  min_percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  annual_family_income: {
    type: Number,
    required: true,
    min: 0
  },
  benefits: {
    type: String,
    default: ""
  },
  note: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

// Applicant Schema
const applicantSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  middle_name: {
    type: String,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  mobile_number: {
    type: String,
    required: true
  },
  parent_name: {
    type: String,
    required: true
  },
  occupation: {
    type: String
  },
  income: {
    type: String,
    required: true
  },
  parent_mobile: {
    type: String
  },
  current_semester: {
    type: String,
    required: true
  },
  year_of_admission: {
    type: String,
    required: true
  },
  current_cgpa_obtained: {
    type: String,
    required: true
  },
  current_cgpa_total: {
    type: String,
    required: true
  },
  
  // Embedded Address Document
  address: {
    street_address: {
      type: String,
      required: true
    },
    pin_code: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  
  // Embedded Bank Details Document
  bank_details: {
    bank_account_no: {
      type: String,
      required: true
    },
    ifsc_code: {
      type: String,
      required: true
    },
    bank_name: {
      type: String,
      required: true
    },
    branch_name: {
      type: String,
      required: true
    }
  },
  
  // Embedded Education Details Document
  education_details: {
    department_name: {
      type: String,
      required: true
    },
    program_name: {
      type: String,
      required: true
    },
    tuition_fees: {
      type: Number,
      required: true
    },
    non_tuition_fees: {
      type: Number,
      required: true
    }
  },
  
  // Embedded Class 10 Details Document
  class10_details: {
    institute_name: {
      type: String,
      required: true
    },
    passing_date: {
      type: String,
      required: true
    },
    marks_obtained: {
      type: Number,
      required: true
    },
    total_marks: {
      type: Number,
      required: true
    }
  },
  
  // Embedded Class 12 Details Document
  class12_details: {
    institute_name: {
      type: String,
      required: true
    },
    passing_date: {
      type: String,
      required: true
    },
    marks_obtained: {
      type: Number,
      required: true
    },
    total_marks: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true
});

// Applicant Documents Schema
const applicantDocumentsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  income_certificate: String,
  bank_passbook: String,
  aadhar_card: String,
  tuition_fee_receipt: String,
  non_tuition_fee_receipt: String,
  class_10_mark_sheet: String,
  class_12_mark_sheet: String,
  current_education_mark_sheet: String
}, {
  timestamps: true
});

// Applications Schema (Applied_in)
const applicationSchema = new mongoose.Schema({
  scholarship_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholarship',
    required: true
  },
  applicant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant',
    required: true
  },
  applied_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved", "rejected", "under_review"],
    default: "pending"
  }
}, {
  timestamps: true
});

// Received Scholarships Schema (Received_From)
const receivedScholarshipSchema = new mongoose.Schema({
  scholarship_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholarship',
    required: true
  },
  applicant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant',
    required: true
  },
  amount_received: {
    type: Number,
    required: true,
    min: 0
  },
  received_date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

// Forgot Password Schema
const forgotPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  expires_at: {
    type: Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
  }
});

// Create indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

scholarshipSchema.index({ scholarship_name: 1 });
scholarshipSchema.index({ end_date: 1 });
scholarshipSchema.index({ education_level: 1 });

applicantSchema.index({ email: 1 }, { unique: true });
applicantSchema.index({ category: 1 });
applicantSchema.index({ "address.state": 1, "address.district": 1 });

applicationSchema.index({ scholarship_id: 1, applicant_id: 1 }, { unique: true });
applicationSchema.index({ applicant_id: 1 });
applicationSchema.index({ scholarship_id: 1 });
applicationSchema.index({ status: 1 });

receivedScholarshipSchema.index({ scholarship_id: 1, applicant_id: 1 }, { unique: true });
receivedScholarshipSchema.index({ applicant_id: 1 });

forgotPasswordSchema.index({ email: 1 }, { unique: true });
forgotPasswordSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Create models
const User = mongoose.model("User", userSchema);
const Scholarship = mongoose.model("Scholarship", scholarshipSchema);
const Applicant = mongoose.model("Applicant", applicantSchema);
const ApplicantDocument = mongoose.model("ApplicantDocument", applicantDocumentsSchema);
const Application = mongoose.model("Application", applicationSchema);
const ReceivedScholarship = mongoose.model("ReceivedScholarship", receivedScholarshipSchema);
const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema);

module.exports = {
  User,
  Scholarship,
  Applicant,
  ApplicantDocument,
  Application,
  ReceivedScholarship,
  ForgotPassword
};
