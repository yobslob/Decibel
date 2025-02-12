import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "../routes/authRoute.js";
import { connectDB } from "../config/db.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Your frontend URL
    credentials: true, // Allow credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Backend connected to", PORT);
  });
});
