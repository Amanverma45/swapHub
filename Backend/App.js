const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config()

const { setIo } = require("./socket.js");

const express = require('express')
require('./Db/Connection.js')
const app = express();
const server = http.createServer(app);
const userRoutes = require('./routes/userRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const swapRoutes = require('./routes/swapRoutes.js')
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.get('/',(req,res)=>{
    res.send('Server start from here ')
})
app.use('/api',userRoutes)
app.use('/api',productRoutes)
app.use('/api',swapRoutes)
app.use('/api',chatRoutes)

const io = new Server(server, {
    cors: {
        origin: (origin, callback) => callback(null, true),
        methods: ["GET", "POST"],
        credentials: true
    }
});
setIo(io);

io.on("connection", (socket) => {
    console.log("User Connected :", socket.id);

    socket.on("joinRoom", (chatId) => {
        socket.join(chatId);
        console.log(`Socket ${socket.id} joined room ${chatId}`);
    });

    socket.on("typing", (data) => {
        socket.to(data.chatId).emit("typing", data);
    });

    socket.on("stopTyping", (data) => {
        socket.to(data.chatId).emit("stopTyping", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected :", socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});