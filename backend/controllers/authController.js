// Temporary in-memory users data
const users = []; // This will store users in memory (should use a real DB in production)

import User from "../models/model.js";
import bcrypt from "bcryptjs";
// Handle signup logic
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    // Hash the password using bcrypt

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName: fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in authController" + error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Handle login logic
export const login = (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  // Check if the password matches (In production, compare hashed passwords)
  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  res.status(200).json({ message: "Login successful!", user });
};
