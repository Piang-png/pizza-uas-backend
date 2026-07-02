import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connection from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import roleMiddleware from "./middleware/roleMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// HOME
app.get("/", (req, res) => {
  res.send("API jalan");
});


// PRODUCT ROUTES
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);

app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});


// START SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server berjalan di port ${process.env.PORT || 3000}`);
});