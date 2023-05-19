const {Server} = require("socket.io");

const io = new Server({cors: "http://127.0.0.1:5173"})

let onlineUser = [];

io.on("connection", socket => {

    socket.on("addNewUser", (userId) => {
        !onlineUser.some(user => user.userId === userId) &&
            onlineUser.push({
                userId,
                socketID: socket.id
            });

    });
    socket.on("sendMessage", (message) => {

        console.log(message);
        const user = onlineUser .find(user => user.userId === message.recipientId);

        if(user){
            io.to(user.socketID).emit("getMessage",message);
        }
    });
    
    socket.on("disconnect", () => {
       
        onlineUser = onlineUser.filter((user) =>user.socketID !== socket.id)

        console.log("onlineUser",onlineUser);
    });
});

const PORT = 3000 || process.env.PORT;

io.listen(PORT, () => console.log(`server running on port ${PORT}`));