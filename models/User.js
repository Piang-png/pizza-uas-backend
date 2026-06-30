import BaseModel from "./BaseModel.js";

class User extends BaseModel {

    async findByEmail(email) {

        const [rows] = await this.connection.execute(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        return rows[0];

    }

    async create(data) {

        const { name, email, password, role } = data;

        await this.connection.execute(
            `INSERT INTO users(name,email,password,role)
             VALUES(?,?,?,?)`,
            [name, email, password, role]
        );

    }

}


export default User;