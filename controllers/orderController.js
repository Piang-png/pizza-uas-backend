import connection from "../config/db.js";
import Order from "../models/Order.js";

const orderModel = new Order(connection);

// ADMIN: lihat semua order
export const getAllOrders = async (req, res) => {
    try {
        const data = await orderModel.getAll();

        res.json({
            success: true,
            data
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Gagal mengambil data order"
        });
    }
};

// USER: lihat order miliknya sendiri
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const data = await orderModel.getByUserId(userId);

        res.json({
            success: true,
            data
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Gagal mengambil riwayat order"
        });
    }
};

// USER / ADMIN: buat order
export const createOrder = async (req, res) => {
    try {
        const { customer_id, items } = req.body;
        const user_id = req.user.id;

        if (!customer_id || !items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Data order tidak lengkap"
            });
        }

        const orderId = await orderModel.create(user_id, customer_id, items);

        res.status(201).json({
            success: true,
            message: "Order berhasil dibuat",
            data: {
                order_id: orderId
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};