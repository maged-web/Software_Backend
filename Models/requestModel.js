const { resolve } = require("path");
const conn = require("../db/dbConnection");
const util = require("util");
const bcrypt = require("bcrypt");
const { error } = require("console");
const crypto = require("crypto");
const reader = require("../middleware/reader");

class RequestModel {

    static async sendRequest(book_id, user_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const status = 'pending';
                const query = util.promisify(conn.query).bind(conn);
                const book = await query("select * from books where id = ?", [book_id]);
                if (!book[0]) {
                    reject(false)
                }
                await query('INSERT INTO bookrequest (book_id, user_id, request) VALUES (?, ?, ?)',
                    [book[0].id, user_id, status],)
                resolve(true)
            } catch (error) {
                reject(error);
            }
        }).catch(error => {
            console.error(error);
            return false;
        });
    }
    static async acceptRequest(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn);
                const request = await query("select * from bookrequest where id = ?", [id]);
                if (!request[0]) {
                    reject(false)
                }
                await query('UPDATE bookrequest SET request = "accepted" WHERE id = ?', [id]
                )
                resolve(true)
            } catch (error) {
                reject(error);
            }
        }).catch(error => {
            console.error(error);
            return false;
        });
    }
    static async declinedRequest(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn);
                const request = await query("select * from bookrequest where id = ?", [id]);
                if (!request[0]) {
                    reject(false)
                }
                await query('UPDATE bookrequest SET request = "declined" WHERE id = ?', [id]
                )
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
module.exports = RequestModel