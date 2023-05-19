const express = require("express");
const {registerUser, loginUser, findUser, getUsers} = require("../Controller/userContoller");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/find/:userId", findUser);

router.get("/", getUsers);

module.exports = router;