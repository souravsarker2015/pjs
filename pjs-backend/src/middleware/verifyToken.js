const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.json({
        success: false,
        message: "You are not logged in",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.json({
        success: false,
        message: "Token has expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.json({
        success: false,
        message: "Invalid token",
      });
    }

    res.json({
      success: false,
      message: "An error occurred",
    });
  }
};
