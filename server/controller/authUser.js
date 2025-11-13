const bcrypt = require("bcryptjs");
const { User } = require("../models");
const generateToken = require("../config/generateToken");

const authUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      if (userExists.role !== role) {
        return res
          .status(401)
          .json({
            success: false,
            message: `You don't have a permission as ${role}`,
          });
      }

      bcrypt.compare(
        password,
        userExists.password,
        function (err, response) {
          if (response) {
            return res.status(201).json({
              role: userExists.role,
              username: userExists.username,
              email: userExists.email,
              pic: userExists.pic,
              token: generateToken({email: userExists.email, role: userExists.role}),
            });
          } else {
            console.log(err);
            return res
              .status(401)
              .json({ success: false, message: "Invalid Password" });
          }
        }
      );
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Login failed User not found" });
    }
  } catch (error) {
    console.error("Error in authUser:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const authRole = async (req, res) => {
  const { email, role } = req.body;

  console.log("Reached authRole");

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      if (role === userExists.role) {
        res.status(201).json({
          username: userExists.username,
          email: userExists.email,
          pic: userExists.pic,
          role: userExists.role,
          token: generateToken({email: userExists.email, role: userExists.role}),
        });

        console.log("Login Successful");
      } else {
        return res
          .status(401)
          .json({
            success: false,
            message: `You don't have a permission as ${role}`,
          });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "User not found Please Login" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: err });
  }
};

module.exports = { authUser, authRole };
