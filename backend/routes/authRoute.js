import express from "express";
import { signup } from "../controller/authController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login");
router.post("/logout");
router.put("update-profile");
router.get("check");
export default router;
