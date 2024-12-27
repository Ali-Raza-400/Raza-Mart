import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const app = express();
dotenv.config();
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//ports
const port = process.env.PORT || 5000;

//middleware
app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.options("*", cors());

//database connection function
connectDB();

app.get('/', (req, res) => {
  res.send('API is running....');
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/review", reviewRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
