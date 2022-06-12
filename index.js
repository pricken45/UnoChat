const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

let currentText = "Goddagens";
let activeUsers = 0;

io.on('connection', (s) => {
    s.emit("messageData", currentText);
    activeUsers++;
    io.emit("userCount", activeUsers)
    console.log(`New connection: ${s.handshake.address}, active users: ${activeUsers}`);
    s.on('disconnect', ()=> {
        activeUsers--;
        io.emit("userCount", activeUsers)

        console.log(`User on ip ${s.handshake.address} has disconnected. Active users: ${activeUsers}`)
    });
    s.on('txtRecv', data=>{
        currentText = data;
        s.broadcast.emit("messageData", currentText)
    })
});

server.listen(process.env.PORT, () => {
  console.log('listening on *:3000');
});