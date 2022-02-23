// const express = require("express");
// // const http = require("http");
// // const socketIo = require("socket.io")

// const cors=require('cors')

// const port = process.env.PORT || 80;
// const index = require("./router/index");

// const app = express();

// app.use(index);
// // Creating Http Server from Express App to work with socket.io
// const http = require('http').Server(app);
// // Initializing socket.io object
// const io = require('socket.io')(http,{
//  // Specifying CORS 
//  cors: {
//  origin: '*'
//  }
// })

// // const server = http.createServer(app);

// // const io = socketIo(server);


// // // app.use(cors())
// // app.use((req, res, next) => {
// //     res.setHeader("Access-Control-Allow-Origin", "*");
// //     res.setHeader(
// //       "Access-Control-Allow-Headers",
// //       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
// //     );
// //     res.setHeader(
// //       "Access-Control-Allow-Methods",
// //       "GET, POST, PATCH, PUT, DELETE, OPTIONS"
// //     );
// //     next();
// //   });


// let interval;

// io.on("connection", (socket) => {
// //   var socketId = socket.id;
// //   console.log("ADDING :: " +   socketId 
// //   );
// //  if(socketId){socket.emit("connection successful  ","data")}
// //   console.log("New client connected");
// //   if (interval) {
// //     clearInterval(interval);
// //   }
// //   interval = setInterval(() => getApiAndEmit(socket), 10000);
// //   socket.on("disconnect", () => {
// //     console.log("Client disconnected");
// //     clearInterval(interval);
// //   });
// // });

// // const getApiAndEmit = socket => {
// //   const response = new Date();
// //   // Emitting a new message. Will be consumed by the client
// //   // socket.emit("FromAPI", response);
// //   socket.emit("data", `connected to id: ${socket.id}`);
// socket.on("join", ({ name }, callback) => {

//   if (error) {
//     callback(error);
//   } else {
//     let roomID = 2436
//     socket.join(roomID)
//     console.log(name)
//      socket.broadcast.to(roomID).emit("adminMessage", {
//            name: "admin",
//            content: `${name} has joined`,
//        });
//     });

//   socket.on("disconnect", () => {
//        });

// };

// http.listen(port, () => console.log(`Listening on port ${port}`));


const express = require("express");
// const http = require("http");
// const socketio = require("socket.io");

const app = express();

const PORT = process.env.PORT || 80;

// const server = http.createServer(app);

const http = require('http').Server(app);
// Initializing socket.io object
const io = require('socket.io')(http,{
 // Specifying CORS 
 cors: {
 origin: '*'
 }
})


// io = socketio(server);

io.on("connection", (socket) => {
   socket.on("join", ({ uname }, callback,error) => {

    if (error) {
      callback(error);
    } else {
      let roomID = 2436
      socket.join(roomID)
      console.log(uname)

      socket.emit("data",`${uname} has joined with id : ${socket.id}`,
           ); 
      socket.on("disconnect", () => {
   });
      //  socket.broadcast.to(roomID).emit("adminMessage", {
      //        uname: "admin",
      //        content: `${uname} has joined`,
      //    });
      }});
     
});



http.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});