import express from "express";
import { admin, protect } from "../middlewares/auth.js";
import { getProducts, getSingleProduct, saveProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.route("/add").post(protect,admin,saveProduct);
router.route("/single/:id").get(protect,getSingleProduct);
router.route("/all").get(protect,getProducts);
// router.route("/update").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
