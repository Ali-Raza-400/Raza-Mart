import asyncHandler from "../middlewares/asynchandler.js";
import dotenv from 'dotenv';
import Wishlist from "../models/whishlist.model.js";
dotenv.config()

const addWhishlist = asyncHandler(async (req, res) => {
  // const userId = "6739e2a44a06b97bb3903ad2";
  // const productId = "6739eb01149b4c0085d6d598";
  const { userId, productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ user: userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
      await wishlist.save();
      return res.status(200).json({ message: "Product added to wishlist." });
    }

    if (wishlist.products.includes(productId)) {
      return res.status(200).json({ message: "Product is already in the wishlist." });
    }

    wishlist.products.push(productId);
    await wishlist.save();
    res.status(200).json({ message: "Product added to wishlist." });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const deleteWishlist = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
    }
    res.status(200).json({ message: "Product removed from wishlist." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

const getWhishList = asyncHandler(async (req, res) => {

  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate("products");
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

export { addWhishlist, deleteWishlist, getWhishList };
