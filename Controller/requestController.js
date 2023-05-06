const router = require("express").Router();
const { error } = require("console");
const requestModel = require("../Models/requestModel");
const reader = require("../middleware/reader")

class RequestController {
    static async sendRequest(req, res) {
        const { book_id } = req.body;
        const user_id = res.locals.reader.id;
        try {
            const result = await requestModel.sendRequest(book_id, user_id);
            if (result) {
                res.send("request done");
            }
            else
                res.status(500).send('Error sending request');


        } catch (error) {
            console.error(error);
            res.status(500).send('Error sending request');
        }
    }
    static async acceptRequest(req, res) {
        try {
            const result = await requestModel.acceptRequest(req.params.id);
            if (result) {
                res.status(200).send("accepted");
            }
            else
                res.status(500).send('Error accepting request');

        } catch (error) {
            console.error(error);
            res.status(500).send('Error accepting request');
        }
    }
    static async declinedRequest(req, res) {
        try {
            const result = await requestModel.declinedRequest(req.params.id);
            if (result) {
                res.status(200).send("declined");
            }
            else
                res.status(500).send('Error decline request');

        } catch (error) {
            console.error(error);
            res.status(500).send('Error sending request');
        }
    }
}
module.exports = RequestController;