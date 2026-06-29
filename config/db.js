import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "pizza_db",
});

try {
  await connection.query("SELECT 1");
  console.log("Database connected");
} catch (error) {
  console.log("Database error:", error.message);
}

export default connection;ww