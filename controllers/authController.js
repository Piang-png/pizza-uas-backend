import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import connection from "../config/db.js";
import User from "../models/User.js";

const userModel = new User(connection);

// REGISTER
export const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Semua field wajib diisi"
            });

        }

        // cek email sudah ada
        const user = await userModel.findByEmail(email);

        if (user) {

            return res.status(400).json({
                success: false,
                message: "Email sudah digunakan"
            });

        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({

            name,
            email,
            password: hashedPassword,
            role: "user"

        });

        res.status(201).json({

            success: true,
            message: "Register berhasil"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

// LOGIN

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email dan password wajib diisi"
            });

        }

        const user = await userModel.findByEmail(email);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "Email tidak ditemukan"
            });

        }

        const checkPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!checkPassword) {

            return res.status(401).json({
                success: false,
                message: "Password salah"
            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                role: user.role,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.json({

            success: true,
            message: "Login berhasil",

            token,

            user: {

                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};