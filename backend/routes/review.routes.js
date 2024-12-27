import express from "express";
import { protect } from "../middlewares/auth.js";
import { getReviewByProductId, getReviews, saveReview } from "../controllers/review.controller.js";
const router = express.Router();


router.route("/add").post(protect,saveReview);
router.route("/all").get(protect,getReviews);
router.route("/:id").get(protect,getReviewByProductId);

export default router;