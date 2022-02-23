const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
  console.log("server")
});

router.get('/:name',(req,res)=>{
  console.log()
})

module.exports = router;



// const express = require('express') // Importing Express
// const app = express() // Creating Express Server
// const host ='localhost'// Specifying Host
// const port = 8000 // Specifying Port number

// app.use(express.json())

// // Creating Http Server from Express App to work with socket.io
// const http = require('http').Server(app);
// // Initializing socket.io object
// const io = require('socket.io')(http,{
//  // Specifying CORS 
//  cors: {
//  origin: '*'
//  }
// })
// const path = require('path');

// app.use(express.urlencoded({ extended: true })) // Specifying to use urlencoded
// // Creating object of Socket
// const liveData = io.of('/liveData') // URL which will accept socket connection
// // Socket event
// liveData.on('user-connected',(username)=>{
//  console.log(`Receiver ${username} connected..`) // Logging when user is connected
// });

// // Get request on home page
// app.get('/', (req, res) => 

// // res.send('Hello This is our Home Page')
// res.sendFile(path.join(__dirname,'sender.html'))
// )

// // Post request on home page
// app.post('/',(req, res) => {
//  liveData.emit('new-data',req.body.message) // Emitting event.
// })

// // Listening on Host and Port
// http.listen(port, host, () => console.log(`Listening on http://${host}:${port}/`))