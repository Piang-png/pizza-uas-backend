import BaseModel from "./BaseModel.js";

class Customer extends BaseModel {

    async getAll() {
        const [rows] = await this.connection.execute(
            "SELECT * FROM customers"
        );

        return rows;
    }

    async getById(id) {
        const [rows] = await this.connection.execute(
            "SELECT * FROM customers WHERE id=?",
            [id]
        );

        return rows[0];
    }

    async create(data) {
    const { name, phone } = data;

    const [result] = await this.connection.execute(
        "INSERT INTO customers(name, phone) VALUES(?, ?)",
        [name, phone]
    );

    return result.insertId;
}

    async update(id, data) {

        const { name, phone } = data;

        await this.connection.execute(
            "UPDATE customers SET name=?, phone=? WHERE id=?",
            [name, phone, id]
        );

    }

    async delete(id) {

        await this.connection.execute(
            "DELETE FROM customers WHERE id=?",
            [id]
        );

    }

}

export default Customer;