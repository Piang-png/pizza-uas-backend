import express from "express";

import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// GET semua produk
router.get("/", getAllProducts);

// GET produk berdasarkan ID
router.get("/:id", getProductById);

// POST produk
router.post("/", createProduct);

// PUT produk
router.put("/:id", updateProduct);

// DELETE produk
router.delete("/:id", deleteProduct);

export default router;