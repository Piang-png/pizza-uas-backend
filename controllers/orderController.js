import connection from "../config/db.js";
import Order from "../models/Order.js";

const orderModel = new Order(connection);

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
            success: false
        });

    }

};

export const createOrder = async (req, res) => {

    try {

        const { customer_id, items } = req.body;

        if (!customer_id || !items || items.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Data order tidak lengkap"
            });

        }

        await orderModel.create(customer_id, items);

        res.status(201).json({
            success: true,
            message: "Order berhasil dibuat"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};