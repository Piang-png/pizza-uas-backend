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

// customer register dari homepage / order -> TANPA LOGIN
router.post("/", createCustomer);

// sementara: user login juga boleh ambil list customer
router.get("/", authMiddleware, getAllCustomers);

// admin only
router.get("/:id", authMiddleware, roleMiddleware("admin"), getCustomerById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateCustomer);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteCustomer);

export default router;