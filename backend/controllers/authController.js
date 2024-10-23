
import mongoose from "mongoose";
import generateTokenAndSetCookie from "../jwt/generateToken.js";
import User from "../models/model.js";
import bcrypt from "bcryptjs";
// Handle signup logic
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    console.log(req.body);
    
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

    
    if (newUser) {
      
      //generate the jwt token
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

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
    console.log("Error in authController " + error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Handle login logic
export const login = async(req, res) => {
try {
  const { username, password } = req.body;

  const user = await User.findOne({username});
  const isCorrectPassword = await bcrypt.compare(password, user?.password || "" );

  if (!user || !isCorrectPassword) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  //generate token and set cookie
  generateTokenAndSetCookie(user._id, res);
  
  // res.status(200).json({ message: "Login successful!", user });
  res.status(200).json({
    message: "login successful! ",
    _id: user._id,
    fullName : user.fullName,
    username : user.username,
    profilePic : user.profilePic
  })
  console.log(`${user.username} connected.`)
} catch (error) {
  console.log("Auth Controller Error: " + error.message);
  res.status(500).json({message: "Internal Server Error. "});
}
};

export const logout =  (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.log("Error in logout controller", error);
		res.status(500).json({ error: "Internal Server Error" });

  }
}