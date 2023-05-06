const router = require("express").Router();
const { error } = require("console");
const authModel = require("../Models/authModel");
const { body, validationResult } = require('express-validator');

class AuthController {
    static async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const result = await authModel.register(req.body.name, req.body.email, req.body.password, req.body.phone, req.body.tokens)
            if (result)
                res.send(result)
            else
                res.status(500).send("Error in registeration ")

        } catch (error) {
            console.error(error)
            res.status(500).send("Error in registeration ")
        }
    }

    static async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const result = await authModel.login(req.body.email, req.body.password)
            if (result)
                res.status(200).send(result)
            else
                res.status(500).send("Error in login ")

        } catch (error) {
            console.error(error)
            res.status(500).send("Error in login ")
        }

    }
}
module.exports = AuthController