const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get username and room from URL
const {username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
console.log(username, room);

const socket = io();

socket.emit('JoinChatRoom', { username, room });



// Get room and users
socket.on("roomUsers", ({room, users }) => {
    console.log(room);
    outputRoomName(room);
    outputUsers(users);
});

socket.on("message", message => {
    outputMessage(message);
})

// Message submit
chatForm.addEventListener("submit", e => {
    e.preventDefault();

    // get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit("chatMessage", msg);

    // Scroll down 
    chatMessages.scrollTop = chatMessages.scrollHeight;

    //clear input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

function outputMessage(message) {
    console.log(message);
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;

document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerHTML = room;

}

function outputUsers(users) {
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}