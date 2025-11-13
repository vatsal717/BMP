
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const registerUser = async (req, res) => {
  console.log("Reached registerUser");
  var { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      res.status(400).send(JSON.stringify("Please Input all the Fields"));
      console.error("Please Input all the Fields");
      return;
    }

    const userExist = await User.findOne({ email: email.toLowerCase() });

    if (userExist) {
      res.status(400).send({
        success: false,
        message: `User already exists`,
      });
      console.error("User already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    try {
      const newUser = new User({
        username,
        email: email.toLowerCase(),
        password,
        role: "student"
      });

      const user = await newUser.save();

      res.status(201).json({
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        pic: user.pic,
        token: generateToken({email: user._id, role: user.role}),
      });
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errMsg: "Something went wrong"
    });
  }
};

module.exports = { registerUser };
