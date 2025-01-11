import express from "express";
import { protect } from "../middlewares/auth.js";
import getSalesData, { getUserCreationStats } from "../controllers/dashboard.controller.js";
import { updateStatusMigration } from "../controllers/order.controller.js";
const router = express.Router();


router.route("/user-stats").get(protect,getUserCreationStats);
router.route("/sale-stats").get(protect,getSalesData);
router.route("/update-payment-status").put(protect,updateStatusMigration);


export default router;