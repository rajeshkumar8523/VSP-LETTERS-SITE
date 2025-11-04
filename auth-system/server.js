import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// ✅ Allow requests from your frontend
app.use(cors({
  origin: ["https://vspaze-letters-site.web.app"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
