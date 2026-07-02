import BaseModel from "./BaseModel.js";

class Product extends BaseModel {
  async getAll() {
    const [rows] = await this.connection.execute("SELECT * FROM products");
    return rows;
  }

  async getById(id) {
    const [rows] = await this.connection.execute(
      "SELECT * FROM products WHERE id=?",
      [id]
    );
    return rows[0];
  }

  async create(data) {
    const { name, price, stock, category_id } = data;

    if (!name || !price) {
      throw new Error("Data tidak lengkap");
    }

    await this.connection.execute(
      "INSERT INTO products (name, price, stock, category_id) VALUES (?, ?, ?, ?)",
      [name, price, stock, category_id]
    );
  }

  async update(id, data) {
    const { name, price, stock } = data;

    await this.connection.execute(
      "UPDATE products SET name=?, price=?, stock=? WHERE id=?",
      [name, price, stock, id]
    );
  }

  async delete(id) {
    await this.connection.execute(
      "DELETE FROM products WHERE id=?",
      [id]
    );
  }
}

export default Product;