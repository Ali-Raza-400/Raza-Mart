import mongoose from "mongoose";
import asyncHandler from "../middlewares/asynchandler.js";
import Product from "../models/product.model.js";

const saveProduct = asyncHandler(async (req, res) => {
  const { name, price, description,categories ,image} = req.body;
  const product = new Product({ name, price, description, user: req.user._id,categories,image });
  const createProduct = await product.save();
  res.status(200).json(createProduct);
});
const getProducts = asyncHandler(async (req, res)=>{
   const products= await Product.find()

    res.status(200).json(products)
})
const getSingleProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ msg: "Invalid product ID" });
    }

    console.log("productId:::", productId);

    const product = await Product.findById(productId);

    if (!product) {
        console.log("I am in :::");
        return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(product);
});
const getSingleProductByCat = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ msg: "Invalid product ID" });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ msg: "Product not found" });
    }

    // Filter other products by shared categories
    const productByCat = await Product.find({
        categories: { $in: product.categories }, // Matches any category in the array
        _id: { $ne: productId }, // Exclude the current product
    });

    if (productByCat.length === 0) {
        return res.status(404).json({ msg: "No related products found" });
    }

    res.status(200).json(productByCat);
});

export { saveProduct ,getProducts,getSingleProduct,getSingleProductByCat};
