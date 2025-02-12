import express from "express";
import { login, logout, signup } from "../controller/authController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("update-profile");
router.get("check");
export default router;
