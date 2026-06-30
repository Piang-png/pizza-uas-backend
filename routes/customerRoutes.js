import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from "../controllers/customerController.js";

const router = express.Router();

// Hanya Admin
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getAllCustomers
);

// Hanya Admin
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    getCustomerById
);

// Hanya Admin
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createCustomer
);

// Hanya Admin
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateCustomer
);

// Hanya Admin
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteCustomer
);

export default router;