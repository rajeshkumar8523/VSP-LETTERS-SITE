import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: ["http://localhost:5500", "https://vspaze-letters-site.web.app"],
  methods: ["GET","POST"],
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => res.send("✅ API is live")); // health check
app.use("/api/auth", authRoutes);

connectDB();

// IMPORTANT: Render provides PORT via env var — use it!
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
