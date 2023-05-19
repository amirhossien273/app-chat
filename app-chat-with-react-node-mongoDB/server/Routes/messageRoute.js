const express = require("express");
const {createMessage, getMessges} = require("../Controller/messageController");

const router = express.Router();

router.post("/", createMessage);

router.get("/:chatId", getMessges);

module.exports = router;