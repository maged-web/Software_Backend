const router = require("express").Router();
const { error } = require("console");
const { body, validationResult } = require('express-validator');
const bookModel = require("../Models/bookModel")
class BookController {
    static async getAllBooks(req, res) {
        try {
            const result = await bookModel.getAllBooks();
            if (result)
                res.status(200).send(result)
            else
                res.status(500).send('Error getting books');

        } catch (error) {
            console.error(error);
            res.status(500).send('Error getting books');
        }

    }
    static async deleteBook(req, res) {
        try {
            const result = await bookModel.deleteBook(req.params.id);
            if (result)
                res.status(200).send("Deleted successfully")
            else
                res.status(500).send('Error deleting book');

        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting book');
        }

    }
    static async createBook(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const result = await bookModel.createBook(req.body.name, req.body.description, req.body.author, req.body.field);
            if (result)
                res.send("Book created successfully ")
            else
                res.status(500).send('Error creating book');

        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error creating book');
        }

    }
    static async updateBook(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const result = await bookModel.updateBook(req.params.id, req.body.name, req.body.description, req.body.author, req.body.field);
            if (result)
                res.status(200).send("Book updated successfully")
            else
                res.status(200).send("Error updated book")

        } catch (error) {
            console.error(error)
            res.send("Error updated book")
        }
    }

}
module.exports = BookController