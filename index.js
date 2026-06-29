import express from "express";
import cors from "cors";
import connection from "./config/db.js";
import Product from "./models/Product.js";

const app = express();

app.use(cors());
app.use(express.json());

const productModel = new Product(connection);


app.get("/", (req, res) => {
  res.send("API Pizza jalan");
});


// PRODUCTS


// GET ALL
app.get("/products", async (req, res) => {
  try {
    const data = await productModel.getAll();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

// GET BY ID
app.get("/products/:id", async (req, res) => {
  try {
    const data = await productModel.getById(req.params.id);

    if (!data) {
      return res.json({ success: false, message: "Tidak ditemukan" });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// POST
app.post("/products", async (req, res) => {
  try {
    const { name, price, stock, category_id } = req.body;

    if (!name || !price || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Nama dan harga wajib diisi & harga harus > 0",
      });
    }

    await productModel.create({
      name,
      price,
      stock,
      category_id,
    });

    res.json({
      success: true,
      message: "Produk ditambahkan",
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
// PUT
app.put("/products/:id", async (req, res) => {
  try {
    await productModel.update(req.params.id, req.body);

    res.json({
      success: true,
      message: "Produk diupdate",
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// DELETE
app.delete("/products/:id", async (req, res) => {
  try {
    await connection.execute(
      "DELETE FROM products WHERE id=?",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Produk berhasil dihapus"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message 
    });
  }
});
// CUSTOMERS

app.get("/customers", async (req, res) => {
  const [rows] = await connection.execute("SELECT * FROM customers");

  res.json({
    success: true,
    data: rows
  });
});

app.post("/customers", async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap",
    });
  }

  await connection.execute(
    "INSERT INTO customers (name, phone) VALUES (?, ?)",
    [name, phone]
  );

  res.json({ success: true });
});


// ORDERS


// GET ORDERS 
app.get("/orders", async (req, res) => {
  const [rows] = await connection.execute(`
    SELECT 
      orders.id,
      customers.name AS customer_name,
      products.name AS product_name,
      order_items.qty,
      order_items.price,
      orders.total_price
    FROM orders
    JOIN customers ON orders.customer_id = customers.id
    JOIN order_items ON orders.id = order_items.order_id
    JOIN products ON order_items.product_id = products.id
  `);

  res.json({
    success: true,
    data: rows,
  });
});
// POST ORDER
app.post("/orders", async (req, res) => {
  try {
    console.log("DATA MASUK:", req.body);

    const { customer_id, items } = req.body;

    if (!customer_id || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Data order tidak lengkap",
      });
    }

    const [order] = await connection.execute(
      "INSERT INTO orders (customer_id, total_price) VALUES (?, 0)",
      [customer_id]
    );

    let total = 0;

    for (let item of items) {
      const [product] = await connection.execute(
        "SELECT * FROM products WHERE id=?",
        [item.product_id]
      );

      
      if (!product.length) {
        return res.status(400).json({
          success: false,
          message: "Produk tidak ditemukan",
        });
      }

      const price = product[0].price;
      total += price * item.qty;

      await connection.execute(
        "INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?, ?, ?, ?)",
        [order.insertId, item.product_id, item.qty, price]
      );
    }

    await connection.execute(
      "UPDATE orders SET total_price=? WHERE id=?",
      [total, order.insertId]
    );

    res.json({ success: true });

  } catch (error) {
    console.log("ERROR ORDER:", error); 
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// START SERVER

app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});