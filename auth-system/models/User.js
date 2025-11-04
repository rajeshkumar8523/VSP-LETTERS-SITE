// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  resetToken: { type: String },
  resetTokenExpire: { type: Date },
});

export default mongoose.model("User", userSchema);
