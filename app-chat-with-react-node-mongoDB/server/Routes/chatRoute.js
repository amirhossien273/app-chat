const express = require("express");
const {createChat, findUserChat, findChat} = require("../Controller/chatController");

const router = express.Router();

router.post("/", createChat);

router.get("/find/:firstId/:secendId", findChat);

router.get("/:userId", findUserChat);

module.exports = router;