require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {Server} = require("socket.io");
const UserRoute = require('./routes/users')
const app = express()
const PORT = process.env.PORT
const http = require("http");

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','POST']
    }
});

app.use(express.json())

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
})
);

app.use('/users',UserRoute)

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to Express</h1>')
})

io.on('connection',(socket)=>{
      socket.on('create-query',(data)=>{
        socket.create(data);
        console.log(`user ${socket.id} has created query`)
      });
      socket.on('send-message',(data)=>{
         socket.to(data.query).emit('receive-message',data);
      });
      socket.on('disconnect',()=>{
        console.log('disconnected..',socket.id);
      });
});


server.listen(PORT, ()=>console.log(`App is running in port ${PORT}`))