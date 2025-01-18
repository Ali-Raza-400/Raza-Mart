import express from "express";
import { protect } from "../middlewares/auth.js";
import { addWhishlist, deleteWishlist, getWhishList } from "../controllers/whishlist.controller.js";
const router = express.Router();


router.route("/getall/:userId").get(protect,getWhishList);
router.route("/add").post(protect,addWhishlist);
router.route("/wishlist").delete(deleteWishlist);

export default router;