import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const app = express();
dotenv.config();
import userRoutes from "./routes/user.routes.js";

//ports
const port = process.env.PORT || 5000;

//middleware

app.use(express.json());

//database connection function
connectDB();

// routes
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
