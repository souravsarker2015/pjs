const { createJsonWebToken } = require("../middleware/jsonWebToken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Add an Admin User
exports.addAdmin = async (req, res) => {
  try {
    const { name, username, password, phone, email, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const bcrypt_password = await bcrypt.hash(password, salt);

    // Create the new admin user
    const result = await User.create({
      name,
      username,
      phone,
      email,
      role,
      password: bcrypt_password,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Delete an Admin User
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Administrator not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Administrator deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    // Create JWT
    const accessToken = createJsonWebToken(
      { id: user._id, username: user.username, role: user.role },
      "6h"
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Information
exports.getLoggedUser = async (req, res) => {
  try {
    // Validate that req.user exists
    if (!req.user || !req.user.username) {
      return res.json({
        success: false,
        message: "Invalid token or user data",
      });
    }

    // Find user by the username in the token
    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Users (Admins)
exports.getUsers = async (req, res) => {
  try {
    // Fetch all users
    const result = await User.find({});

    // Check if no users were found
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No administrators found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All administrators retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
