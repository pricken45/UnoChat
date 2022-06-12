const socket = io();
const inputText = document.getElementById("text");
const users = document.getElementById("users")

socket.on("messageData", (data) => {
    inputText.innerText = data;
});

socket.on("userCount", count=>{
    users.innerText = "Users active: " + count;
})

inputText.oninput = () => {
    socket.emit("txtRecv", inputText.innerText);
};