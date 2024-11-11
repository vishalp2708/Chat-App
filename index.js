// const express = require("express");
// const app = express();
// const cookieParser = require("cookie-parser")
// const path = require("path")
// const userModel = require("./models/user")

// app.set("view engine", "ejs")
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(express.static(path.join(__dirname,"public")))
// app.use(cookieParser())

// app.get("/", (req, res)=>{
//     res.render("index");
// })

// app.post("/create", async(req, res)=>{
//     let {username,email,password,age} = req.body
//     let createdUser = await userModel.create({
//         username,
//         email,
//         password,
//         age
//     })
//     res.send(createdUser)
// })



// app.listen(3000);

// const express = require('express')
// const bodyParser = require('body-parser')
// const users = [{
//     userName: "Aditya Gupta",
//     userEmail: "aditya@gmail.com",
//     userAge: "22",
//     userUniqueId: '1'
// },
// {
//     userName: "Vanshita Jaiswal",
//     userEmail: "vanshita@gmail.com",
//     userAge: "21",
//     userUniqueId: '2'
// },
// {
//     userName: "Sachin Yadav",
//     userEmail: "sachin@gmail.com",
//     userAge: "22",
//     userUniqueId: '3'
// }
// ]

// const app = express()

// app.set('view engine', 'ejs')

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }))

// app.get("/", function (req, res) {
//     res.render("demo", {
//         data: users
//     })
// })

// app.post("/", (req, res) => {
//     const inputUserName = req.body.userName
//     const inputUserEmail = req.body.userEmail
//     const inputUserAge = req.body.userAge
//     const inputUserUniqueId = req.body.userUniqueId

//     users.push({
//         userName: inputUserName,
//         userEmail: inputUserEmail,
//         userAge: inputUserAge,
//         userUniqueId: inputUserUniqueId
//     })

//     res.render("demo", {
//         data: users
//     })
// })

// app.post('/delete', (req, res) => {
//     var requestedUserUniqueId = req.body.userUniqueId;
//     var j = 0;
//     users.forEach(user => {
//         j = j + 1;
//         if (user.userUniqueId === requestedUserUniqueId) {
//             users.splice((j - 1), 1)
//         }
//     })
//     res.render("demo", {
//         data: users
//     })
// })

// app.post('/update', (req, res) => {
//     const inputUserName = req.body.userName
//     const inputUserEmail = req.body.userEmail
//     const inputUserAge = req.body.userAge
//     const inputUserUniqueId = req.body.userUniqueId

//     var j = 0;
//     users.forEach(user => {
//         j = j + 1;
//         if (user.userUniqueId === inputUserUniqueId) {
//             user.userName = inputUserName
//             user.userEmail = inputUserEmail
//             user.userAge = inputUserAge
//         }
//     })
//     res.render("demo", {
//         data: users
//     })
// })

// app.listen(3000, (req, res) => {
//     console.log("App is running on port 3000")
// })  

// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.set("view engine", "ejs")

 app.get("/", (req, res)=>{
     res.render("index");
 })

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('sendMessage', ({ username, chat }) => {
        // Broadcast the message to all connected clients
        io.emit('receiveMessage', { username, chat });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});