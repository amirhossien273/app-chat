const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {userJoin, getCurrentUser, userLeave, getRommUsers} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botNmae = "chat Bote";

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// run when client connects
io.on("connection", socket => {
    socket.on("JoinChatRoom", ({username, room}) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

    socket.to(user.room).emit("message", formatMessage(botNmae, "Welocome to chat"));

    // broadcast when user connects
    socket.broadcast.to(user.room).emit("message", formatMessage(botNmae, `a ${user.username} has joined the chat`));

    // Send users and room info 
    io.to(user.room).emit("roomUsers",  {
        room: user.room,
        users: getRommUsers(user.room)
    });


    });
    console.log("New ws Connection....");

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {

        const user = getCurrentUser(socket.id);
        console.log(user);

        io.to(user.room).emit("message", formatMessage(user.username, msg));
        console.log(msg);
    });

    // run when client disconnects
    socket.on("disconnect", () => {

        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit("message", formatMessage(botNmae, `A ${user.username} has left the chat`));

            io.to(user.room).emit("roomUsers",  {
                room: user.room,
                users: getRommUsers(user.room)
            });
        }
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
