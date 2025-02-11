import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "../routes/authRoute.js";
import { connectDB } from "../config/db.js";
import cors from "cors";
const PORT = process.env.PORT;
console.log(PORT);
dotenv.config();
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Backdend connected to ", PORT);
  });
});
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
