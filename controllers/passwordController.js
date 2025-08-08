// import crypto from 'crypto';
import User from "../models/User.js";
// import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs";
import transporter from "../config/nodemail.js";
import dotenv from "dotenv";
dotenv.config();

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is Required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset password OTP",
      text: `Your Otp is ${otp} . Reset your password this OTP`,
    };
    console.log("Email user:", process.env.SENDER_EMAIL);
    console.log("Email pass exists:",process.env.SMTP_PASSWORD);
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Reset Otp Send On Email " });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, Otp, new Passowrd  are required",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }


    if (!user.resetOtp || user.resetOtp.toString() !== otp.toString()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date(user.resetOtpExpireAt).getTime() < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    const hasedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hasedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();
    res.json({ success: true, message: "password reset successfully " });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}; 