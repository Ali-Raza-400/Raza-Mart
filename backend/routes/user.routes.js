import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controllers.js";
import { protect } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(registerUser).get(loginUser);
router.route("/logout").get(logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
