import express from "express";
import { protect } from "../middlewares/auth.js";
import { addOrderItems } from "../controllers/order.controller.js";
const router = express.Router();


router.route("/pay").post(protect,addOrderItems);

export default router;