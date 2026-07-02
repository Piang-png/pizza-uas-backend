import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
    getAllOrders,
    createOrder
} from "../controllers/orderController.js";

const router = express.Router();

// Hanya admin yang bisa lihat semua order
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getAllOrders
);

// User dan admin yang sudah login bisa membuat order
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin", "user"),
    createOrder
);

export default router;