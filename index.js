import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connection from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// HOME
app.get("/", (req, res) => {
  res.send("API Pizza jalan");
});


// PRODUCT ROUTES
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);


// START SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server berjalan di port ${process.env.PORT || 3000}`);
});