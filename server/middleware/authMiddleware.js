const {User} = require("../models");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  console.log("reach at protect");

   console.log("shbouhxdop");

  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      console.log("hbkjsha");
      token = req.headers.authorization.split(" ")[1];
      console.log(token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      const user = await User.findOne({email: decoded.email}).select("-password");
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (user.role !== decoded.role || user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Not an admin" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ mesasge: "Not Authorized, token failed" });
      return;
    }
  }

  if (!token) {
    // console.log("Asdas");
    res.status(401).json({ mesasge: "No token" });
    return;
  }
};

module.exports = protect;
