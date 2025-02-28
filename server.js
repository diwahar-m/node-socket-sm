const { log } = require('console');
const express = require('express');
const http = require("http");
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);

const io  = socketIo(server);

app.use(express.static('public'));

const users = new Set();

io.on("connection", (socket)=> {
    console.log("A user is now connected!")
    // handling users when they joined the chat 
    socket.on("join", (userName)=> {
        console.log("shv vbvkv")
        users.add(userName);
        // broadcasting to clients from the server side. 
        io.emit('userJoined', userName);
        // send the updated user list; 
        io.emit('userList',Array.from(users))
    })

    // handling incoming chat message 

    // handle user disconnection
})

const PORT = 3000; 
server.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})

