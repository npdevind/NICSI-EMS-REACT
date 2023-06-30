const bcrypt = require("bcryptjs");
const db = require("../config/db");
const { encrypt, decrypt, secret } = require("../features/index")
const jwt = require("jsonwebtoken");

exports.addNewUser = async ({ data }) => {
    try {
        const checkExistingEmail = await db.query(`select count(1) from users where email = '${data.email}'`);
        if (checkExistingEmail.rows[0].count > 0) throw Error("This email already exist.")
        const password = bcrypt.hashSync(data.password);
        const query = `
                INSERT INTO users (name, email, password, type)
                VALUES ('${data.name}', '${data.email}', '${password}', ${data.userType}) RETURNING uid`;

        const runQuery = await db.query(query);

        if (runQuery.rows.length > 0) {
            return await encrypt(String(runQuery.rows[0].uid));
        } else {
            throw Error("Something Wrong! Please try again some time latter.");
        }
    } catch (error) {
        throw Error(error)
    }
}


exports.loginUser = async ({ data }) => {
    try {
        const checkUserQuery = `select * from users where email = '${data.email}'`;
        const runCheckUserQuery = await db.query(checkUserQuery);
        if (runCheckUserQuery.rowCount === 1) {
            if (bcrypt.compareSync(data.password, runCheckUserQuery.rows[0].password)) {
                const token = jwt.sign({ id: runCheckUserQuery.rows[0].uid, email: runCheckUserQuery.rows[0].email }, secret.JWT_TOKEN_SECRET, {
                    expiresIn: "24h",
                });
                return {
                    user: runCheckUserQuery.rows[0],
                    token: token
                }
            } else {
                //return res.status(401).json({ message: "Password incorrect" });
                throw Error("Password incorrect");
            }
        } else {
            throw Error("No user found!")
        }
    } catch (error) {
        throw Error(error)
    }
}

exports.userDetails = async ({ email }) => {
    const query = await db.query(`select * from users where email = '${email}'`);
    if (query) {
        return query.rows[0]
    } else {
        return "ddd"
    }
}