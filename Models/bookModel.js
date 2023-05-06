const router = require("express").Router();
const { resolve } = require("path");
const conn = require("../db/dbConnection");
const util = require("util");
const bcrypt = require("bcrypt");
const { error } = require("console");
class BookModel {
    static async getAllBooks() {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn);
                const result = await query("select * from books", [])
                resolve(result)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        }).catch(error => {
            console.error(error);
            return false;
        });
    }

    static async createBook(name, description, author, field) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn);
                await query("insert into books (name,description,author,field) values(?,?,?,?)", [name, description, author, field])
                resolve(true)
            } catch (error) {
                console.log(error)
                reject(error)
            }
        }).catch(error => {
            console.error(error);
            return false;
        });
    }
    static async deleteBook(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
                const book = await query("select * from books where id = ?", [id]);
                if (!book[0]) {
                    reject(false)
                }
                await query("delete from books where id = ?", [id])
                resolve(true)
            } catch (error) {
                reject(error);
            }
        }).catch(error => {
            console.error(error);
            return false;
        });
    }
    static async updateBook(id, name, description, author, field) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = util.promisify(conn.query).bind(conn); //transform query mysql -> promise to use [await/async]
                const book = await query("select * from books where id = ?", [id]);
                if (!book[0]) {
                    reject(false)
                }
                const bookObj =
                {
                    name: [name],
                    description: [description],
                    author: [author],
                    field: [field],
                }
                await query("update books set ? where id = ?", [
                    bookObj,
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
module.exports = BookModel