import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
    getAllOrders,
    getMyOrders,
    createOrder
} from "../controllers/orderController.js";

const router = express.Router();

// USER: lihat order miliknya sendiri
router.get(
    "/my-orders",
    authMiddleware,
    roleMiddleware("user"),
    getMyOrders
);

// ADMIN: lihat semua order
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getAllOrders
);

// USER dan ADMIN: buat order
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin", "user"),
    createOrder
);

export default router;