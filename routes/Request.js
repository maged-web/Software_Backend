const express = require("express")
const router = require("express").Router();
const admin = require("../middleware/admin")
const requestController = require("../Controller/requestController");
const reader = require("../middleware/reader");


router.post("/sendrequset", reader, requestController.sendRequest)
router.put("/:id/accepted", admin, requestController.acceptRequest)
router.put("/:id/declined", admin, requestController.declinedRequest)


module.exports = router;