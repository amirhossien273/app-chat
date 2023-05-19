const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

mongoose.connect(process.env.MONGODB_CONNECTION, {})
        .then(result => console.log("database connected"))
        .catch(err => console.log(err));


app.listen(process.env.PORT , (req, res) => {
    console.log(`server running on port: ${process.env.PORT}`);
})