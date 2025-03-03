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
        users.add(userName);
        socket.userName = userName
        // broadcasting to clients from the server side. 
        io.emit('userJoined', userName);
        // send the updated user list; 
        io.emit('userList',Array.from(users))
    })

    // handling incoming chat message 
    socket.on("chatMessage", (message)=> {
        // broadcasting msg 
        io.emit("chatMessage", message)
    })

    // handle user disconnection
    socket.on("disconnect", ()=> {
        console.log("An User is disconnected");

        users.forEach((user)=> {
            if(user === socket.userName){
                user.delete(user);

                io.emit("userLeft", user)

                io.emit("userList", Array.from(users))
            }
        })
    })
})

const PORT = 3000;
server.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})

