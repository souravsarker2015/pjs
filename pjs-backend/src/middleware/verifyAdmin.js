const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        message: "You are not logged in",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }
    if (user.role !== "admin") {
      return res.json({
        success: false,
        message: "Forbidden access",
      });
    }
    if (user.role === "admin") {
      next();
    }
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};
