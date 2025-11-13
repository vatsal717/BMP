const { User } = require("../models");

const getUserProfile = async (req, res) => {
  console.log('Reached User Profile');
  const email = req.query.email; // email is passed as a query parameter
  console.log(email);
  
  try {
    // Select only the email and username columns where role is "admin"
    const user = await User.findOne({ 
      email: email.toLowerCase(), 
      role: "student" 
    }).select('email username');

    if (!user) {
      return res.status(404).json({ message: "Admin user not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  const { email, name } = req.body; // Only accept email and name from the request body
  console.log('Reached Update User Profile');
  
  try {
    // Validate input
    if (!email || !name) {
      return res.status(400).json({ error: "Email and Name are required" });
    }

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { username: name },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getUserProfile, updateUserProfile };