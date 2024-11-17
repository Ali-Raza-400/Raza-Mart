import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    categories: {
        type: [String], // Array of strings
        enum: ["Electronics", "Clothing", "Home Appliances", "Books", "Gadgets","Sports"], // Predefined categories
        validate: {
          validator: function (arr) {
            return arr.length > 0; // Ensures at least one category is provided
          },
          message: "A product must have at least one category.",
        },
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
