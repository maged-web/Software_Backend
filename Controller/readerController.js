const router = require("express").Router();
const { error } = require("console");
const { body, validationResult } = require('express-validator');
const readerModel = require("../Models/readerModel")
class readerController {

    static async createReader(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const result = await readerModel.createReader(req.body.name, req.body.email, req.body.password, req.body.phone, req.body.tokens)
            if (result)
                res.status(200).send("Reader created successfully")
            else
                res.status(500).send("Error creating reader")

        }
        catch (error) {
            console.error(error)
            res.status(500).send("Error creating reader")
        }
    }
    static async deleteReader(req, res) {
        try {
            const result = await readerModel.deleteReader(req.params.id);
            if (result)
                res.status(200).send("Reader deleting successfully")
            else
                res.status(500).send("error deleting Reader")

        } catch (error) {
            console.error(error)
            res.status(500).send("error deleting Reader")
        }
    }
    static async getReaders(req, res) {
        try {
            const result = await readerModel.getReaders();
            if (result)
                res.send(result)
            else
                res.status(500).send("Error getting readers")

        } catch (error) {
            console.error(error)
            res.status(500).send("Error getting readers")
        }
    }
    static async updateReader(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const result = await readerModel.updateReader(req.params.id, req.body.name, req.body.email, req.body.password, req.body.phone);
            if (result)
                res.status(200).send("Reader updated successfully")
            else
                res.status(500).send("Erorr update reader")

        } catch (error) {
            console.error(error)
            res.status(500).send("Erorr update reader")
        }
    }

}
module.exports = readerController;