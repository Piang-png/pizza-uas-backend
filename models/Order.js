import BaseModel from "./BaseModel.js";

class Order extends BaseModel {

    async getAll() {
        const [rows] = await this.connection.execute(`
            SELECT
                orders.id,
                orders.user_id,
                customers.name AS customer_name,
                products.name AS product_name,
                order_items.qty,
                order_items.price,
                orders.total_price
            FROM orders
            JOIN customers ON orders.customer_id = customers.id
            JOIN order_items ON orders.id = order_items.order_id
            JOIN products ON order_items.product_id = products.id
            ORDER BY orders.id DESC
        `);

        return rows;
    }

    async getByUserId(user_id) {
        const [rows] = await this.connection.execute(`
            SELECT
                orders.id,
                orders.user_id,
                customers.name AS customer_name,
                customers.phone AS customer_phone,
                products.name AS product_name,
                order_items.qty,
                order_items.price,
                orders.total_price
            FROM orders
            JOIN customers ON orders.customer_id = customers.id
            JOIN order_items ON orders.id = order_items.order_id
            JOIN products ON order_items.product_id = products.id
            WHERE orders.user_id = ?
            ORDER BY orders.id DESC
        `, [user_id]);

        return rows;
    }

    async create(user_id, customer_id, items) {
        const [order] = await this.connection.execute(
            "INSERT INTO orders(user_id, customer_id, total_price) VALUES(?, ?, 0)",
            [user_id, customer_id]
        );

        let total = 0;

        for (const item of items) {
            const [product] = await this.connection.execute(
                "SELECT * FROM products WHERE id=?",
                [item.product_id]
            );

            if (!product.length) {
                throw new Error("Produk tidak ditemukan");
            }

            const price = product[0].price;
            total += price * item.qty;

            await this.connection.execute(
                "INSERT INTO order_items(order_id, product_id, qty, price) VALUES(?, ?, ?, ?)",
                [
                    order.insertId,
                    item.product_id,
                    item.qty,
                    price
                ]
            );
        }

        await this.connection.execute(
            "UPDATE orders SET total_price=? WHERE id=?",
            [total, order.insertId]
        );

        return order.insertId;
    }

}

export default Order;