import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
  checkUsername,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/me", authMiddleware, getMe);
authRoutes.get("/check-username/:username", checkUsername);

export default authRoutes;
