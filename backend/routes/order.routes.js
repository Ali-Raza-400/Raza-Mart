import express from "express";
import { protect } from "../middlewares/auth.js";
import { addOrderItems, getTranscationHistory } from "../controllers/order.controller.js";
const router = express.Router();


router.route("/pay").post(protect,addOrderItems);
router.route("/transction-hostory").get(getTranscationHistory);

export default router;