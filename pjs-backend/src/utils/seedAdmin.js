const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// Create the default admin from ADMIN_USERNAME / ADMIN_PASSWORD if it doesn't exist yet
exports.seedAdmin = async () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.log("ADMIN_USERNAME or ADMIN_PASSWORD not set, skipping admin seed");
    return;
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log(`Admin user "${username}" already exists`);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const bcrypt_password = await bcrypt.hash(password, salt);

    await User.create({
      name: username,
      username,
      role: "admin",
      password: bcrypt_password,
    });

    console.log(`Admin user "${username}" created`);
  } catch (error) {
    console.error("Admin seed failed:", error.message);
  }
};
