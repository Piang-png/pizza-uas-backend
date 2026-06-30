import express from "express";

import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

// Hanya admin
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createProduct
);

// Hanya admin
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateProduct
);

// Hanya admin
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteProduct
);

export default router;