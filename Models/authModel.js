const router = require("express").Router();
const { resolve } = require("path");
const conn = require("../db/dbConnection");
const util = require("util");
const bcrypt = require("bcrypt");
const { error } = require("console");
const crypto = require("crypto");
class AuthModel {

    static async register(name, email, password, phone, tokens) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn);
                const checkEmailExists = await query("SELECT COUNT(*) as emailCount FROM users WHERE email = ?", [email]);
                // const checkEmailExists = await query("select * from users where email = ?", [email]);
                const checkPhoneExists = await query("SELECT COUNT(*) as phoneCount FROM users WHERE phone = ?", [phone]);
                //const checkPhoneExists = await query("select * from users where phone = ?", [phone]);

                if (checkEmailExists[0].emailCount > 0) {
                    reject("Email already exists.");
                    return false;
                }
                /* if (checkEmailExists.length > 0) {
                    reject("Email already exists.");
                }
                if (checkPhoneExists.length > 0) {
                    reject("Phone already exists.");
                } */
                if (checkPhoneExists[0].phoneCount > 0) {
                    reject("Phone already exists.");
                    return false;
                }
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
    static async login(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn);
                const result = await query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
                if (result.length === 1) {
                    resolve(result[0]);
                } else {
                    reject("Invalid email or password.");
                }
            } catch (error) {
                reject(error);
            }
        }).catch(error => {
            console.error(error);
            return false;
        });
    }
}
module.exports = AuthModel