const { resolve } = require("path");
const conn = require("../db/dbConnection");
const util = require("util");
const bcrypt = require("bcrypt");
const { error } = require("console");
const crypto = require("crypto");
class ReaderModel {
    static async createReader(name, email, password, phone, tokens) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn);
                //const checkEmailExists = await query("SELECT COUNT(*) as emailCount FROM users WHERE email = ?", [email]);
                const checkEmailExists = await query("select * from users where email = ?", [email]);
                // const checkPhoneExists = await query("SELECT COUNT(*) as phoneCount FROM users WHERE phone = ?", [phone]);
                const checkPhoneExists = await query("select * from users where phone = ?", [phone]);

                /*                 if (checkEmailExists[0].emailCount > 0) {
                                    reject("Email already exists.");
                                } */
                if (checkEmailExists.length > 0) {
                    reject("Email already exists.");
                }
                if (checkPhoneExists.length > 0) {
                    reject("Phone already exists.");
                }
                /*                 if (checkPhoneExists[0].phoneCount > 0) {
                                    reject("Phone already exists.");
                                } */
                tokens = crypto.randomBytes(16).toString("hex");
                const result = await query("INSERT INTO users (name,email,password,phone,tokens) VALUES (?,?,?,?,?)", [name, email, password, phone, tokens]);
                if (result.affectedRows === 1) {
                    resolve(true);
                } else {
                    reject("Failed to insert user.");
                }
            } catch (error) {
                reject(error);
            }
        }).catch(error => {
            console.error(error);
            return false;
        });
    }
    static async deleteReader(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
                const reader = await query("select * from users where id = ?", [id]);
                if (!reader[0]) {
                    reject(false)
                }
                await query("delete from users where id = ? and type = 0", [id])
                resolve(true)
            } catch (error) {
                reject(error);
            }
        }).catch(error => {
            console.error(error);
            return false;
        });
    }
    static async getReaders() {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn);
                const result = await query("select * from users where type = 0", [])
                resolve(result)
            } catch (error) {
                reject(error);
            }
        }).catch(error => {
            console.error(error);
            return false;
        });
    }
    static async updateReader(id, name, email, password, phone,) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
                const reader = await query("select * from users where id = ? and type = 0", [id]);
                if (!reader[0]) {
                    reject(false)
                }
                const readerObj =
                {
                    name: [name],
                    email: [email],
                    password: [password],
                    phone: [phone],
                }
                await query("update users set ? where id = ?", [
                    readerObj,
                    [id]
                ])
                resolve(true)
            } catch (error) {
                reject(error);
            }
        }).catch(error => {
            console.error(error);
            return false;
        });
    }
}
module.exports = ReaderModel    