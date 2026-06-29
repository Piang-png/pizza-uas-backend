import connection from "../config/db.js";
import Product from "../models/Product.js";

const productModel = new Product(connection);

export const getAllProducts = async (req, res) => {
    try {
        const data = await productModel.getAll();

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

export const getProductById = async (req, res) => {

    try {

        const data = await productModel.getById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Produk tidak ditemukan"
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

export const createProduct = async (req, res) => {

    try {

        const { name, price, stock, category_id } = req.body;

        if (!name || !price || price <= 0) {

            return res.status(400).json({
                success: false,
                message: "Nama dan harga wajib diisi"
            });

        }

        await productModel.create({
            name,
            price,
            stock,
            category_id
        });

        res.status(201).json({
            success: true,
            message: "Produk berhasil ditambahkan"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateProduct = async (req, res) => {

    try {

        await productModel.update(req.params.id, req.body);

        res.json({
            success: true,
            message: "Produk berhasil diupdate"
        });

    } catch (error) {

        res.status(500).json({
            success: false
        });

    }

};

export const deleteProduct = async (req, res) => {

    try {

        await productModel.delete(req.params.id);

        res.json({
            success: true,
            message: "Produk berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            success: false
        });

    }

};