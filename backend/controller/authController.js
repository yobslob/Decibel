import { json } from "express";
import { generateToken } from "../lib/untils.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !username || !email || !password) {
      return res.status(400).json({
        msg: "Invalid inputs.",
      });
    }
    const fullName = firstName + " " + lastName;
    const user =
      (await User.findOne({ email })) || (await User.findOne({ username }));
    if (user) {
      return res.status(400).json({
        msg: "User already present with same email or username",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      fullName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({
        msg: "Invalid user details",
      });
    }
  } catch (error) {
    console.log("Error in  signup authController", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Invalid credentials.",
      });
    }
    const iscorrect = await bcrypt.compare(password, user.password);
    if (!iscorrect) {
      return res.status(400).json({
        msg: "Imvalid credentials.",
      });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.log("Error is login controller", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ msg: "logged out succesfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ msg: "Profile pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile controller", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
