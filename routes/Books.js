const express = require("express")
const router = require("express").Router();
const bookcontroller = require("../Controller/bookController")
const admin = require("../middleware/admin");
const { body, validationResult } = require('express-validator');


router.post("/createbooks", body("name").isString()
    .withMessage("please enter a valid book name").
    isLength({ min: 5 }).
    withMessage("book name should be at least 5 characters"),

    body("description").
        isString()
        .withMessage("please enter a valid description ")
        .isLength({ min: 10 })
        .withMessage("description name should be at least 10 characters"),

    body("author").
        isString()
        .withMessage("please enter a valid author ")
        .isLength({ min: 5 })
        .withMessage("author name should be at least 5 characters"),

    body("field").
        isString()
        .withMessage("please enter a valid field ")
        .isLength({ min: 5 })
        .withMessage("field name should be at least 5 characters")
    , admin, bookcontroller.createBook)
router.get("/getbooks", bookcontroller.getAllBooks)
router.delete("/:id", admin, bookcontroller.deleteBook)
router.put("/:id", body("name").isString()
    .withMessage("please enter a valid book name").
    isLength({ min: 5 }).
    withMessage("book name should be at least 5 characters"),

    body("description").
        isString()
        .withMessage("please enter a valid description ")
        .isLength({ min: 10 })
        .withMessage("description name should be at least 10 characters"),

    body("author").
        isString()
        .withMessage("please enter a valid author ")
        .isLength({ min: 5 })
        .withMessage("author name should be at least 5 characters"),

    body("field").
        isString()
        .withMessage("please enter a valid field ")
        .isLength({ min: 5 })
        .withMessage("field name should be at least 5 characters"), admin, bookcontroller.updateBook)


module.exports = router;