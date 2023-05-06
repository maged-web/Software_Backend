const express = require("express")
const router = require("express").Router();
const { body, validationResult } = require('express-validator');

const admin = require("../middleware/admin")
const readerController = require("../Controller/readerController")

router.post("/createreader", body("email").isEmail().withMessage("please enter a valid email !"),
    body("name").isString().withMessage("please enter a valid name").isLength({ min: 5 }).withMessage("name should be at least 5 character"),
    body("password").isLength({ min: 8 }).withMessage("password should be at least 8 character"),
    body("phone").isLength({ min: 6 }).withMessage("phone must be at least 6 chars long"), admin, readerController.createReader)
router.delete("/:id", admin, readerController.deleteReader)
router.get("/getreaders", admin, readerController.getReaders)
router.put("/:id", body("email").isEmail().withMessage("please enter a valid email !"),
    body("name").isString().withMessage("please enter a valid name").isLength({ min: 5 }).withMessage("name should be at least 5 character"),
    body("password").isLength({ min: 8 }).withMessage("password should be at least 8 character"),
    body("phone").isLength({ min: 6 }).withMessage("phone must be at least 6 chars long"), admin, readerController.updateReader)
module.exports = router;
