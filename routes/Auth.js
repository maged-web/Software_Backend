const express = require("express")
const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const authController = require("../Controller/authController")

router.post("/register", body("email").isEmail().withMessage("please enter a valid email !"),
    body("name").isString().withMessage("please enter a valid name").isLength({ min: 5 }).withMessage("name should be at least 5 character"),
    body("password").isLength({ min: 8 }).withMessage("password should be at least 8 character"),
    body("phone").isLength({ min: 6 }).withMessage("phone must be at least 6 chars long"), authController.register)
router.post("/login", body("email").isEmail().withMessage("please enter a valid email !"),
    body("password").isLength({ min: 8, max: 12 }).withMessage("password should be between (8-12) character"), authController.login)

module.exports = router;