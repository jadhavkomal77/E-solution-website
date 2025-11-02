
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/User.js";

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (!validator.isStrongPassword(password))
      return res.status(400).json({
        message:
          "Weak password. Use number & special char.",
      });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.status(201).json({
      message: "User registered successfully",
      result: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    if (!user.isActive)
      return res.status(403).json({ message: "Account deactivated" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.cookie("user", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      message: "Login successful",
      result: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile fetched successfully", result: user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Logout

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token"); 
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

