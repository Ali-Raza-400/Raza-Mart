import express from "express";
import { admin, protect } from "../middlewares/auth.js";
import { getProducts, getSingleProduct, getSingleProductByCat, saveProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.route("/add").post(protect,admin,saveProduct);
router.route("/single/:id").get(protect,getSingleProduct);
router.route("/product-by-cat/:id").get(protect,getSingleProductByCat);
router.route("/all").get(protect,getProducts);
// router.route("/update").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
