import mongoose from "mongoose";
import asyncHandler from "../middlewares/asynchandler.js";
import Review from "../models/review.model.js";

const saveReview = asyncHandler(async (req, res) => {
//   const { name, price, description,categories ,image} = req.body;
  const review = new Review(req.body);
  const createReview = await review.save();
  res.status(200).json(createReview);
});

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
});

const getReviewByProductId = asyncHandler(async (req, res) => {
    const product_id = req.params.id;
    const review = await Review.find({product:product_id});
    if (!review) {
        return res.status(404).json({ msg: "Review not found" });
    }
    res.status(200).json(review);
});

export { saveReview, getReviews, getReviewByProductId };