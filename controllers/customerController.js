import connection from "../config/db.js";
import Customer from "../models/Customer.js";

const customerModel = new Customer(connection);

// GET ALL
export const getAllCustomers = async (req, res) => {

    try {

        const data = await customerModel.getAll();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false
        });

    }

};

// GET BY ID
export const getCustomerById = async (req, res) => {

    try {

        const data = await customerModel.getById(req.params.id);

        if (!data) {

            return res.status(404).json({
                success: false,
                message: "Customer tidak ditemukan"
            });

        }

        res.json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false
        });

    }

};

// POST
export const createCustomer = async (req, res) => {

    try {

        const { name, phone } = req.body;

        if (!name || !phone) {

            return res.status(400).json({
                success: false,
                message: "Data tidak lengkap"
            });

        }

        await customerModel.create(req.body);

        res.status(201).json({
            success: true,
            message: "Customer berhasil ditambahkan"
        });

    } catch (error) {

        res.status(500).json({
            success: false
        });

    }

};

// PUT
export const updateCustomer = async (req, res) => {

    try {

        await customerModel.update(req.params.id, req.body);

        res.json({
            success: true,
            message: "Customer berhasil diupdate"
        });

    } catch (error) {

        res.status(500).json({
            success: false
        });

    }

};

// DELETE
export const deleteCustomer = async (req, res) => {

    try {

        await customerModel.delete(req.params.id);

        res.json({
            success: true,
            message: "Customer berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            success: false
        });

    }

};