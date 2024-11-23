import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const app = express();
dotenv.config();
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';

//ports
const port = process.env.PORT || 5000;

//middleware
app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.options("*", cors());

//database connection function
connectDB();

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  console.log("__dirname:::",__dirname);
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  // const __dirname = path.resolve();
  // app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
