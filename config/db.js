import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

try {
    await connection.query("SELECT 1");
    console.log("Database Connected");
} catch (error) {
    console.log("Database Failed");
    console.log(error);
}

export default connection;