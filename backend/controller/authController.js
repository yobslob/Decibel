import { json } from "express";
import { generateToken } from "../lib/untils.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { firstName, username, email, password, lastName } = req.body;
  try {
    if (!firstName || !username || !email || !password) {
      return res.status(400).json({
        msg: "Invalid inputs.",
      });
    }
    const user =
      (await User.findOne({ email })) | (await User.findOne({ username }));
    if (user) {
      return res.status(400).json({
        msg: "User already present with same email or username",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        msg: "Invalid user details",
      });
    }
  } catch (error) {
    console.log("Error in  signup authController", error.message);
  }
};
