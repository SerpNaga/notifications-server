require('dotenv').config()
const express = require('express')
const app = express()

const http = require('http')
const {Server} = require('socket.io')
const cors = require("cors")
const mongoose = require("mongoose");
const router = require("./routes/router");

const PORT= process.env.PORT
const DBURI = process.env.DBURI

app.use(
    express.urlencoded({
        extended: true,
    })
    );
    
app.use(
        cors({
        origin: "*",
        allowHeaders:"*",
        optionsSuccessStatus: 200
    })
    )
const server = http.createServer(app)
app.options('*', cors())
app.use("/api", router)



const io = new Server(server, {
    cors:{
        origin: '*'
    }
})

let onlineUsers=[]

const addUser=(username, socketId)=>{
    !onlineUsers.some(user=>user.username===username)&&onlineUsers.push({username, socketId})
    console.log(onlineUsers)
}
const removeUser=(socketId)=>{
    onlineUsers=onlineUsers.filter(user=>user.socketId!==socketId)
    console.log(onlineUsers)
}
const getUser=(username)=>{
    return onlineUsers.find(user=>user.username===username)
}

io.on("connection", (socket)=>{
    socket.on("newUser", (username)=>{
        addUser(username, socket.id)
    })
    socket.on("delUser", ()=>{
        removeUser(socket.id)
    })
    socket.on("addnotif", async ({id, text, user, date, type}) => {
        io.emit('addednotif', {id, text, user, date, type})
        console.log("serv", id, text, user, date, type)
    })
    socket.on("delnotif", async ({id}) => {
        io.emit('delnotif', {id})
    })
    socket.on("editnotif", async ({id, text, date, type, user}) => {
        io.emit('editnotif', {id, text, date, type, user})
    })
    socket.on("pong",({message})=>{
        console.log(message)
    })
    socket.on("disconnect", ()=>{
        removeUser(socket.id)
    })
})

server.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
    try {
        mongoose.connect(DBURI);
        console.log("DB connected");
    } catch (error) {
        console.log(error)
        console.log("Could not connect to DB");
        process.exit(1);
    }
})